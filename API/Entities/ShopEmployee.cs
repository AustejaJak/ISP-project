using API.Entities.Enums;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ShopEmployee : User
    {
        public string Address { get; set; } = null!;
        public float Wage { get; set; }
        public Gender Gender { get; set; } 
        public string JobPosition { get; set; } = null!;
        public virtual int ShopId { get; set; }

        
    }
}
