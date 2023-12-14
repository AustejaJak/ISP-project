using API.Data.DTOs;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface IUserAuthService
    {
        Task<bool> ChangeEmail(string userId, string newEmail);
        Task<bool> ChangePassword(string username, string oldPassword, string newPassword);
        Task<User?> Login(UserLoginDTO client);
        Task<bool> RegisterClient(ClientRegisterDTO client);
        Task<bool> RegisterShopWorker(EmployeeRegisterDTO employee);
    }
}