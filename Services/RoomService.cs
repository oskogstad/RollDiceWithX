using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RollDiceWithX.Database;
using RollDiceWithX.Models;
using RollDiceWithX.Utils;

namespace RollDiceWithX.Services
{
    public static class RoomServiceError
    {
        public const string RoomNotFound = "Room not found";
        public const string InvalidPassword = "Invalid password";
        public const string FailedToCreateRoom = "Failed to create room";
        public const string FailedToAddRoll = "Failed to add roll";
        public const string FailedToGetRoom = "Faile to get room";
    }
    
    public class RoomServiceResult
    {
        public bool Ok { get; init; }
        public Room Room { get; init; }
        public string Error { get; init; }
    }
    
    public class RoomService
    {
        private readonly ILogger<RoomService> _logger;

        public RoomService(ILogger<RoomService> logger)
        {
            _logger = logger;
        }
        
        public async Task<RoomServiceResult> GetRoom(string roomName, string password = "")
        {
            try
            {
                using (var roomDatabase = new RoomDbContext())
                {
                    var room = await roomDatabase
                        .Rooms
                        .SingleOrDefaultAsync(room => room.RoomName.Equals(roomName));

                    if (room is null)
                    {
                        return new RoomServiceResult { Error = RoomServiceError.RoomNotFound };
                    }

                    if (string.IsNullOrEmpty(room.HashedPassword))
                    {
                        return new RoomServiceResult { Ok = true, Room = room };
                    }

                    var passwordIsValid = PasswordHasher
                        .ValidatePassword(room.HashedPassword, room.Salt, password);

                    return passwordIsValid ? 
                        new RoomServiceResult { Ok = true, Room = room } : 
                        new RoomServiceResult { Error = RoomServiceError.InvalidPassword }; 
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, RoomServiceError.FailedToGetRoom);
                return new RoomServiceResult { Error = RoomServiceError.FailedToGetRoom };
            }
        }

        public async Task<RoomServiceResult> CreateRoom(string roomName, string password = "")
        {
            try
            {
                var room = new Room
                {
                    RoomName = roomName,
                    Salt = string.Empty,
                    HashedPassword = string.Empty,
                    UserRolls = new List<UserRoll>()
                };

                if (!string.IsNullOrEmpty(password))
                {
                    var (salt, hashedPassword) = PasswordHasher.HashPassword(password);
                    room.Salt = salt;
                    room.HashedPassword = hashedPassword;  
                }
            
                using var roomDatabase = new RoomDbContext();
            
                await roomDatabase.AddAsync(room);
                await roomDatabase.SaveChangesAsync();

                return new RoomServiceResult { Ok = true, Room = room };
            }
            catch (Exception e)
            {
                _logger.LogError(e, RoomServiceError.FailedToCreateRoom);
                return new RoomServiceResult { Error = RoomServiceError.FailedToCreateRoom };
            }
        }

        public async Task<RoomServiceResult> AddRoll(Room room, UserRoll userRoll)
        {
            try
            {
                room.UserRolls ??= new List<UserRoll>();
                room.UserRolls.Add(userRoll);

                await using var roomDatabase = new RoomDbContext();
                roomDatabase.Entry(room).State = EntityState.Modified;
                await roomDatabase.SaveChangesAsync();
                
                return new RoomServiceResult { Ok = true };
            }
            catch (Exception e)
            {
                _logger.LogError(e, RoomServiceError.FailedToAddRoll);
                return new RoomServiceResult { Error = RoomServiceError.FailedToAddRoll };
            }
        }
    }
}