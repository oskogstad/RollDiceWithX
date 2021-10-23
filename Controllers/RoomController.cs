using Microsoft.AspNetCore.Mvc;

namespace RollDiceWithX.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomController : ControllerBase
    {
        [HttpGet("{roomName}")]
        public IActionResult GetRoom(string roomName)
        {
            var roomContent = System.IO.File.ReadAllText("./static/room.html");
            return Content(roomContent, "text/html");
        }
    }
}