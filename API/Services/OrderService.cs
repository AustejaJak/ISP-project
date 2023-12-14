using API.Data;
using API.Data.DTOs;

namespace API.Services
{
    public class OrderService
    {
        private readonly StoreContext _storeContext;

        public OrderService(StoreContext storeContext) 
        {
            _storeContext = storeContext;
        }

        public async Task<OrderDTO> CreateOrder()
        {
            return null;
        }
    }
}
