import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";
import { useHistory } from "react-router-dom";
function NewsHasApproved() {
  const redirect = useHistory();
  const [news, setNews] = useState(null);
  useEffect(() => {
    loadData("news").then((data) => {
      setNews(data.data);
    });
    
  });
  const seeDetails = (id) => {
    redirect.push("/news-details/" + id);
  }
  return (
    <div className="container">
      <table className="table table-bordered table-hover">
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
                  <tr onClick={() =>{seeDetails(news.id)}} style={{cursor:"pointer"}}>
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
