using API.Data;
using API.Data.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;

        public ShopsController(StoreContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<Shop>>> GetShops()
        {
            var shops = await _context.Shops.ToListAsync();
            if (shops == null)
            {
                return NotFound();
            }
            return Ok(shops);
        }

        [HttpGet("{id}", Name = "GetShop")]
        public async Task<ActionResult<Shop>> GetIndividualShop(int id)
        {
            var shop = await _context.Shops.FindAsync(id);
            if (shop == null)
            {
                return NotFound();
            }
            return Ok(shop);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveShop(int id)
        {
            var shop = await _context.Shops.FindAsync(id);
            if (shop == null)
            {
                return NotFound();
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpPost]
        public async Task<ActionResult<ShopDTO>> CreateShop(ShopDTO shopDTO)
        {
            var shop = new Shop()
            {
                Address = shopDTO.Address,
                PhoneNumber = shopDTO.PhoneNumber,
                Email = shopDTO.Email,
                Name = shopDTO.Name,
            };

            _context.Shops.Add(shop);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetShop", new { id = shop.Id }, shop);
            }
            return BadRequest(new ProblemDetails { Title = "Problem creating new shop" });

        }

        [HttpPatch]
        public async Task<ActionResult<ShopDTO>> EditShop(int shopId, [FromBody]ShopEditDTO shopDTO)
        {
            var shop = await _context.Shops.FindAsync(shopId);
            if (shop == null)
            {
                return NotFound();
            }

            string jsonString = System.Text.Json.JsonSerializer.Serialize(shopDTO);
            JsonConvert.PopulateObject(jsonString, shop);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(shop);
            }

            return BadRequest(new ProblemDetails { Title = "Problem editing the shop" });
        }




        [HttpDelete("RemoveEmployee")]
        public async Task<ActionResult> RemoveEmployee(int shopId, int employeeId)
        {
            var shop = await _context.Shops.FindAsync(shopId);
            if (shop == null)
            {
                return NotFound();
            }

            var employee = await _context.ShopEmployees.FindAsync(employeeId);
            if (employee == null)
            {
                return NotFound();
            }

            shop.Employees.Remove(employee);
            await _userManager.DeleteAsync(employee);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return StatusCode(201);
            }

            return BadRequest(new ProblemDetails { Title = "Problem occurred while trying to delete the employee" });
        }



    }

}
