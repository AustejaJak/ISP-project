using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Wishlist
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public virtual string ClientId { get; set; } = null!;
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

        public bool AddProduct(Product product)
        {
            var existingProduct = Products.Where(x => x.SKU.Equals(product.SKU)).FirstOrDefault();
            if (existingProduct != null)
            {
                return false;
            }
            else
            {
                Products.Add(product);
                return true;
            }
        }
    }
}
