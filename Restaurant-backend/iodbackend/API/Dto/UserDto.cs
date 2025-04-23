using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class UserDto
    {
        public int userId { get; set; }
        public string userName { get; set; }
        public string address { get; set; }
        public string role {get; set; }
        
    }
}