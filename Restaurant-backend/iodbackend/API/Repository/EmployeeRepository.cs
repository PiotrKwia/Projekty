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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly RestaurantContext _context;

        
        public EmployeeRepository(RestaurantContext context){
            _context = context;
        }


        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.Where(e => e.employeeId == id).FirstOrDefault();
        }

        public List<Order> GetOrdersByEmployeeId(int employeeId)
        {

            var a = _context.Orders.Where(o=>o.employeeId == employeeId).ToList();
            return a;
        }
    }
}