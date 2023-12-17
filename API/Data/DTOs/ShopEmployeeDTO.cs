using API.Entities.Enums;

namespace API.Data.DTOs
{
    public class ShopEmployeeDTO
    {
        public required string Address { get; set; } 
        public required float Wage { get; set; }
        public required Gender Gender { get; set; }
        public required string JobPosition { get; set; } 
    }
}
