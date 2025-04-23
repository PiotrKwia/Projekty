using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IMenuRepository
    {
        ICollection<Menu> GetMenus();
        Menu GetMenu(int menuId);
        ICollection<Meal> GetMealsByMenu(int menuId);
        bool MenuExists(int menuId);
    }
}