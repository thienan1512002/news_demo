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
    public class TextsController : ControllerBase
    {
        private readonly NewsDBContext _context;

        public TextsController(NewsDBContext context)
        {
            _context = context;
        }

        // GET: api/Texts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsContent>>> GetNewsContents()
        {
            return await _context.NewsContents.ToListAsync();
        }

        // GET: api/Texts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NewsContent>> GetNewsContent(int id)
        {
            var newsContent = await _context.NewsContents.FindAsync(id);

            if (newsContent == null)
            {
                return NotFound();
            }

            return newsContent;
        }

        // PUT: api/Texts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsContent(int id, NewsContent newsContent)
        {
            if (id != newsContent.ContentId)
            {
                return BadRequest();
            }

            _context.Entry(newsContent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsContentExists(id))
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

        // POST: api/Texts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NewsContent>> PostNewsContent(NewsContent newsContent)
        {
            _context.NewsContents.Add(newsContent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsContent", new { id = newsContent.ContentId }, newsContent);
        }

        // DELETE: api/Texts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsContent(int id)
        {
            var newsContent = await _context.NewsContents.FindAsync(id);
            if (newsContent == null)
            {
                return NotFound();
            }

            _context.NewsContents.Remove(newsContent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsContentExists(int id)
        {
            return _context.NewsContents.Any(e => e.ContentId == id);
        }
    }
}
