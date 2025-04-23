using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class OrderDto
    {         
        public int orderId { get; set; }
        public double totalAmount { get; set; }
        public int client { get; set; }
        public int mealId { get; set; }
        public int employeeId {get; set;}
        public int vehicleId{get;set;}
        
    }
}