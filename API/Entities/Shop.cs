namespace API.Entities
{
    public class Shop
    {
        public int Id { get; set; }
        public string Address { get; set; } = null!; 
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public List<ShopEmployee> Employees { get; set; } = new List<ShopEmployee>();
    }
}
