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
        public async Task<IEnumerable<NewsHeader>> GetNewsContents()
        {
            var data = from h in _context.NewsHeaders
                       //join c in _context.NewsContents
                       //on h.Id equals c.NewsId
                       select new NewsHeader
                       {
                           Id = h.Id,
                           NewsTitle = h.NewsTitle,
                           NewsDesc = h.NewsDesc,
                           NewsDate = h.NewsDate,
                           Approved = h.Approved,
                           NewsUser = h.NewsUser,
                           NewsContents = _context.NewsContents.Where(m => m.NewsId == h.Id).ToList()
                       };
            return await data.ToListAsync();
        }

        [HttpGet("{id}")]
        public IQueryable<NewsHeader> GetDetail(int id)
        {
            var data = from h in _context.NewsHeaders
                       where h.Id == id
                       select new NewsHeader
                       {
                           Id = h.Id,
                           NewsTitle = h.NewsTitle,
                           NewsDesc = h.NewsDesc,
                           NewsDate = h.NewsDate,
                           Approved = h.Approved,
                           NewsUser = h.NewsUser,
                           NewsContents = _context.NewsContents.Where(m => m.NewsId == h.Id).ToList()
                       };
            return data;
        }
    }
}
