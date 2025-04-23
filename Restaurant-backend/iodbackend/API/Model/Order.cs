using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Order
    {
        [Key]
        public int orderId { get; set; }
        public double totalAmount { get; set; }
        public int client { get; set; }
        public int mealId { get; set; }
        public int employeeId {get; set;}
        public int vehicleId{get;set;}
        public Employee Employee{get; set;}
        public Meal Meal{get; set;}    
        public Vehicle Vehicle{get; set;}   
    }

}