using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class VehicleDto
    {
        public int vehicleId { get; set; }
        public string model { get; set; }
        public bool issued {get; set;}
        public int orderId {get; set;}
        
    }
}