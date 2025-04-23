using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Delivery
    {
        [Key]
        public int deliveryId { get; set; }
        public int employeeId {get; set;}
        public int estimatedTime { get; set; }
        public string clientAdress { get; set; }
        public string location { get; set; }
        public Employee Employee { get; set; }
    }

}