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
    public class VehicleRepository : IVehicleRepository
    {
        private readonly RestaurantContext _context;

        
        public VehicleRepository(RestaurantContext context){
            _context = context;
        }


        public Vehicle GetVehicleById(int id)
        {
            return _context.Vehicles.Where(v => v.vehicleId == id).FirstOrDefault();
        }
    }
}