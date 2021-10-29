using System;
using Dicebag;

namespace RollDiceWithX.Models
{
    public class UserRoll
    {
        public DiceRoller.Result Result { get; set; }
        public string Username { get; set; }
        public DateTime UtcTimestamp { get; set; }
    }
}