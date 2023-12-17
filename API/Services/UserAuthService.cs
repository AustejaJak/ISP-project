using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Web.Mvc;

namespace API.Services
{
    public class UserAuthService : IUserAuthService
    {
        private readonly UserManager<User> _userManager;

        public UserAuthService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> RegisterClient(ClientRegisterDTO client)
        {
            var user = new Client
            {
                Id = Guid.NewGuid().ToString(),
                UserName = client.Username,
                Email = client.Email,
                Name = client.Name,
                Surname = client.Surname,
                BirthDate = client.BirthDate.Date,
                Gender = client.Gender,
                HasAccepted = client.HasAccepted == null ? false : true,
                RegisterDate = DateTime.Now,
                PhoneNumber = client.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user, client.Password);
            await _userManager.AddToRoleAsync(user, "Client");
            return result.Succeeded;


        }

        public async Task<bool> RegisterShopWorker(EmployeeRegisterDTO employee)
        {
            var user = new ShopEmployee
            {
                Id = Guid.NewGuid().ToString(),
                UserName = employee.Username,
                Email = employee.Email,
                Name = employee.Name,
                Surname = employee.Surname,
                PhoneNumber = employee.PhoneNumber,
                Address = employee.Address,
                Wage = employee.Wage,
                Gender = employee.Gender,
                JobPosition = employee.JobPosition,
                ShopId = employee.ShopId

            };

            var result = await _userManager.CreateAsync(user, employee.Password);

            if (employee.IsShopAdmin)
            {
                await _userManager.AddToRoleAsync(user, "Shop-Admin");

            }
            else
            {
                await _userManager.AddToRoleAsync(user, "Shop-Employee");
            }

            return result.Succeeded;

        }

        public async Task<User?> Login(UserLoginDTO client)
        {
            var user = await _userManager.FindByNameAsync(client.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, client.Password))
            {
                return null;
            }

            return user;

        }

        public async Task<bool> ChangePassword(string userId, string oldPassword, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded;
        }

        public async Task<bool> ChangeEmail(string userId, string newEmail)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            user.Email = newEmail;
            user.NormalizedEmail = newEmail.ToUpper();
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }


    }
}
