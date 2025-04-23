using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class FinancialReport
    {
        [Key]
        public int reportId { get; set; }
        public double balance {get; set;}
        public double bill {get; set;}
        public int employeeId {get; set;}

        public Employee Employee{get; set;}
        
    }
}