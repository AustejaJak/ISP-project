using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<string>
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
    }
}
