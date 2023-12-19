namespace API.Data.DTOs
{
    public class BasketDTO
    {
        public required int Id { get; set; }
        public required string ClientId { get; set; }
        public required string? PaymentIntentId { get; set; }
        public required string? ClientSecret { get; set; }
        public required float TotalSum { get; set; }
        public required int TotalItemCount { get; set; }
        public required List<BasketItemDTO> Items { get; set; }

    }
}
