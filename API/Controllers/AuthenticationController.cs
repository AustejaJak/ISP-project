using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly StoreContext _context;
        public AuthenticationController(StoreContext storeContext)
        {
            _context = storeContext;
        }
    }
}
