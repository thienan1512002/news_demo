using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo_news.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Demo_news.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsContentsController : ControllerBase
    {
        private readonly NewsDBContext _context;
        private IHostingEnvironment _environment;

        public NewsContentsController(NewsDBContext context, IHostingEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/NewsContents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsContent>>> GetNewsContents()
        {
            return await _context.NewsContents.ToListAsync();
        }

        // GET: api/NewsContents/5
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

        // PUT: api/NewsContents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsContent(int id)
        {
            NewsContent newsContent = await _context.NewsContents.FirstOrDefaultAsync(m => m.ContentId == id);
            if (id != newsContent.ContentId)
            {
                return BadRequest();
            }
            var files = HttpContext.Request.Form.Files;
            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    FileInfo fi = new FileInfo(file.FileName);
                    var newfilename = "Image_" + DateTime.Now.TimeOfDay.Milliseconds + fi.Extension;
                    var path = Path.Combine("", _environment.ContentRootPath + "/Images/" + newfilename);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    newsContent.Content = "Images/" + newfilename;
                    newsContent.NewsId = 1;
                    newsContent.ContentDate = DateTime.Now;
                    newsContent.ContentType = "img";
                    newsContent.Sequence = 1;
                    _context.NewsContents.Add(newsContent);
                    await _context.SaveChangesAsync();
                    _context.Entry(newsContent).State = EntityState.Modified;
                }
            }

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

        // POST: api/NewsContents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NewsContent>> PostNewsContent()
        {
            NewsContent newsContent = new NewsContent();
            var files = HttpContext.Request.Form.Files;
            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    FileInfo fi = new FileInfo(file.FileName);
                    var newfilename = "Image_" + DateTime.Now.TimeOfDay.Milliseconds + fi.Extension;
                    var path = Path.Combine("", _environment.ContentRootPath + "/Images/" + newfilename);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    newsContent.Content = "Images/" + newfilename;
                    newsContent.NewsId = 1;
                    newsContent.ContentDate = DateTime.Now;
                    newsContent.ContentType = "img";
                    newsContent.Sequence = 1;
                    _context.NewsContents.Add(newsContent);
                    await _context.SaveChangesAsync();
                }
            }


            return CreatedAtAction("GetNewsContent", new { id = newsContent.ContentId }, newsContent);
        }

        // DELETE: api/NewsContents/5
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
