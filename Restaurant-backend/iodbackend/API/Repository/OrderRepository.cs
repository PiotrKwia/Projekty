using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly RestaurantContext _context;

        
        public OrderRepository(RestaurantContext context){
            _context = context;
        }


        public Order GetOrderById(int id)
        {
            return _context.Orders.Where(o => o.orderId == id).FirstOrDefault();
        }

        public List<Order> GetOrdersByClient(int client)
        {

            var a = _context.Orders.Where(o=>o.client == client).ToList();
            return a;
        }

        public bool CreateOrder(Order order){
            _context.Add(order);
            return Save();
        }
       
       public bool Save(){
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
        
    }
}