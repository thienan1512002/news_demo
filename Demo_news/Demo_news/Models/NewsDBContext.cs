using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Demo_news.Models
{
    public partial class NewsDBContext : DbContext
    {
        public NewsDBContext()
        {
        }

        public NewsDBContext(DbContextOptions<NewsDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<NewsContent> NewsContents { get; set; }
        public virtual DbSet<NewsHeader> NewsHeaders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server =.;Database=NewsDB;uid=sa;pwd=1;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<NewsContent>(entity =>
            {
                entity.HasKey(e => e.ContentId)
                    .HasName("PK__NewsCont__0BDC8719A70D40D1");

                entity.ToTable("NewsContent");

                entity.Property(e => e.ContentId).HasColumnName("contentId");

                entity.Property(e => e.Content)
                    .HasColumnType("text")
                    .HasColumnName("content");

                entity.Property(e => e.ContentDate)
                    .HasColumnType("datetime")
                    .HasColumnName("contentDate");

                entity.Property(e => e.ContentType)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("contentType");

                entity.Property(e => e.ContentUser)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contentUser");

                entity.Property(e => e.NewsId).HasColumnName("newsId");

                entity.HasOne(d => d.News)
                    .WithMany(p => p.NewsContents)
                    .HasForeignKey(d => d.NewsId)
                    .HasConstraintName("FK__NewsConte__newsI__267ABA7A");
            });

            modelBuilder.Entity<NewsHeader>(entity =>
            {
                entity.ToTable("NewsHeader");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.NewsDate).HasColumnType("datetime");

                entity.Property(e => e.NewsDesc).HasMaxLength(100);

                entity.Property(e => e.NewsTitle).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
