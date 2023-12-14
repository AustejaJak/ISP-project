namespace API.Entities
{
    public class PaymentDetails
    {
        public int Id { get; set; }
        public string CardNumber { get; set; } = null!;
        public string BillingCity { get; set; } = null!;
        public string BillingStreet { get; set; } = null!; 
        public int UserId { get; set; }

    }
}
