using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
       Order GetOrderById(int id);
       List<Order> GetOrdersByClient(int client);
        public bool CreateOrder(Order order);
    }
}