using Microsoft.AspNetCore.Mvc;
using price_tracker_api.Logic;
using price_tracker_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace price_tracker_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            using (var dc = new DataContext())
            {
                return dc.Tests.ToList();
            }
        }

        [HttpPost]
        public void Post([FromBody]Test test)
        {
            DataContext.DoTransacted(context =>
            {
                if (test.Id == Guid.Empty)
                {
                    test.Id = Guid.NewGuid();
                }
                context.InsertOrUpdate(test);
            });
        }

        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            DataContext.DoTransacted(context =>
            {
                var testItem = context.Tests.FirstOrDefault(i => i.Id == id);
                if (testItem != null) 
                    context.Delete(testItem);
            });
        }
    }
}
