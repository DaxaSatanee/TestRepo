using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreAngular.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;

namespace AspNetCoreAngular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private string v1;
        //string v2 = _iConfig.GetValue<string>("DBConnection:ConnectionString");

        public ItemController(IConfiguration iConfig)
        {
            v1 = iConfig.GetSection("DBConnection").GetSection("ConnectionString").Value;
        }

        [HttpGet]
        public List<Item> Get()
        {
            var db = new SqlConnection(v1);
            
            var sql = "select * from Item";
            List<Item> items = db.Query<Item>(sql).ToList();

            db.Close();
            return items;
        }

        [HttpPost]
        public void Save(Item item)
        {
            
        }
    }
}