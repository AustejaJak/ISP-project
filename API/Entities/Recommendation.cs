namespace API.Entities
{
    public class Recommendation
    {
        public int Id { get; set; }
        public string Category { get; set; } = null!;
        public DateTime Time { get; set; }
        public int UserId { get; set; }
    }
}
