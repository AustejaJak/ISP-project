using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options) 
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<InventorySummary> InventorySummaries { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopEmployee> ShopEmployees { get; set; }
        public DbSet<OrderSummary> OrderSummaries { get; set; }
        public DbSet<BasketItem> BasketItems { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Payment> Payments { get; set; }

    }
}