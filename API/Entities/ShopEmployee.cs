using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ShopEmployee
    {
        [Key]
        public int PersonalIdentificationNumber { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Email { get; set; } = null!;
        public float Wage { get; set; }
        public string Gender { get; set; } = null!;
        public string JobPosition { get; set; } = null!;
        public int ShopId { get; set; }

        
    }
}
