using YemekSepeti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YemekSepeti.Models.DTO;
using System.Linq.Expressions;
using YemekSepeti.Business.Interface;

namespace YemekSepeti.Business
{
    public class CategoriesLayer : IRepository<CategoriesDTO,Categories>
    {
        CodeFirstContext db = new CodeFirstContext();

        public List<CategoriesDTO> GetCategories()
        {
            var categories = db.Categories.Select(x => new CategoriesDTO
            {
                Id = x.Id,
                CategoriesName = x.Name,
                CategoriesImages = x.Images
            }).ToList();

            return categories;
        }

        //Implement
        public CategoriesDTO Get(int id)
        {
            return db.Categories.Select(x => new CategoriesDTO
            {
                Id = x.Id,
                CategoriesName = x.Name,
                CategoriesImages = x.Images
            }).FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<CategoriesDTO> GetAll()
        {
            return db.Categories.Select(x => new CategoriesDTO
            {
                Id = x.Id,
                CategoriesName = x.Name,
                CategoriesImages = x.Images
            }).ToList();
        } 

        public List<CategoriesDTO> GetWhere(Expression<Func<Categories, bool>> predicate)
        {
            return db.Categories.Where(predicate).Select(x => new CategoriesDTO
            {
                Id = x.Id,
                CategoriesName = x.Name,
                CategoriesImages = x.Images
            }).ToList();
        }

        List<CategoriesDTO> IRepository<CategoriesDTO, Categories>.GetAll()
        {
            throw new NotImplementedException();
        }

        public List<CategoriesDTO> GetWhereOrderBy<TKey>(Expression<Func<Categories, bool>> predicate, Expression<Func<CategoriesDTO, TKey>> sortCondition)
        {
            return db.Categories.Where(predicate).Select(x => new CategoriesDTO
            {
                Id = x.Id,
                CategoriesName = x.Name,
                CategoriesImages = x.Images
            }).OrderBy(sortCondition).ToList();
        }
    }
}