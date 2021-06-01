using Microsoft.EntityFrameworkCore;
using ReactClientPostWithMVC_API.Contracts;
using ReactClientPostWithMVC_API.Data;
using ReactClientPostWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientPostWithMVC_API.SQL
{
    public class SQLAuthorRepository : IAuthorRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLAuthorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Author> AddEntity(Author newEntity)
        {      
            var author = await _context.Authors.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return author.Entity;
        }

        public async Task<Author> DeleteEntity(int id)
        {
            var authorToDelete = await _context.Authors.FindAsync(id);
            if (authorToDelete != null)
            {
                _context.Authors.Remove(authorToDelete);
                await _context.SaveChangesAsync();
            }

            return authorToDelete;
        }

        public async Task<IEnumerable<Author>> GetAll()
        {
            return await _context.Authors.ToListAsync();
        }

        public async Task<Author> GetById(int id)
        {
            return await _context.Authors.FindAsync(id);
        }

        public async Task<IEnumerable<Author>> Search(string searchKey)
        {
            Console.WriteLine("In SQL-Search, searchKey : " + searchKey);
            IQueryable<Author> query = _context.Authors;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(a => a.Email.Contains(searchKey) ||
                              a.FirstName.Contains(searchKey) ||
                              //a.FullName.Contains(searchKey) ||
                              a.LastName.Contains(searchKey) ||
                              a.PhoneNumber.Contains(searchKey)).ToListAsync();
        }

        public async Task<Author> UpdateEntity(Author updatedEntity)
        {           
            var author = _context.Authors.Attach(updatedEntity);
            author.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return author.Entity;
        }
    }
}
