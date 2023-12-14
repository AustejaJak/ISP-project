using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class PaymentDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string CardNumber { get; set; } = null!;
        public string BillingCity { get; set; } = null!;
        public string BillingStreet { get; set; } = null!; 
        public virtual string ClientId { get; set; } = null!;

    }
}
