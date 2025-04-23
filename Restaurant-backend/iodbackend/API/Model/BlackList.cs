using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class BlackList
    {
        [Key]
        public int blackListId { get; set; }
        public int userId {get; set;}
        public UserModel User { get; set; }
    }
}