using API.Entities;

namespace API.Data.DTOs
{
    public class UserInfoDTO
    {
        public User User { get; set; } = null!;
        public List<string> Roles { get; set; } = new List<string>();
    }
}
