using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IEmployeeRepository
    {
       Employee GetEmployeeById(int id);
       List<Order> GetOrdersByEmployeeId(int employeeId);
    }
}