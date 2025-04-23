using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;
using API.Dto;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserModelRepository : IUserModelRepository
    {
        private readonly RestaurantContext _context;

        
        public UserModelRepository(RestaurantContext context){
            _context = context;
        }

        public UserModel GetUserById(int userId)
        {
            return _context.UserModels.Where(p=>p.userId == userId).FirstOrDefault();
        }

        public UserModel GetUserByUsernameAndPassword(string login, string password)
        {
            var uzytkownik = _context.UserModels.SingleOrDefault(p=>p.login == login && p.password == password);

            return uzytkownik;
        }

        public UserModel GetUserLoginByUserName(string userName)
        {
            return _context.UserModels.Where(o=>o.userName == userName).FirstOrDefault();
        }

        public bool UserExists(int userId){
            return _context.UserModels.Any(o=> o.userId == userId);
         }

        public bool CreateUser(UserModel userModel){
            _context.Add(userModel);
            return Save();
         }
        public bool Save(){
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }    
        
    }
}