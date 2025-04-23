using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Model;

namespace API.Interfaces
{
    public interface IUserModelRepository
    {
        UserModel GetUserLoginByUserName(string userName);
        UserModel GetUserById(int id);
        UserModel GetUserByUsernameAndPassword(string login, string password);
       
       public bool UserExists(int userId);

       bool CreateUser(UserModel userModel);
       bool Save();
      
        
       
       
    }

}