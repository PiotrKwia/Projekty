using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;
namespace API.Repository
{
    public class MenuRepository : IMenuRepository
    {
        private readonly RestaurantContext _context;
        
        public MenuRepository(RestaurantContext context)
        {
            _context = context;
        }
        public ICollection<Menu> GetMenus(){
            return _context.Menus.ToList();
        }
        public Menu GetMenu(int menuId){
            return _context.Menus.Where(p=>p.menuId == menuId).FirstOrDefault();
        }
        public ICollection<Meal> GetMealsByMenu(int mealId){
            return _context.Meals.Where(p=> p.Menu.menuId == mealId).ToList();
        }
        public bool MenuExists(int menuId){
            return _context.Menus.Any(p=>p.menuId == menuId);
        }
    }
}