import { React, useState, useEffect } from "react";
import { createData } from "../services/Data";

function CreateNewContent(props) {

    const [textSequence,setTextSequence] = useState(null);
    const [imageSequence,setImageSequence] = useState(null);
  const handleTextContent = (e) => {           
      e.preventDefault();
      createData("texts", {
        content: e.target.textContent.value,
        newsId: 1,
        contentType: "text",
        contentUser: "An",
        sequence: e.target.sequence.value,      
      }).then((result) => console.log(result));
  }

  const handleImageContent = (e) => {
    const today = new Date();
      e.preventDefault();
      const file = e.target[0].files[0];
      let formData = new FormData();
      formData.append("imageFile", e.target[0].files[0]);
      formData.append("content", e.target[0].files[0].name);
      formData.append("newsId", 1);
      formData.append("contentType", "img");
      formData.append("contentDate", today.getYear() + "-" + today.getMonth() + "-" + today.getDate());
      formData.append("contentUser", "An");
      formData.append("sequence", e.target.imgSequence.value);
      createData("newscontents", 
        formData,
      ).then(res=>console.log(res));
  }
  const handleTextSequence = (e) =>{
      setTextSequence(e.target.value);
  }
  const handleImageSequence = (e) => {
    setImageSequence(e.target.value);
  };
  return (
    <div>
      <h3 align="center">Create News</h3>
      <div class="row">
        <div class="col-6">
          <form onSubmit={handleTextContent}>
            <div className="row">
              <div className="form-group">
                <label>Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  rows="20"
                  name="textContent"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label>Sequence</label>
                <input type="number" className="form-control" name="sequence" />
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
          <form onSubmit={handleImageContent} enctype="multipart/form-data">
            <div className="row">
              <div className="form-group">
                <label>Images</label>
                <br></br>
                <input type="file" className="form-control-file" name="file" />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Sequence</label>
                <input type="number" className="form-control" name="imgSequence" />
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
    </div>
  );
}

export default CreateNewContent;
