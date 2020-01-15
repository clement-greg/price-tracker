using price_tracker_api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace price_tracker_api.Logic
{
    public class DataContext : DbContext
    {
        public DataContext()
            :base("Data Source=j45x702bx7.database.windows.net;Initial Catalog=ktdb;User ID=g.clement;Password=Vespasian1;MultipleActiveResultSets=True")
        {

        }

        public DbSet<Test> Tests { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        }

        public void InsertOrUpdate(object value)
        {
            var itemFromDb = Set(value.GetType()).Find(value.GetType().GetProperty("Id").GetValue(value, null));
            if(itemFromDb != null)
            {
                Entry(itemFromDb).CurrentValues.SetValues(value);
            } else
            {
                Set(value.GetType()).Add(value);
            }
        }

        public void Insert(object value)
        {
            Set(value.GetType()).Add(value);
        }

        public void Update(object value)
        {
            Set(value.GetType()).Add(value);
            Entry(value).State = EntityState.Modified;
        }

        public void Delete(object value)
        {

            var itemFromDb = Set(value.GetType()).Find(value.GetType().GetProperty("Id").GetValue(value, null));
            if(itemFromDb != null)
            {
                Set(itemFromDb.GetType()).Remove(itemFromDb);
            }
        }

        public static void DoTransacted(Action<DataContext> action)
        {
            using(var context = new DataContext())
            {
                action(context);
                context.SaveChanges();
            }
        }
    }
}
