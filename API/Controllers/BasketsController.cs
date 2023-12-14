using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly StoreContext _context;
        public BasketsController(StoreContext storeContext)
        {
            _context = storeContext;
        }
    }
}
