using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Services
{
    public class AdminService : IAdminService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly StoreContext _storeContext;
        private readonly SignInManager<User> _signInManager;

        public AdminService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, StoreContext storeContext, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _storeContext = storeContext;
            _signInManager = signInManager;
        }

        public async Task<bool> RemoveAccount(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
            
        }

        public async Task<Discount> CreateDiscountCode(DiscountCodeDTO data)
        {
            if (data == null)
            {
                return null;
            }

            Discount disc = new Discount()
            {
                DiscountAmount = data.Discount,
                DiscountStart = data.StartDate,
                DiscountEnd = data.EndDate,
                MinimalAmount = data.MinSum,
                Code = data.Code
            };

            await _storeContext.Discounts.AddAsync(disc);
            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result)
            {
                return disc;
            }


            return null; 
        }

        public async Task<Discount> ManipulateDiscountCode(int discountId, DiscountEditDTO modifiedDiscountCode)
        {
            var discount = await _storeContext.Discounts.FindAsync(discountId);
            if (discount == null)
            {
                return null;
            }

            string jsonString = System.Text.Json.JsonSerializer.Serialize<DiscountEditDTO>(modifiedDiscountCode);
            JsonConvert.PopulateObject(jsonString, discount);
            await _storeContext.SaveChangesAsync();

            return discount;
        }

        public async Task<User> UpdateUserRole(ChangeRolesDTO data)
        {
            var user = await _userManager.FindByIdAsync(data.UserId);
            if (user == null)
            {
                return null;
            }
            var existingRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, existingRoles);
            var result = await _userManager.AddToRolesAsync(user, data.Roles);
            await _userManager.UpdateAsync(user);
            if(result.Succeeded)
            {
                await _signInManager.RefreshSignInAsync(user);
            }
            return user;

            
        }

        public async Task<InventorySummary> CreateInventorySummary()
        {
            var products = new List<Product>();
            if (_storeContext.Products != null)
            {
                var productsInStore = await _storeContext.Products.ToListAsync();
                products.AddRange(productsInStore);
            }

            float averagePrice = products.Select(prod => prod.Cost).Sum() / products.Count;

            var inventorySummary = new InventorySummary()
            {
                Products = products,
                Amount = products.Count,
                CreatedDate = DateTime.Now,
                AveragePrice = averagePrice
            };

            return inventorySummary;

        }
        
    }
}
