using API.Data.DTOs;
using API.Entities;
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

        [HttpGet("paymentDetails")]
        public async Task<ActionResult<List<PaymentDetailsDTO>>> GetPaymentDetails(string userId)
        {
            var result = await _clientService.GetUsersPaymentDetails(userId);
            if (result.Count > 0)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpPost("addPaymentDetails")]
        public async Task<ActionResult<PaymentDetailsDTO>> AddPaymentDetails(string userId, CreatePaymentDetailsDTO paymentDetails)
        {
            var result = await _clientService.AddUsersPaymentDetails(userId, paymentDetails);
            if (result == null)
            {
                return BadRequest(new ProblemDetails() { Title = "Problem occurred while trying to add payment details" });
            }
            return Ok(result);
        }

        [HttpDelete("removePaymentDetails")]
        public async Task<ActionResult> RemoveUsersPaymentDetails(string userId, int paymentDetailsId)
        {
            var result = await _clientService.RemovePaymentDetails(userId, paymentDetailsId);
            if (result == false)
            {
                return BadRequest();
            }
            return StatusCode(201);
        }
    }
}
