using API.Entities;
using API.Entities.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, IdentityRole<string>, string>
    {
        public StoreContext(DbContextOptions options) : base(options) 
        {

        }

        public DbSet<Client> Clients { get; set; }
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
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<ProductType> ProductType { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "1",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "2",
                    Name = "Client",
                    NormalizedName = "CLIENT"
                },
                new IdentityRole
                {
                    Id = "3",
                    Name = "Shop-Employee",
                    NormalizedName = "SHOP-EMPLOYEE"
                },
                new IdentityRole
                {
                    Id = "4",
                    Name = "Shop-Admin",
                    NormalizedName = "SHOP-ADMIN"
                }
            });

            builder.Entity<ProductType>().HasData(new List<ProductType>
            {
                new ProductType
                {
                    Id = 1,
                    Type = "Watches"
                },
                new ProductType
                {
                    Id = 2,
                    Type = "Clotches"
                },
                new ProductType
                {
                    Id = 3,
                    Type = "Decorations"
                },
                new ProductType
                {
                    Id = 4,
                    Type = "Electronics"
                },
                new ProductType
                {
                    Id = 5,
                    Type = "Books"
                },

            });


        }


    }
}