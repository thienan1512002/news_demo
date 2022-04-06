using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo_news.Models
{
    public class News
    {
        public int NewsId { get; set; }
        public string NewsTitle { get; set; }
        public string NewsDesc { get; set; }
        public DateTime? NewsDate { get; set; }
        public int Sequences { get; set; }
        public string ContentType { get; set; }
        public string ContentUser { get; set; }
        public string Content { get; set; }
    }
}
