namespace API.Data.DTOs
{
    public class BasketDTO
    {
        public required int Id { get; set; }
        public required string ClientId { get; set; }
        public required List<BasketItemDTO> Items { get; set; }

    }
}
