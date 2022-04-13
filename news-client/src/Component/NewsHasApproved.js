import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
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
          {news &&
            news
              .sort((a, b) => b.id-a.id)
              .filter((news) => news.approved === true)
              .map((news) => {
                return (
                  <tr
                    onClick={() => {
                      seeDetails(news.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{news.newsTitle}</td>
                    <td>{news.newsDesc}</td>
                    <td>{news.newsUser}</td>
                    <td>
                      {dateFormat(
                        news.newsDate,
                        "dddd, mmmm dS, yyyy, h:MM:ss TT"
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default NewsHasApproved;
