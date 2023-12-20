namespace API.Data.DTOs
{
    public class ReviewDTO
    {
        public int Rating { get; set; }
        public required string Comment { get; set; }
        public DateTime ReviewDate { get; set; } = DateTime.Now;
        public int LikeAmount { get; set; }
        public string? PictureUrl { get; set; }
    }
}
