using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Menu
    {
        [Key]
        public int menuId { get; set; }
        public int mealId { get; set; }
        public bool ceased { get; set; }    
        public ICollection<Meal> Meals { get; set; }
    }
}