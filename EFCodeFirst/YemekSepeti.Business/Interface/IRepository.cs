using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace YemekSepeti.Business.Interface
{
    public interface IRepository<T, A>
        where T : class
        where A : class 
    {
        T Get(int id);
        List<T> GetAll();
        List<T> GetWhere(Expression<Func<A, bool>> predicate);
        List<T> GetWhereOrderBy<TKey>(Expression<Func<A, bool>> predicate, Expression<Func<T, TKey>> sortCondition);
    }
}
