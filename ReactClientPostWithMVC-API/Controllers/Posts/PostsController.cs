using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientPostWithMVC_API.Contracts;
using ReactClientPostWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientPostWithMVC_API.Controllers.Posts
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public PostsController(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            try
            {
                return Ok(await _postRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Posts/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            try
            {
                var post = await _postRepository.GetById(id);

                if (post == null)
                {
                    return NotFound($"Post with Id = {id} not found.");
                }

                return post;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Post>> PutPost(int id, Post post)
        {
            try
            {
                if (id != post.PostID)
                {
                    return BadRequest("Id mismatch.");
                }

                var postToUpdate = await _postRepository.GetById(id);

                if (postToUpdate == null)
                {
                    return NotFound($"Post with Id = {id} not found.");
                }

                _mapper.Map(post, postToUpdate);

                return await _postRepository.UpdateEntity(postToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }

        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            try
            {
                if (post == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdPost = await _postRepository.AddEntity(post);

                return CreatedAtAction(nameof(GetPost), new { id = createdPost.PostID }, createdPost);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Posts/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            try
            {
                var post = await _postRepository.GetById(id);

                if (post == null)
                {
                    return NotFound($"Post with Id = {id} not found.");
                }

                return await _postRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }

        // GET: api/Posts/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Post>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _postRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
