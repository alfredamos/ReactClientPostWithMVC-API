using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ReactClientPostWithMVC_API.Contracts;
using ReactClientPostWithMVC_API.Helpers;
using ReactClientPostWithMVC_API.Models;

namespace ReactClientPostWithMVC_API.Controllers.Authors
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {        
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public AuthorsController(IAuthorRepository authorRepository, IMapper mapper,
         IFileStorageService fileStorageService)
        {            
            _authorRepository = authorRepository;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            try
            {
                return Ok(await _authorRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Authors/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
            try
            {
                var author = await _authorRepository.GetById(id);

                if (author == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                return author;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
            
        }

        // PUT: api/Authors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Author>> PutAuthor(int id, Author author)
        {
            try
            {
                if (id != author.AuthorID)
                {
                    return BadRequest("Id mismatch.");
                }

                var authorToUpdate = await _authorRepository.GetById(id);

                if (authorToUpdate == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                if (!string.IsNullOrWhiteSpace(author.PhotoPath))
                {
                    var authorPhoto = Convert.FromBase64String(author.PhotoPath);
                    author.PhotoPath = await _fileStorageService.EditFile(authorPhoto, "jpg", "author", author.PhotoPath);
                }

                _mapper.Map(author, authorToUpdate);

                return await _authorRepository.UpdateEntity(authorToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
                      
        }

        // POST: api/Authors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author author)
        {
            try
            {
                if (author == null)
                {
                    return BadRequest("Invalid input");
                }

                Console.WriteLine("PhotoPath : " + author.PhotoPath);

                if (!string.IsNullOrWhiteSpace(author.PhotoPath))
                {
                    var authorPhoto = Convert.FromBase64String(author.PhotoPath);
                    author.PhotoPath = await _fileStorageService.SaveFile(authorPhoto, "jpg", "author");
                }
                

                var createdAuthor = await _authorRepository.AddEntity(author);

                return CreatedAtAction(nameof(GetAuthor), new { id = createdAuthor.AuthorID }, createdAuthor);
            }
            catch (Exception)
            {                
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }
            
        }

        // DELETE: api/Authors/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Author>> DeleteAuthor(int id)
        {
            try
            {
                var author = await _authorRepository.GetById(id);

                if (author == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                await _fileStorageService.DeleteFile(author.PhotoPath, "author");

                return await _authorRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
           
        }

        // GET: api/Authors/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Author>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _authorRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
