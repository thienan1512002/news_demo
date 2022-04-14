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
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
function News() {
  const [newsHeader, setNewHeaders] = useState(null);
  const [disable, setDisable] = useState(false);
  const [txtTitle, setTxtTitle] = useState(null);
  const [txtDesc, setTxtDesc] = useState(null);
  const [open, setOpen] = useState(false);
  const [show , setShow] = useState(false);
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
  const updateSequence = (id) => {
    redirect.push("/update-sequence/" + id);
  }
  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeTitle = (e) => {
    setTxtTitle(e.target.value);
    setShow(true);
  };
  const handleChangeDesc = (e) => {
    setTxtDesc(e.target.value);
    setShow(true);
  };

  return (
    <div className="container">
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <Fab
            xs={3}
            onClick={openModal}
            style={{ transform: 'translate("-10px")' }}
            color="primary"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid container>
        {newsHeader &&
          newsHeader
            .sort((a, b) => b.id - a.id)
            .filter((a) => a.approved === false)
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
                      <Button
                        size="medium"
                        variant="contained"
                        color="info"
                        onClick={() => {
                          updateSequence(newsHeader.id);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        color="info"
                        onClick={() => {
                          viewContent(newsHeader.id);
                        }}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>Add News</Box>
              <Box>
                <Fab size="small" onClick={handleClose} color="error">
                  <CloseIcon fontSize="small" color="#ffffff" />
                </Fab>
              </Box>
            </Box>
          </DialogTitle>
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
              value={txtTitle}
              onChange={handleChangeTitle}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="News description"
              type="text"
              fullWidth
              value={txtDesc}
              onChange={handleChangeDesc}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            {show ? <Fab
              variant="extended"
              size="medium"
              color="success"
              aria-label="add"
              onClick={addNewsHeader}
              
            >
              <AddIcon />
              Add News
            </Fab> : ""}
            
          </DialogActions>
        </Dialog>
        <Toaster position="top-right" reverseOrder={true} />
      </Grid>
    </div>
  );
}

export default News;
