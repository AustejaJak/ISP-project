using API.Entities.Enums;

namespace API.Entities
{
    public class User
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; } 
        public bool HasAccepted { get; set;  }
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public string? DeliveryAddress { get; set; }
        public List<Wishlist> Wishlist { get; set; } = new List<Wishlist>();
        public List<PaymentDetails> PaymentDetails { get; set; } = new List<PaymentDetails>();
        public List<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
    }
}
