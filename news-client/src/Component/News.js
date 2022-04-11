import { React, useState, useEffect } from "react";
import { loadData, createData, updateData } from "../services/Data";
import {useHistory} from 'react-router-dom';
import dateFormat from "dateformat";
import toast, { Toaster } from "react-hot-toast";

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
    }).then((result) => {
      console.log(result);
      if(result.status===201){
        toast.success("Add new News Header Success");
        e.target.newsTitle.value='';
        e.target.newsDesc.value = '';
      }else {
        toast.error("Something error !");
      }
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
      isFinished:true
    }).then((result) => {
      if(result.status === 200){
        toast.success("Approve News successfully");
      }
    });
  };
  const finishedNews = (id, newsTitle, newsDesc, newsDate, newsUser) => {
    updateData("newsheaders/", id, {
      id: id,
      newsTitle: newsTitle,
      newsDesc: newsDesc,
      newsDate: newsDate,
      newsUser: newsUser,
      approved: false,
      isFinished:true,
    }).then((result) => {
      if (result.status === 200) {
        toast.success("Finished News successfully");
      }
    });
  };
  const createContent = (id)=>{
    redirect.push("/create-news-content/"+id);
  }
  const viewContent = (id)=>{
    redirect.push("/news-details/"+id);
  }
  return (
    <div className="container">
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
              <input className="btn btn-success" type="submit" />
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
                <th>View Details</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {newsHeader &&
                newsHeader
                  .sort((a,b)=>a.id-b.id)
                  .filter((item) => item.approved === false)
                  .map((newsHeader) => {
                    
                    return (
                      <tr key={newsHeader.id}>
                        <td>{newsHeader.newsTitle}</td>
                        <td>{newsHeader.newsUser}</td>
                        <td>{newsHeader.newsDesc}</td>
                        <td>
                          {dateFormat(
                            newsHeader.newsDate,
                            "dddd, mmmm dS, yyyy, h:MM:ss TT"
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              approveNews(
                                newsHeader.id,
                                newsHeader.newsTitle,
                                newsHeader.newsDesc,
                                newsHeader.newsDate,
                                newsHeader.newsUser
                              )
                            }
                            disabled={!newsHeader.isFinished}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              createContent(newsHeader.id);
                            }}
                          >
                            <i className="fa fa-plus-square"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              viewContent(newsHeader.id);
                            }}
                          >
                            <i className="fa fa-info-circle"></i>
                          </button>
                        </td>
                        <td>
                          {newsHeader.isFinished ? (
                            
                              <i className="fa fa-check"></i>
                            
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                finishedNews(
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
                          )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default News;
