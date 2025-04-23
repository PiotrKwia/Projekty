 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<UserModel> UserModels  { get; set; }
        public DbSet<Order> Orders {get; set;}
        public DbSet<BlackList> BlackLists {get;set;}
        public DbSet<Calendar> Calendars {get;set;}
        public DbSet<Delivery> Deliveries {get;set;}
        public DbSet<Employee> Employees {get;set;}
        public DbSet<FinancialReport> FinancialReports {get;set;}
        public DbSet<Meal> Meals {get;set;}
        public DbSet<Menu> Menus {get;set;}
        public DbSet<Vehicle> Vehicles {get;set;}


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlackList>()
                .HasOne(bl => bl.User)
                .WithOne()
                .HasForeignKey<BlackList>(bl => bl.userId);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.UserModel)
                .WithOne(u => u.Employee)
                .HasForeignKey<Employee>(e => e.userId);

            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Employee)
                .WithOne(e => e.Delivery)
                .HasForeignKey<Delivery>(d => d.employeeId);

            modelBuilder.Entity<FinancialReport>()
                .HasOne(fr => fr.Employee)
                .WithMany(e => e.FinancialReports)
                .HasForeignKey(fr => fr.employeeId);

            modelBuilder.Entity<Calendar>()
                .HasOne(c => c.Employee)
                .WithOne(e => e.Calendar)
                .HasForeignKey<Calendar>(c => c.employeeId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Employee)
                .WithMany(e => e.Orders)
                .HasForeignKey(o => o.employeeId);

            modelBuilder.Entity<Meal>()
                .HasMany(m => m.Orders)
                .WithOne(o => o.Meal)
                .HasForeignKey(o => o.mealId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Vehicle)
                .WithMany(v => v.Orders)
                .HasForeignKey(o => o.vehicleId);

            modelBuilder.Entity<Meal>()
                .HasOne(m => m.Menu)
                .WithMany(mn => mn.Meals)
                .HasForeignKey(m => m.menuId);

            base.OnModelCreating(modelBuilder);
        }
    }
}