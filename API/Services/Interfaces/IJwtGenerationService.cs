using API.Entities;

namespace API.Services.Interfaces
{
    public interface IJwtGenerationService
    {
        Task<string> CreateToken(User user);
    }
}