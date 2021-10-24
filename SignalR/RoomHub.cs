using System;
using System.Text.Json;
using System.Threading.Tasks;
using Dicebag;
using Microsoft.AspNetCore.SignalR;

namespace RollDiceWithX.SignalR
{
    public class RoomHub : Hub
    {
        public async Task JoinRoom(string roomName)
        {
            // TODO: Handle passwords
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
                await Clients.Caller
                    .SendAsync("InvalidExpression", new { de.Expression, de.Offset, utcTimestamp});
                return;
            }
            
            await Clients.Group(roomName).SendAsync("PublishRoll", new { rollResult, username, utcTimestamp});
        }
    }
}