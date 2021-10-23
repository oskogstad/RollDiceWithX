using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Result = Dicebag.DiceRoller.Result;

namespace RollDiceWithX.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RollController : ControllerBase
    {
        private readonly ILogger<RollController> _logger;

        public RollController(ILogger<RollController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Result Get([FromQuery] string exp)
        {
            _logger.LogInformation($"Rolling expression '{exp}'");
            return Dicebag.DiceRoller.Roll(exp);
        }
    }
}
