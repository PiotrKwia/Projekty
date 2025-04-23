using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IDeliveryRepository
    {
       public ICollection<Delivery> GetDeliveries();
       public Delivery GetDelivery(int deliveryId);
       public bool DeliveryExists(int deliveryId);

       public bool CreateDelivery(Delivery delivery);
       
        public bool Save();
    }
}