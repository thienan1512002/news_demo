import { React, useRef, useState, useEffect } from "react";
import { createData, loadData, updateData } from "../services/Data";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DropzoneDialog } from "material-ui-dropzone";

function CreateNewsContent() {
  const { id } = useParams();
  const [open,setOpen]= useState(true);
  const [contentType, setContentType] = useState(null);
  const [disable, setDisable] = useState(false);
  const [txtContent, setTxtContent] = useState(null);
  const [file , setFile] = useState(null);
  const ref = useRef();
  const handleTextContent = (e) => {
    e.preventDefault();
    createData("texts", {
      content: txtContent,
      newsId: id,
      contentType: contentType,
      contentUser: "An",
    }).then((result) => {
      if (result.status === 201) {
        toast.success("Add new Text Content Success");
        setDisable(false);
        setTxtContent("");
      } else {
        toast.error("Something error !");
      }
    });
  };

  const handleImageContent = (e) => {
    const today = new Date();
    e.preventDefault();
    let formData = new FormData();
    formData.append("imageFile", file);
    formData.append("content", file.name);
    formData.append("newsId", id);
    formData.append("contentType", contentType);
    formData.append(
      "contentDate",
      today.getYear() + "-" + today.getMonth() + "-" + today.getDate()
    );
    formData.append("contentUser", "An");
    createData("newscontents", formData).then((res) => {
      if (res.status === 200) {
        toast.success("Add new Image Content Success");
        ref.current.value = "";
        setDisable(false);
      }
    });
  };
  let content;
  if (contentType === "txt") {
    content = (
      <Box minWidth={120}>
        <InputLabel id="demo-simple-select-label">News Content</InputLabel>
        <TextareaAutosize
          fullWidth
          labelId="demo-simple-select-label"
          aria-label="minimum height"
          minRows={10}
          value={txtContent}
          style={{ width: 500 }}
          onChange={(e) => setTxtContent(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleTextContent}>
          Add Content
        </Button>
      </Box>
    );
  }
  if (contentType === "img") {
    content = (
      <label htmlFor="contained-button-file">
        <form onSubmit={handleImageContent}>
         

          <DropzoneDialog
            acceptedFiles={["image/*"]}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={5000000}
            open={open}
            onClose={() => setOpen(false)}
            onSave={(files) => {
              console.log("Files:", files[0]);
              setFile(files[0]);
              setOpen(false);
            }}
            showPreviews={true}
            showFileNamesInPreview={true}
          />
          <br/>
          <br/>
          <Button
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </label>
    );
  }
  const handleChange = (e) => {
    setContentType(e.target.value);
    setDisable(true);
  };
  console.log(contentType);
  return (
    <Container fixed>
      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth disabled={disable}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contentType}
            label="Content Type"
            onChange={handleChange}
          >
            <MenuItem value={"txt"}>Text Content</MenuItem>
            <MenuItem value={"img"}>Image Content</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <Box sx={{ maxWidth: 300 }}>{content}</Box>
      <Toaster position="top-right" reverseOrder={true} />
    </Container>
  );
}

export default CreateNewsContent;
