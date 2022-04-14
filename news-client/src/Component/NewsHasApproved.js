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
  };
  return (
    <div className="container">
      <Grid container>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <h4 align="center">News Lists</h4>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
      <Grid container>
        {news &&
          news
            .sort((a, b) => b.id - a.id)
            .filter((a) => a.approved === true)
            .map((newsHeader) => {
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <Card
                    sx={{
                      width: 400,
                      height: 375,
                      padding: "10px",
                      margin: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                    variant="outlined"
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {newsHeader.newsTitle}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        {newsHeader.newsDesc}
                      </Typography>
                      <Typography variant="body2">
                        Author : {newsHeader.newsUser}
                        <br />
                      </Typography>
                      <Typography variant="body2">
                        {dateFormat(newsHeader.newsDate, "dd/mm/yyyy HH:MM")}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        size="medium"
                        variant="contained"
                        color="info"
                        onClick={() => seeDetails(newsHeader.id)}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}

export default NewsHasApproved;
