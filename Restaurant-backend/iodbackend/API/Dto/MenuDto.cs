using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
namespace API.Dto
{
    public class MenuDto
    {
        public int menuId { get; set; }
      
        public bool ceased { get; set; }    
        public ICollection<Meal> Meals { get; set; }
    }
}