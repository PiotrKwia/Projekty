using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Vehicle
    {
        [Key]
        public int vehicleId { get; set; }
        public string model { get; set; }
        public bool issued {get; set;}
        public int orderId {get; set;}
        public ICollection<Order> Orders{get; set;}
    }

}