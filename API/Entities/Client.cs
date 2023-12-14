using API.Entities.Enums;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Client : User
    {
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; } 
        public bool HasAccepted { get; set;  }
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public string? DeliveryAddress { get; set; }
        public virtual Wishlist? Wishlist { get; set; }
        public virtual ICollection<PaymentDetails> PaymentDetails { get; set; } = new List<PaymentDetails>();
        public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
    }
}
