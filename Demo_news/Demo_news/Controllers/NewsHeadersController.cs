using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo_news.Models;

namespace Demo_news.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsHeadersController : ControllerBase
    {
        private readonly NewsDBContext _context;

        public NewsHeadersController(NewsDBContext context)
        {
            _context = context;
        }

        // GET: api/NewsHeaders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsHeader>>> GetNewsHeaders()
        {
            return await _context.NewsHeaders.ToListAsync();
        }

        // GET: api/NewsHeaders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NewsHeader>> GetNewsHeader(int id)
        {
            var newsHeader = await _context.NewsHeaders.FindAsync(id);

            if (newsHeader == null)
            {
                return NotFound();
            }

            return newsHeader;
        }

        // PUT: api/NewsHeaders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsHeader(int id, NewsHeader newsHeader)
        {
            if (id != newsHeader.Id)
            {
                return BadRequest();
            }
            newsHeader.NewsDate = DateTime.Now;
            _context.Entry(newsHeader).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsHeaderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NewsHeaders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NewsHeader>> PostNewsHeader(NewsHeader newsHeader)
        {
            newsHeader.NewsDate = DateTime.Now;
            newsHeader.Approved = false;
            _context.NewsHeaders.Add(newsHeader);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsHeader", new { id = newsHeader.Id }, newsHeader);
        }

        // DELETE: api/NewsHeaders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsHeader(int id)
        {
            var newsHeader = await _context.NewsHeaders.FindAsync(id);
            if (newsHeader == null)
            {
                return NotFound();
            }

            _context.NewsHeaders.Remove(newsHeader);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsHeaderExists(int id)
        {
            return _context.NewsHeaders.Any(e => e.Id == id);
        }
    }
}
