using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Basket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public float TotalSum { get; set; } = 0;
        public int ItemCount { get; set; } = 0;
        public string? PaymentIntentId { get; set; }
        public string? ClientSecret { get; set; }
        public string ClientId { get; set; } = null!;
        public virtual ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if(Items.All(it => !it.Id.Equals(product.SKU)))
            {
                Items.Add(new BasketItem { Product = product, ProductId = product.SKU, Quantity = quantity });
            }

            var item = Items.FirstOrDefault(it => it.ProductId.Equals(product.SKU));
            if (item != null)
            {
                item.Quantity += quantity;
                TotalSum += product.Cost * quantity;
                ItemCount += quantity;
            }

            

        }

        public void RemoveItem(string itemId, int quantity)
        {
            var item = Items.FirstOrDefault(it => it.ProductId.Equals(itemId));
            if (item == null)
            {
                return;
            }
            var itemsCount = item.Quantity;
            item.Quantity -= quantity;
            if (item.Quantity <= 0)
            {
                TotalSum -= itemsCount * item.Product.Cost;
                ItemCount -= itemsCount;
                Items.Remove(item);
            }
            TotalSum -= item.Product.Cost * quantity;
            ItemCount -= quantity;
        }

    }
}
