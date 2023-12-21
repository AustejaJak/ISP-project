using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Extensions;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IJwtGenerationService _jwtGenerationService;
        private readonly IUserAuthService _authService;
        private readonly StoreContext _storeContext;

        public UsersController(IJwtGenerationService jwtGenerationService, IUserAuthService authService, StoreContext storeContext)
        {

            _jwtGenerationService = jwtGenerationService;
            _authService = authService;
            _storeContext = storeContext;
        }

        [HttpPost("ClientRegister")]
        public async Task<ActionResult> RegisterClient(ClientRegisterDTO user)
        {
            var result = await _authService.RegisterClient(user);

            if (result)
            {
                return Ok();
            }


            return BadRequest();


        }

        [HttpPost("EmployeeRegister")]
        public async Task<ActionResult> RegisterShopWorker(EmployeeRegisterDTO user)
        {
            var result = await _authService.RegisterShopWorker(user);

            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }



        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _authService.Login(user);

            if (result != null)
            {
                var userBasket = await RetrieveBasket(result.User.Id!);
                var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);


                if (anonBasket != null)
                {
                    if (userBasket != null)
                    {
                        _storeContext.Baskets.Remove(userBasket);
                    }

                    anonBasket.ClientId = result.User.Id;
                    Response.Cookies.Delete("buyerId");
                    await _storeContext.SaveChangesAsync();
                }

                var dto = new UserDTO 
                { 
                    UserId = result.User.Id,
                    Username = result.User.UserName!,
                    Name = result.User.Name,
                    Surname = result.User.Surname,
                    Roles = result.Roles.ToList(),
                    PhoneNumber = result.User.PhoneNumber ?? "",
                    Email = result.User.Email ?? "",
                    Token = await _jwtGenerationService.CreateToken(result.User),
                    Basket = anonBasket != null ? anonBasket.MapBasketToBasketDTO() : userBasket?.MapBasketToBasketDTO() };
                
                return Ok(dto);
            }

            return Unauthorized();

        }

        [HttpPost("changePassword")]
        public async Task<ActionResult> ChangeUserPassword(string userId, string oldPassword, string newPassword)
        {
            var result = await _authService.ChangePassword(userId, oldPassword, newPassword);
            return Ok(result);
        }

        [HttpPost("changeEmail")]
        public async Task<ActionResult> ChangeUserEmail(string userId, string newEmail)
        {
            var result = await _authService.ChangeEmail(userId, newEmail);
            return Ok(result);
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _storeContext.Baskets
                    .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                    .FirstOrDefaultAsync(x => x.ClientId == buyerId);
        }

    }
}
