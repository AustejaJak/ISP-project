namespace API.Data.DTOs
{
    public class DiscountEditDTO
    {
        public string? Code { get; set; }
        public int? Discount { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? StartDate { get; set; }
        public float? MinSum { get; set; }
    }
}
