using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext storeContext)
        {
            _context = storeContext;
        }
    }
}
