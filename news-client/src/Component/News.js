import { React, useState, useEffect } from "react";
import { loadData, createData, updateData } from "../services/Data";
import {useHistory} from 'react-router-dom';


function News() {
  const [newsHeader, setNewHeaders] = useState(null);
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
    }).then((result) => {
      console.log(result);
    });
  }
  const approveNews = (id, newsTitle, newsDesc, newsDate, newsUser) => {
    updateData("newsheaders/", id, {
      id: id,
      newsTitle: newsTitle,
      newsDesc: newsDesc,
      newsDate: newsDate,
      newsUser: newsUser,
      approved: true,
    }).then((result) => {
      console.log(result);
    });
  };
  const createContent = (id)=>{
    redirect.push("/create-news-content/"+id);
  }
  return (
    <div className="row">
      <div className="col-6">
        <form onSubmit={addNewsHeader}>
          <div className="form-group">
            <label>News Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter News Title"
              name="newsTitle"
            />
          </div>
          <div className="form-group">
            <label>News Desc</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter News Title"
              name="newsDesc"
            />
          </div>
          <br></br>
          <div className="form-group">
              <input className="btn btn-success" type="submit"/>
          </div>
        </form>
      </div>
      <div className="col-6">
        <h4>News not Approval</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>News Title</th>
              <th>News User</th>
              <th>News Desc</th>
              <th>News Date</th>
              <th>Action</th>              
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {newsHeader &&
              newsHeader.filter((item) => item.approved===false).map((newsHeader) => {
                
                return (
                  <tr key={newsHeader.id}>
                    <td>{newsHeader.newsTitle}</td>
                    <td>{newsHeader.newsUser}</td>
                    <td>{newsHeader.newsDesc}</td>
                    <td>{newsHeader.newsDate}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          approveNews(
                            newsHeader.id,
                            newsHeader.newsTitle,
                            newsHeader.newsDesc,
                            newsHeader.newsDate,
                            newsHeader.newsUser
                          )
                        }
                      >
                        <i className="fa fa-check"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-primary" onClick={() =>{createContent(newsHeader.id)}}>Add</button>
                    </td>                   
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default News;
