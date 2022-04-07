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
        private readonly IWebHostEnvironment _hostEnvironment;

        public NewsContentsController(NewsDBContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/NewsContents
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<NewsContent>>> GetNewsContents(int id)
        {
            return await _context.NewsContents.Where(m => m.NewsId == id).ToListAsync();
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
                    var path = Path.Combine("",   "/Images/" + newfilename);
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
        public async Task<ActionResult<NewsContent>> PostNewsContent([FromForm] NewsContent newsContent)
        {
            newsContent.Content = await SaveImage(newsContent.ImageFile);
            newsContent.ContentDate = DateTime.Now;
            _context.NewsContents.Add(newsContent);
            await _context.SaveChangesAsync();
            return Ok(newsContent);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
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
