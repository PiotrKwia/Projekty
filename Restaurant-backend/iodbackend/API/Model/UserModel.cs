using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace API.Model
{
    public class UserModel
    {

        [Key]
        public int userId { get; set; }
        public string userName { get; set; }
        public string address { get; set; }
        public string role {get; set; }
        public string login {get; set; }
        public string password {get; set;}

        public Employee Employee { get; set; }
    }
}