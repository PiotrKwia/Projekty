using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class DeliveryDto
    {
        public int deliveryId {get; set;}
        public int estimatedTime { get; set; }
        public string clientAdress { get; set; }
        public string location { get; set; } 
        public int employeeId {get;set;}
    }
}