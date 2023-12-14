namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public float TotalSum { get; set; }
        public int ItemCount { get; set; }

        public void AddItem(BasketItem item, int quantity)
        {

        }

        public void RemoveItem(int itemId, int quantity)
        {

        }

        //private GetTotalSum()
        //{
        //    TotalSum = 0;
        //    foreach(BasketItem item in Items)
        //    {
        //        TotalSum += item.
        //    }
        //}
    }
}
