using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class ClientService : IClientService
    {
        private readonly UserManager<Client> _userManager;

        public ClientService(UserManager<Client> userManager)
        {
            _userManager = userManager;
        }
        public async Task<bool> ChangeDeliveryAddress(string userId, string deliveryAddress)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            user.DeliveryAddress = deliveryAddress;
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }
    }
}
