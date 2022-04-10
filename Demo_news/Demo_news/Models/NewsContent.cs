using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Demo_news.Models
{
    public partial class NewsContent
    {
        public int ContentId { get; set; }
        public int? NewsId { get; set; }
        public int Sequence { get; set; }
        public string Content { get; set; }
        public string ContentType { get; set; }
        public string ContentUser { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public DateTime? ContentDate { get; set; }

        public virtual NewsHeader News { get; set; }
    }
}