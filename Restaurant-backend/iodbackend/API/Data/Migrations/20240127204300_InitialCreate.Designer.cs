﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(RestaurantContext))]
    [Migration("20240127204300_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.15");

            modelBuilder.Entity("API.Model.BlackList", b =>
                {
                    b.Property<int>("blackListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.HasKey("blackListId");

                    b.HasIndex("userId")
                        .IsUnique();

                    b.ToTable("BlackLists");
                });

            modelBuilder.Entity("API.Model.Calendar", b =>
                {
                    b.Property<int>("calendarId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("date")
                        .HasColumnType("TEXT");

                    b.Property<int>("employeeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("calendarId");

                    b.HasIndex("employeeId")
                        .IsUnique();

                    b.ToTable("Calendars");
                });

            modelBuilder.Entity("API.Model.Delivery", b =>
                {
                    b.Property<int>("deliveryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("clientAdress")
                        .HasColumnType("TEXT");

                    b.Property<int>("employeeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("estimatedTime")
                        .HasColumnType("INTEGER");

                    b.Property<string>("location")
                        .HasColumnType("TEXT");

                    b.HasKey("deliveryId");

                    b.HasIndex("employeeId")
                        .IsUnique();

                    b.ToTable("Deliveries");
                });

            modelBuilder.Entity("API.Model.Employee", b =>
                {
                    b.Property<int>("employeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("address")
                        .HasColumnType("TEXT");

                    b.Property<string>("experience")
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.HasKey("employeeId");

                    b.HasIndex("userId")
                        .IsUnique();

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("API.Model.FinancialReport", b =>
                {
                    b.Property<int>("reportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("balance")
                        .HasColumnType("REAL");

                    b.Property<double>("bill")
                        .HasColumnType("REAL");

                    b.Property<int>("employeeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("reportId");

                    b.HasIndex("employeeId");

                    b.ToTable("FinancialReports");
                });

            modelBuilder.Entity("API.Model.Meal", b =>
                {
                    b.Property<int>("mealId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<double>("mealPrice")
                        .HasColumnType("REAL");

                    b.Property<int>("menuId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.HasKey("mealId");

                    b.HasIndex("menuId");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("API.Model.Menu", b =>
                {
                    b.Property<int>("menuId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ceased")
                        .HasColumnType("INTEGER");

                    b.Property<int>("mealId")
                        .HasColumnType("INTEGER");

                    b.HasKey("menuId");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("API.Model.Order", b =>
                {
                    b.Property<int>("orderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("client")
                        .HasColumnType("INTEGER");

                    b.Property<int>("employeeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("mealId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("totalAmount")
                        .HasColumnType("REAL");

                    b.Property<int>("vehicleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("orderId");

                    b.HasIndex("employeeId");

                    b.HasIndex("mealId");

                    b.HasIndex("vehicleId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("API.Model.UserModel", b =>
                {
                    b.Property<int>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("address")
                        .HasColumnType("TEXT");

                    b.Property<string>("login")
                        .HasColumnType("TEXT");

                    b.Property<string>("password")
                        .HasColumnType("TEXT");

                    b.Property<string>("role")
                        .HasColumnType("TEXT");

                    b.Property<string>("userName")
                        .HasColumnType("TEXT");

                    b.HasKey("userId");

                    b.ToTable("UserModels");
                });

            modelBuilder.Entity("API.Model.Vehicle", b =>
                {
                    b.Property<int>("vehicleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("issued")
                        .HasColumnType("INTEGER");

                    b.Property<string>("model")
                        .HasColumnType("TEXT");

                    b.Property<int>("orderId")
                        .HasColumnType("INTEGER");

                    b.HasKey("vehicleId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("API.Model.BlackList", b =>
                {
                    b.HasOne("API.Model.UserModel", "User")
                        .WithOne()
                        .HasForeignKey("API.Model.BlackList", "userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Model.Calendar", b =>
                {
                    b.HasOne("API.Model.Employee", "Employee")
                        .WithOne("Calendar")
                        .HasForeignKey("API.Model.Calendar", "employeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("API.Model.Delivery", b =>
                {
                    b.HasOne("API.Model.Employee", "Employee")
                        .WithOne("Delivery")
                        .HasForeignKey("API.Model.Delivery", "employeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("API.Model.Employee", b =>
                {
                    b.HasOne("API.Model.UserModel", "UserModel")
                        .WithOne("Employee")
                        .HasForeignKey("API.Model.Employee", "userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserModel");
                });

            modelBuilder.Entity("API.Model.FinancialReport", b =>
                {
                    b.HasOne("API.Model.Employee", "Employee")
                        .WithMany("FinancialReports")
                        .HasForeignKey("employeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("API.Model.Meal", b =>
                {
                    b.HasOne("API.Model.Menu", "Menu")
                        .WithMany("Meals")
                        .HasForeignKey("menuId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Menu");
                });

            modelBuilder.Entity("API.Model.Order", b =>
                {
                    b.HasOne("API.Model.Employee", "Employee")
                        .WithMany("Orders")
                        .HasForeignKey("employeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Model.Meal", "Meal")
                        .WithMany("Orders")
                        .HasForeignKey("mealId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Model.Vehicle", "Vehicle")
                        .WithMany("Orders")
                        .HasForeignKey("vehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Meal");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("API.Model.Employee", b =>
                {
                    b.Navigation("Calendar");

                    b.Navigation("Delivery");

                    b.Navigation("FinancialReports");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("API.Model.Meal", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("API.Model.Menu", b =>
                {
                    b.Navigation("Meals");
                });

            modelBuilder.Entity("API.Model.UserModel", b =>
                {
                    b.Navigation("Employee");
                });

            modelBuilder.Entity("API.Model.Vehicle", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
