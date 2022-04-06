using Demo_news.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo_news.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsDBContext _context;
        public NewsController(NewsDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<News>> GetNewsContents()
        {
            var data = from h in _context.NewsHeaders
                       join c in _context.NewsContents
                       on h.Id equals c.NewsId
                       select new News
                       {
                           NewsId = h.Id,
                           NewsTitle = h.NewsTitle,
                           NewsDesc = h.NewsDesc,
                           NewsDate = h.NewsDate,
                           Sequences = c.Sequence,
                           ContentType = c.ContentType,
                           ContentUser = c.ContentUser,
                           Content = c.Content
                       };
            return await data.ToListAsync();
        }
    }
}
