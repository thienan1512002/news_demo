import { React, useState, useEffect } from "react";
import { loadData, createData } from "../services/Data";
function NewsHeaders() {
  const [newsHeader, setNewHeaders] = useState(null);

  useEffect(() => {
    loadData("newsheaders").then((data) => {
      setNewHeaders(data.data);
    });
    loadData("newsheaders");
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th>News Title</th>
              <th>News User</th>
              <th>News Desc</th>
              <th>News Date</th>
            </tr>
          </thead>
          <tbody>
            {newsHeader &&
              newsHeader.map((newsHeader) => {
                return (
                  <tr key={newsHeader.id}>
                    <td>{newsHeader.newsTitle}</td>
                    <td>{newsHeader.newsUser}</td>
                    <td>{newsHeader.newsDesc}</td>
                    <td>{newsHeader.newsDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsHeaders;
