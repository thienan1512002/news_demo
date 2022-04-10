using System;
using System.Collections.Generic;

#nullable disable

namespace Demo_news.Models
{
    public partial class NewsHeader
    {
        public NewsHeader()
        {
            NewsContents = new HashSet<NewsContent>();
        }

        public int Id { get; set; }
        public string NewsTitle { get; set; }
        public string NewsDesc { get; set; }
        public DateTime? NewsDate { get; set; }
        public string NewsUser { get; set; }

        public Boolean Approved { get; set; }
        public Boolean IsFinished { get; set; }

        public virtual ICollection<NewsContent> NewsContents { get; set; }
    }
}
