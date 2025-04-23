using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Model;
using AutoMapper;

namespace API.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles(){
            CreateMap<UserModel,UserLoginDto>();
            CreateMap<UserModel,UserDto>();
            CreateMap<Delivery,DeliveryDto>();
            CreateMap<UserDto,UserModel>();
            CreateMap<DeliveryDto,Delivery>();
            CreateMap<EmployeeDto,Employee>();
            CreateMap<Employee,EmployeeDto>();
            CreateMap<Order,OrderDto>();
            CreateMap<OrderDto,Order>();
            CreateMap<Meal,MealDto>();
            CreateMap<MealDto,Meal>();
            CreateMap<MenuDto,Menu>();
            CreateMap<Menu,MenuDto>();
            CreateMap<VehicleDto,Vehicle>();
            CreateMap<Vehicle,VehicleDto>();
            
        }
    }
}