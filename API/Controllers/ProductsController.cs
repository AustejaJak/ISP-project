using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly IProductService _productService;

        public ProductsController(StoreContext storeContext, IProductService productService)
        {
            _context = storeContext;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts([FromQuery]ProductFilterParams filterParams)
        {
            if (!await _context.Products.AnyAsync())
            {
                return NotFound();
            }


            if (!filterParams.AreAllFieldsNull())
            {
                var prods = await _context.Products
                    .Where(p => string.IsNullOrEmpty(filterParams.Brands) || p.Brand.ToLower().Equals(filterParams.Brands.ToLower()))
                    .Where(p => string.IsNullOrEmpty(filterParams.Types) || p.Type.ToLower().Equals(filterParams.Types.ToLower()))
                    .Where(p => !filterParams.PriceFrom.HasValue || p.Cost >= filterParams.PriceFrom.Value)
                    .Where(p => !filterParams.PriceTo.HasValue || p.Cost <= filterParams.PriceTo.Value)
                    .Select(prod => 
                    new ProductDTO()
                    {
                        SKU = prod.SKU,
                        Name = prod.Name,
                        Description = prod.Description,
                        Cost = prod.Cost,
                        PictureUrl = prod.PictureUrl,
                        QuantityInStorage = prod.QuantityInStorage,
                        Type = prod.Type,
                        CountryOfOrigin = prod.CountryOfOrigin,
                        Brand = prod.Brand,
                        Measurements = prod.Measurements,
                        QuantityInPackage = prod.QuantityInPackage,
                        Weight = prod.Weight,
                        IsConfirmed = prod.IsConfirmed,
                    })
                    .ToListAsync();

                if (prods.IsNullOrEmpty())
                {
                    return NotFound();
                }
                else
                {
                    return prods;
                }


            }

            var products = await _context.Products.Select(prod =>
                new ProductDTO()
                {
                    SKU = prod.SKU,
                    Name = prod.Name,
                    Description = prod.Description,
                    Cost = prod.Cost,
                    PictureUrl = prod.PictureUrl,
                    QuantityInStorage = prod.QuantityInStorage,
                    Type = prod.Type,
                    CountryOfOrigin = prod.CountryOfOrigin,
                    Brand = prod.Brand,
                    Measurements = prod.Measurements,
                    QuantityInPackage = prod.QuantityInPackage,
                    Weight = prod.Weight,
                    IsConfirmed = prod.IsConfirmed,

                }
            ).ToListAsync();

            return products;

        }

        // [Authorize(Roles = "Client")]
        [HttpGet("{sku}", Name = "GetById")]
        public async Task<ActionResult<ProductDTO>> GetProductById(string sku)
        {
            if (!await _context.Products.AnyAsync())
            {
                return NotFound();
            }

            var product = await _context.Products.Where(prod => prod.SKU.Equals(sku)).SingleOrDefaultAsync();
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        //[Authorize(Roles = "Client")]
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> CreateProduct(ProductDTO productDTO)
        {
            var product = new Product()
            {
                SKU = productDTO.SKU,
                Name = productDTO.Name,
                Description = productDTO.Description,
                Cost = productDTO.Cost,
                PictureUrl = productDTO.PictureUrl,
                QuantityInStorage = productDTO.QuantityInStorage,
                Type = productDTO.Type,
                CountryOfOrigin = productDTO.CountryOfOrigin,
                Brand = productDTO.Brand,
                Measurements = productDTO.Measurements,
                QuantityInPackage = productDTO.QuantityInPackage,
                Weight = productDTO.Weight,
                IsConfirmed = productDTO.IsConfirmed,
            };

            await _context.Products.AddAsync(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetById", new { sku = product.SKU }, product);
            }

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }


        //[Authorize(Roles = "Admin")]
        [HttpPatch("{sku}")]
        public async Task<ActionResult<ProductDTO>> UpdateProduct(string sku, [FromBody] ProductEditDTO productDTO)
        {
            if (!await _context.Products.AnyAsync())
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(sku);
            if (product == null)
            {
                return NotFound();
            }

            string jsonString = System.Text.Json.JsonSerializer.Serialize<ProductEditDTO>(productDTO);
            JsonConvert.PopulateObject(jsonString, product);
            await _context.SaveChangesAsync();

            ProductDTO updatedProduct = new ProductDTO()
            {
                SKU = product.SKU,
                Name = product.Name,
                Description = product.Description,
                Cost = product.Cost,
                PictureUrl = product.PictureUrl,
                QuantityInStorage = product.QuantityInStorage,
                Type = product.Type,
                CountryOfOrigin = product.CountryOfOrigin,
                Brand = product.Brand,
                Measurements = product.Measurements,
                QuantityInPackage = product.QuantityInPackage,
                Weight = product.Weight,
                IsConfirmed = product.IsConfirmed,
            };

            return Ok(updatedProduct);
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("{sku}")]
        public async Task<ActionResult> DeleteProduct(string sku)
        {
            if (!await _context.Products.AnyAsync())
            {
                return NotFound();
            }

            var product = await _context.Products.Where(prod => prod.SKU.Equals(sku)).SingleOrDefaultAsync();
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            bool result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return NoContent();
            }

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        [HttpGet("GetUnvalidated")]
        public async Task<ActionResult<List<Product>>> GetUnvalidatedProducts()
        {
            var products = await _productService.GetUnvalidatedProducts();
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpPost("{productId}")]
        public async Task<ActionResult> ValidateProduct(string productId)
        {
            var result = await _productService.ValidateProduct(productId);
            if (result == false)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetValidated")]
        public async Task<ActionResult<List<Product>>> GetValidatedProducts()
        {
            var products = await _productService.GetValidatedProducts();
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        //[HttpGet("filters")]
        //public async Task<ActionResult> GetFilters()
        //{
        //    var types = await _context.Products.Select(p => p.Type).ToListAsync();
        //    var brands = await _context.Products.Select(p => p.Brand).ToListAsync();

        //    return Ok(new { types, brands });
        //}

        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetTypes()
        {
            var types = await _context.ProductType.ToListAsync();
            if (types == null)
            {
                return NotFound();
            }
            return Ok(types);
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var types = await _context.ProductType.ToListAsync();
            if (types.IsNullOrEmpty())
            {
                return NotFound("No types were found");
            }

            var products = await _context.Products.ToListAsync();
            if (products.IsNullOrEmpty())
            {
                return NotFound("No products were found");
            }


            Dictionary<string, List<string>> typeBrandPairs = new Dictionary<string, List<string>>();
            foreach(var type in types)
            {
                var brands = products.Where(x => x.Type.ToLower().Equals(type.Type.ToLower())).Select(p => p.Brand).ToList();
                typeBrandPairs.Add(type.Type, brands);
            }

            return Ok(typeBrandPairs);

            
        }

        [HttpPost("inventorySummary")]
        public async Task<ActionResult<InventorySummary>> CreateInventorySummary()
        {
            var products = await _context.Products.ToListAsync();
            if (products.IsNullOrEmpty())
            {
                return BadRequest();
            }

            float avg = products.Sum(x => x.Cost) / products.Count;

            var summary = new InventorySummary()
            {
                Amount = products.Count,
                AveragePrice = avg,
                CreatedDate = DateTime.Now,
                Products = products.ToList()
            };

            _context.InventorySummaries.Add(summary);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(summary);
            }

            return BadRequest(new ProblemDetails() { Title = "There was a problem saving the inventory summary" });
            
        }

        [HttpGet("inventorySummaries")]
        public async Task<ActionResult<List<InventorySummary>>> GetInvetorySummaries()
        {
            var summaries = await _context.InventorySummaries.Include(summary => summary.Products).ToListAsync();
            if (summaries.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(summaries);
        }

        [Authorize]
        [HttpGet("recommendations")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductRecommendations()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return NotFound();
            }

            var userBasket = await _context.Baskets
                .Include(it => it.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.ClientId.Equals(userId));

            if (userBasket == null)
            {
                return NotFound("Basket of the user was not found");
            }

            if (userBasket.Items.Count == 0)
            {
                return BadRequest("User has no items in the basket");
            }

            var products = await _context.Products.ToListAsync();
            if (products.Count == 0)
            {
                return BadRequest(new ProblemDetails() { Title = "No products werte found" });
            }

            List<ProductDTO> suggestions = new List<ProductDTO>();
            foreach(var item in userBasket.Items)
            {
                foreach(var product in products)
                {
                    if((product.Type.Equals(item.Product.Type) || product.Brand.Equals(item.Product.Brand))&& !product.SKU.Equals(item.Product.SKU))
                    {
                        var productDTO = new ProductDTO()
                        {
                            SKU = product.SKU,
                            Name = product.Name,
                            Description = product.Description,
                            Cost = product.Cost,
                            PictureUrl = product.PictureUrl,
                            QuantityInStorage = product.QuantityInStorage,
                            Type = product.Type,
                            CountryOfOrigin = product.CountryOfOrigin,
                            Brand = product.Brand,
                            Measurements = product.Measurements,
                            QuantityInPackage = product.QuantityInPackage,
                            Weight = product.Weight,
                            IsConfirmed = product.IsConfirmed
                        };
                        suggestions.Add(productDTO);
                    }
                }
            }

            if (suggestions.Count > 0)
            {
                return Ok(suggestions);
            }
            else
            {
                return NotFound("No item suggestions were found for the user");
            }


        }


        
    }
}
