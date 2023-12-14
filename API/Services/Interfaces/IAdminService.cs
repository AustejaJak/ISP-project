using API.Data.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.Interfaces
{
    public interface IAdminService
    {
        Task<Discount> CreateDiscountCode(DiscountCodeDTO data);
        Task<InventorySummary> CreateInventorySummary();
        Task<Discount> ManipulateDiscountCode(int discountId, DiscountEditDTO modifiedDiscountCode);
        Task<bool> RemoveAccount(string userId);
        Task<User> UpdateUserRole(ChangeRolesDTO data);
    }
}