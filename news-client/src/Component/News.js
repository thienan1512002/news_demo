import { React, useState, useEffect } from "react";
import { loadData, createData, updateData } from "../services/Data";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import toast, { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
function News() {
  const [newsHeader, setNewHeaders] = useState(null);
  const [disable, setDisable] = useState(false);
  const redirect = useHistory();
  useEffect(() => {
    loadData("newsheaders").then((data) => {
      setNewHeaders(data.data);
    });
  });

  const addNewsHeader = (e) => {
    e.preventDefault();
    createData("newsheaders", {
      newsTitle: e.target.newsTitle.value,
      newsDesc: e.target.newsDesc.value,
      newsUser: "admin",
    })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast.success("Add new News Header Success");
          e.target.newsTitle.value = "";
          e.target.newsDesc.value = "";
        } else {
          toast.error("Something error !");
        }
      })
      .then((result) => {
        redirect.push("/create-news-content/" + (newsHeader.length + 1));
      });
  };
  const approveNews = (id) => {
    updateData("newsheaders/approved/", id, {
      id: id,
    }).then((result) => {
      if (result.status === 200) {
        toast.success("Approve News successfully");
      }
    });
  };
  const finishedNews = (id) => {
    updateData("newsheaders/finished/", id, {
      id: id,
    }).then((result) => {
      console.log(result);
      if (result.status === 200) {
        toast.success("Finished News successfully");
      }
    });
  };
  const createContent = (id) => {
    redirect.push("/create-news-content/" + id);
  };
  const viewContent = (id) => {
    redirect.push("/news-details/" + id);
  };
  return (
    <Container fixed>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {newsHeader &&
            newsHeader.map((newsHeader) => {
              return (
                <Grid item xs={3}>
                  <Card sx={{ width: 300, height: 320 }} variant="outlined">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {dateFormat(newsHeader.newsDate, "dd/mm/yyyy HH:MM")}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {newsHeader.newsTitle}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {newsHeader.newsDesc}
                      </Typography>
                      <Typography variant="body2">
                        {newsHeader.newsUser}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
}

export default News;
