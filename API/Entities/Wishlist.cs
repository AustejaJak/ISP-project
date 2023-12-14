namespace API.Entities
{
    public class Wishlist
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
