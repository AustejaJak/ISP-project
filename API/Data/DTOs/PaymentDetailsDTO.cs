namespace API.Data.DTOs
{
    public class PaymentDetailsDTO
    {
        public int Id { get; set; }
        public required string CardNumber { get; set; } = null!;
        public required string BillingCity { get; set; } = null!;
        public required string BillingStreet { get; set; } = null!;
    }
}
