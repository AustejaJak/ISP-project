using API.Data;
using API.Data.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public EmployeesController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ShopEmployee>>> GetEmployees()
        {
            var employees = await _storeContext.ShopEmployees.ToListAsync();
            if (employees == null)
            {
                return NotFound();
            }
            return Ok(employees);
        }

        [HttpGet("GetShopEmployees")]
        public async Task<ActionResult<List<ShopEmployeeDTO>>> GetEmployeesOfShop(int shopId)
        {
            var employees = await _storeContext.ShopEmployees.Where(emp => emp.ShopId == shopId).ToListAsync();
            if (employees == null)
            {
                return NotFound();
            }
            return Ok(employees);
        }

    }
}
