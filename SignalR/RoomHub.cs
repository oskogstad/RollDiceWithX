using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dicebag;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RollDiceWithX.Database;

namespace RollDiceWithX.SignalR
{
    public class RoomHub : Hub
    {
        public async Task JoinRoom(string roomName)
        {
            await using var roomDatabase = new RoomDatabase();
            var room = await roomDatabase.Rooms.SingleOrDefaultAsync(room => room.RoomName.Equals(roomName));

            if (room is null)
            {
                room = new Room
                {
                    RoomName = roomName,
                    Salt = string.Empty,
                    HashedPassword = string.Empty,
                    UserRolls = new List<UserRoll>()
                };

                await roomDatabase.AddAsync(room);
                await roomDatabase.SaveChangesAsync();
            }
            
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Caller.SendAsync("RoomJoined");
        }
        
        public async Task Roll(string roomName, string username, string expression)
        {
            var utcTimestamp = DateTime.UtcNow;
            DiceRoller.Result rollResult;
            try
            {
                rollResult = DiceRoller.Roll(expression);
            }
            catch (DiceRollException de)
            {
                Console.WriteLine(de);
                await Clients
                    .Caller
                    .SendAsync("InvalidExpression", new
                    {
                        de.Expression, de.Offset, utcTimestamp
                    });
                return;
            }

            await using var roomDatabase = new RoomDatabase();
            var room = await roomDatabase
                .Rooms
                .SingleOrDefaultAsync(room => room.RoomName.Equals(roomName));

            if (room is null)
            {
                await Clients.Caller.SendAsync("InvalidRoomName", roomName);
                return;
            }
            var userRoll = new UserRoll
            {
                Result = rollResult,
                Username = username,
                UtcTimestamp = utcTimestamp
            };

            room.UserRolls ??= new List<UserRoll>();
            room.UserRolls.Add(userRoll);
            roomDatabase.Entry(room).State = EntityState.Modified;
            var numChanges = await roomDatabase.SaveChangesAsync();
            
            await Clients
                .Group(roomName)
                .SendAsync("PublishRoll", userRoll);
        }
    }

    public class UserRoll
    {
        public DiceRoller.Result Result { get; set; }
        public string Username { get; set; }
        public DateTime UtcTimestamp { get; set; }
    }
}