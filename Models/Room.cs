using System.Collections.Generic;
using RollDiceWithX.SignalR;

namespace RollDiceWithX.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public List<UserRoll> UserRolls { get; set; }
    }
}