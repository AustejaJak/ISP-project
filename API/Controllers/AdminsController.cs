using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpDelete("RemoveUser")]
        public async Task<ActionResult> DeleteUser(string userId)
        {
            var result = await _adminService.RemoveAccount(userId);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost("AddDiscount")]
        public async Task<ActionResult<Discount>> AddDiscount([FromBody] DiscountCodeDTO data)
        {
            var discount = await _adminService.CreateDiscountCode(data);
            if (discount == null)
            {
                return BadRequest();
            }
            return Ok(discount);
        }

        [HttpPatch("{discountId}", Name = "ManipulateDiscount")]
        public async Task<ActionResult<Discount>> ManipulateDiscount(int discountId, [FromBody] DiscountEditDTO data)
        {
            var updatedDiscount = await _adminService.ManipulateDiscountCode(discountId, data);
            if (updatedDiscount == null)
            {
                return BadRequest();
            }
            return Ok(updatedDiscount);

        }

        [HttpPatch("ChangeUserRole")]
        public async Task<ActionResult> ChangeUsersRole(ChangeRolesDTO data)
        {
            var result = await _adminService.UpdateUserRole(data);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<InventorySummary>> CreateInvetorySummary()
        {
            var result = await _adminService.CreateInventorySummary();
            return Ok(result);

        }



    }
}
