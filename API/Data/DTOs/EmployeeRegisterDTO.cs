using API.Entities.Enums;

namespace API.Data.DTOs
{
    public class EmployeeRegisterDTO
    {
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; } 
        public float Wage { get; set; }
        public required Gender Gender { get; set; } 
        public required string JobPosition { get; set; }
        public required int ShopId { get; set; }
    }
}
