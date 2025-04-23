using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Employee
    {
        [Key]
        public int employeeId { get; set; }
        public string name { get; set; }
        public string address {get; set;}
        public string experience {get; set;}
        public int userId {get;set;}
        public UserModel UserModel { get; set; }
        public Delivery Delivery{get; set;}
        public ICollection<FinancialReport> FinancialReports { get; set; }
        public Calendar Calendar{get; set;}
        public ICollection<Order> Orders { get; set; }
    }
}