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
    public class SQLPostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Post> AddEntity(Post newEntity)
        {
            var post = await _context.Posts.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return post.Entity;
        }

        public async Task<Post> DeleteEntity(int id)
        {
            var postToDelete = await _context.Posts.FindAsync(id);
            if (postToDelete != null)
            {
                _context.Posts.Remove(postToDelete);
                await _context.SaveChangesAsync();
            }

            return postToDelete;
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            return await _context.Posts.Include(a => a.Author).ToListAsync();
        }

        public async Task<Post> GetById(int id)
        {
            return await _context.Posts.Include(a => a.Author)
                         .FirstOrDefaultAsync(a => a.PostID == id);
        }

        public async Task<IEnumerable<Post>> Search(string searchKey)
        {
            IQueryable<Post> query = _context.Posts.Include(p => p.Author);
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(a => a.Title.Contains(searchKey) ||
                              a.Content.Contains(searchKey) ||                              
                              a.Author.FirstName.Contains(searchKey) ||
                              a.Author.FullName.Contains(searchKey) ||
                              a.Author.LastName.Contains(searchKey) ||
                              a.Author.Email.Contains(searchKey) || 
                              a.Author.PhoneNumber.Contains(searchKey)).ToListAsync();
        }

        public async Task<Post> UpdateEntity(Post updatedEntity)
        {
            var post = _context.Posts.Attach(updatedEntity);
            post.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return post.Entity;
        }
    }
}
