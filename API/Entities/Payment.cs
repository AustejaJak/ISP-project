using API.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Payment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public PaymentType PaymentType { get; set; }
        public bool IsPaid { get; set; }
        public string DeliveryAddress { get; set; } = null!;
        public virtual Order Order { get; set; } = null!;
        public virtual int OrderId { get; set; }

    }
}
