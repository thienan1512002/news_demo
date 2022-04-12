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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function News() {
  const [newsHeader, setNewHeaders] = useState(null);
  const [disable, setDisable] = useState(false);
  const [txtTitle,setTxtTitle] = useState(null);
  const [txtDesc,setTxtDesc] = useState(null);
  const [open,setOpen] = useState(false);
  const redirect = useHistory();
  useEffect(() => {
    loadData("newsheaders").then((data) => {
      setNewHeaders(data.data);
    });
  });

  const addNewsHeader = (e) => {
    e.preventDefault();
    createData("newsheaders", {
      newsTitle: txtTitle,
      newsDesc: txtDesc,
      newsUser: "admin",
    })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          setOpen(false);
          toast.success("Add new News Header Success");
           redirect.push("/create-news-content/" + (newsHeader.length + 1));
        } else {
          toast.error("Something error !");
        }
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
  const openModal = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleChangeTitle = (e) => {
    setTxtTitle(e.target.value);
  }
  const handleChangeDesc = (e) => {
    setTxtDesc(e.target.value);
  }

  return (
    <Container fixed>
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" xs={3} onClick={openModal}>
          Add News
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: -1, sm: -2, md: -3 }}>
          {newsHeader &&
            newsHeader.map((newsHeader) => {
              return (
                <Grid item xs={6}>
                  <Card sx={{ width: 500, height: 200 }} variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {newsHeader.newsTitle}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="News title"
            type="text"
            fullWidth
            variant="standard"
            value={txtTitle}
            onChange={handleChangeTitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="News description"
            type="text"
            fullWidth
            variant="standard"
            value={txtDesc}
            onChange={handleChangeDesc}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNewsHeader}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <Toaster position="top-right" reverseOrder={true} />
    </Container>
  );
}

export default News;
