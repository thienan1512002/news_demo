import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";

function NewsHasApproved() {
  const [news, setNews] = useState(null);
  useEffect(() => {
    loadData("news").then((data) => {
      setNews(data.data);
    });
    
  });

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
              <th>Title</th>
              <th>Desc</th>
              <th>Author</th>             
              <th>Date</th>
          </tr>
        </thead>
        <tbody>
            {news && news.filter(news => news.approved === true).map(news => {
                
                return (
                  <tr>
                    <td>{news.newsTitle}</td>
                    <td>{news.newsDesc}</td>
                    <td>{news.newsUser}</td>                 
                    <td>{news.newsDate}</td>
                  </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default NewsHasApproved;
