using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Administrator : User
    {
        public DateTime LastLogin { get; set; } 
    }
}
