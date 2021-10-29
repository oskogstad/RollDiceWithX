using System;
using System.Threading.Tasks;
using Dicebag;
using Microsoft.AspNetCore.SignalR;
using RollDiceWithX.Models;
using RollDiceWithX.Services;

namespace RollDiceWithX.SignalR
{
    public class RoomHub : Hub
    {
        private readonly RoomService _roomService;

        public RoomHub(RoomService roomService)
        {
            _roomService = roomService;
        }
        
        public async Task JoinRoom(string roomName, string password = "")
        {
            var roomResult = await _roomService.GetRoom(roomName, password);
            if (roomResult.Ok)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
                await Clients.Caller.SendAsync("RoomJoined", roomResult.Room.UserRolls);
                return;
            }

            switch (roomResult.Error)
            {
                case RoomServiceError.RoomNotFound:
                {
                    var newRoomResult = await _roomService.CreateRoom(roomName, password);
                    if (newRoomResult.Ok)
                    {
                        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
                        await Clients.Caller.SendAsync("RoomJoined");
                        return;
                    }

                    break;
                }
                case RoomServiceError.InvalidPassword:
                    await Clients.Caller.SendAsync("JoinRoomFailed", RoomServiceError.InvalidPassword);
                    break;
            }

            await Clients.Caller.SendAsync("JoinRoomFailed");
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

            var roomResult = await _roomService.GetRoom(roomName);

            if (!roomResult.Ok)
            {
                await Clients.Caller.SendAsync("RollFailed");
                return;
            }
            
            var userRoll = new UserRoll
            {
                Result = rollResult,
                Username = username,
                UtcTimestamp = utcTimestamp
            };

            var addRollResult = await _roomService.AddRoll(roomResult.Room, userRoll);
            if (!addRollResult.Ok)
                await Clients.Caller.SendAsync("RollFailed");
            
            await Clients
                .Group(roomName)
                .SendAsync("PublishRoll", userRoll);
        }
    }
}