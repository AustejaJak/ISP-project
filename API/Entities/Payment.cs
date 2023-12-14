using API.Entities.Enums;

namespace API.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int OrdersId { get; set; }
        public PaymentType PaymentType { get; set; }
        public bool IsPaid { get; set; }
        public string DeliveryAddress { get; set; } = null!; 

    }
}
