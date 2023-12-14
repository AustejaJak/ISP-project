using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Shop
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Address { get; set; } = null!; 
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public virtual ICollection<ShopEmployee> Employees { get; set; } = new List<ShopEmployee>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
