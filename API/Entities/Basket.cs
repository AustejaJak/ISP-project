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
            var existingItem = Items.FirstOrDefault(it => it.ProductId.Equals(product.SKU));
            if (existingItem == null)
            {
                Items.Add(new BasketItem { Product = product, ProductId = product.SKU, Quantity = quantity });
            }
            else
            {
                existingItem.Quantity += quantity;

            }

            TotalSum += product.Cost * quantity;
            ItemCount += quantity;
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
                Items.Remove(item);
                ItemCount -= itemsCount;
                if (ItemCount <= 0)
                {
                    ItemCount = 0;
                    TotalSum = 0;
                    return;
                }
                TotalSum -= itemsCount * item.Product.Cost;                           
                return;
            }
            TotalSum -= item.Product.Cost * quantity;
            ItemCount -= quantity;
        }

    }
}
