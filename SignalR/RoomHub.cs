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
        
        public async Task Roll(string roomName, string userName, string expression)
        {
            DiceRoller.Result rollResult;
            try
            {
                rollResult = DiceRoller.Roll(expression);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                await Clients.Caller.SendAsync("InvalidExpression");
                return;
            }
            
            var json = JsonSerializer.Serialize(rollResult);
            await Clients.All.SendAsync("PublishRoll", json);
        }
    }
}