using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
        public async Task<ActionResult<List<ProductDTO>>> GetProducts([FromQuery]ProductFilterParams test)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }


            if (test != null)
            {
                return await _context.Products
                    .Where(p => string.IsNullOrEmpty(test.Brands) || p.Brand.ToLower().Equals(test.Brands.ToLower()))
                    .Where(p => string.IsNullOrEmpty(test.Types) || p.Type.ToLower().Equals(test.Types.ToLower()))
                    .Where(p => !test.PriceFrom.HasValue || p.Cost >= test.PriceFrom.Value)
                    .Where(p => !test.PriceTo.HasValue || p.Cost <= test.PriceTo.Value)
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
            if (_context.Products == null)
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
            if (_context.Products == null)
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
            if (_context.Products == null)
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

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var types = await _context.Products.Select(p => p.Type).ToListAsync();
            var brands = await _context.Products.Select(p => p.Brand).ToListAsync();

            return Ok(new { types, brands });
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<ProductDTO>>> GetByType(string type)
        {
            if (type == null)
            {
                return BadRequest();
            }

            var products = await _context.Products.Where(x => x.Type.Equals(type)).Select(prod => new ProductDTO
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
                IsConfirmed = prod.IsConfirmed
            }).ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);


        }

        
    }
}
