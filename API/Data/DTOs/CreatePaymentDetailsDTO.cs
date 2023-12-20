namespace API.Data.DTOs
{
    public class CreatePaymentDetailsDTO
    {
        public required string CardNumber { get; set; } = null!;
        public required string BillingCity { get; set; } = null!;
        public required string BillingStreet { get; set; } = null!;
    }
}
