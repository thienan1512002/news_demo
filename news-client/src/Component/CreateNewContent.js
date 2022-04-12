import { React, useRef, useState, useEffect } from "react";
import { createData, loadData , updateData } from "../services/Data";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const initalState = {
  id : null,
  newsTitle : '',
  newsDesc : '',
  newsDate : '',
  newsUser : '',
  approved : false,
  isFinished : false
}

function CreateNewsContent() {
  const [header, setHeader] = useState(initalState);
  const { id } = useParams();
  const ref = useRef();
  const handleTextContent = (e) => {
    e.preventDefault();
    createData("texts", {
      content: e.target.textContent.value,
      newsId: id,
      contentType: "txt",
      contentUser: "An",
    }).then((result) => {
      if (result.status === 201) {
        toast.success("Add new Text Content Success");
        e.target.textContent.value = ""; 
      } else {
        toast.error("Something error !");
      }
    });
  };

  const handleImageContent = (e) => {
    const today = new Date();
    e.preventDefault();
    let formData = new FormData();
    formData.append("imageFile", e.target[0].files[0]);
    formData.append("content", e.target[0].files[0].name);
    formData.append("newsId", id);
    formData.append("contentType", "img");
    formData.append(
      "contentDate",
      today.getYear() + "-" + today.getMonth() + "-" + today.getDate()
    );
    formData.append("contentUser", "An");
    createData("newscontents", formData).then((res) => {
      if (res.status === 200) {
        toast.success("Add new Image Content Success");
        ref.current.value = "";
      }
    });
  };
    
 
  
  return (
    <div className="container">
      <h3 align="center">Create News</h3>     
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleTextContent}>
            <div className="row">
              <div className="form-group">
                <label>Content</label>
                <textarea
                  className="form-control"
                  name="textContent"
                  rows="15"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <br></br>
                <input className="btn btn-success" type="submit" />
              </div>
            </div>
          </form>
        </div>
        <div class="col-6">
          <form onSubmit={handleImageContent} encType="multipart/form-data">
            <div className="row">
              <div className="form-group">
                <label>Images</label>
                <br></br>
                <input
                  type="file"
                  className="form-control-file"
                  name="file"
                  ref={ref}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <br></br>
                <input className="btn btn-success" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default CreateNewsContent;
