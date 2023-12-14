namespace API.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = null!; 
        public DateTime ReviewDate { get; set; } = DateTime.Now;
        public int LikeAmount { get; set; }
        public string? PictureUrl { get; set; }
        public int ProductId { get; set; }
    }
}
