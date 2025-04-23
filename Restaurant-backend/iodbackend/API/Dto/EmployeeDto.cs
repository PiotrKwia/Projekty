using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class EmployeeDto
    {     
        public int employeeId { get; set; }
        public string name { get; set; }
        public string address {get; set;}
        public string experience {get; set;}
        public int userId {get;set;}
        
        
    }
}