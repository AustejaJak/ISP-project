using API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpPost("DeliveryAddress")]
        public async Task<ActionResult> ChangeClientDeliveryAddress(string userId, string deliveryAddress)
        {
            var result = await _clientService.ChangeDeliveryAddress(userId, deliveryAddress);
            return Ok(result);
        }
    }
}
