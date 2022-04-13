import { React, useState, useEffect } from "react";
import { loadData, createData, updateData } from "../services/Data";
import { useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import toast, { Toaster } from "react-hot-toast";
import Card from "@mui/material/Card";
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
import CardActions from "@mui/material/CardActions";
function News() {
  const [newsHeader, setNewHeaders] = useState(null);
  const [disable, setDisable] = useState(false);
  const [txtTitle, setTxtTitle] = useState(null);
  const [txtDesc, setTxtDesc] = useState(null);
  const [open, setOpen] = useState(false);
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
    }).then((result) => {
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
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeTitle = (e) => {
    setTxtTitle(e.target.value);
  };
  const handleChangeDesc = (e) => {
    setTxtDesc(e.target.value);
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-4">
          <Button variant="contained" xs={3} onClick={openModal}>
            Add News
          </Button>
        </div>
      </div>
      <div class="row">
        {newsHeader &&
          newsHeader.sort((a,b)=>b.id-a.id).filter(a=>a.approved===false).map((newsHeader) => {
            return (
              <div className="col-md-4 col-sm-12">
                <Grid item xs={6}>
                  <Card
                    sx={{
                      width: 400,
                      height: 375,
                      padding: "10px",
                      margin: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition:
                        "background 0.25s, color 0.25s ",
                      "&:hover": {
                        backgroundColor: "#7f8c8d",
                        color: "#4bcffa",
                        
                      },
                    }}
                    variant="outlined"
                    onClick={() => {
                      viewContent(newsHeader.id);
                    }}
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
                      {newsHeader.isFinished === false ? (
                        <Button
                          size="medium"
                          variant="contained"
                          color="success"
                          onClick={() => finishedNews(newsHeader.id)}
                        >
                          Finished
                        </Button>
                      ) : (
                        ""
                      )}

                      <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        disabled={!newsHeader.isFinished}
                        onClick={() => {
                          approveNews(newsHeader.id);
                        }}
                      >
                        Approve
                      </Button>
                      <Button size="medium" variant="contained" color="info">
                        Update
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </div>
            );
          })}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your News Title and News Description here
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
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={addNewsHeader} variant="contained" color="success">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default News;
