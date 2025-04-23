using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Model;
using API.Interfaces;
using API.Dto;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class DeliveryRepository : IDeliveryRepository
    {

        private readonly RestaurantContext _context;
        

        public DeliveryRepository(RestaurantContext context)
        {
            _context = context;
            
        }
       public ICollection<Delivery> GetDeliveries(){
            return _context.Deliveries.ToList();
        }
       public Delivery GetDelivery(int deliveryId){
            return _context.Deliveries.Where(p=>p.deliveryId == deliveryId).FirstOrDefault();
        }
      public  bool DeliveryExists(int deliveryId){
            return _context.Deliveries.Any(p=>p.deliveryId == deliveryId);
        }

       public bool CreateDelivery(Delivery delivery){
            _context.Add(delivery);
            return Save();
        }
       
       public bool Save(){
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}