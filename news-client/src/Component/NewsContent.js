import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
function Content() {
  const [contents, setContents] = useState(null);
  const id = useParams();

  useEffect(() => {
    loadData("news/" + id.id).then((data) => {
      setContents(data.data);
    });
  });
  //console.log(contents);
  return (
    <div className="container">
      {contents &&
        contents.map((news) => {
          return (
            <div>
              <h2 align="center">{news.newsTitle}</h2>
              <h4 align="center">{news.newsDesc}</h4>
              <h6 align="center">Author : {news.newsUser}</h6>
              <h6 align="center">
                Date Create :{" "}
                {dateFormat(news.newsDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
              </h6>
              {news.newsContents
                .sort((a, b) => a.sequence - b.sequence)
                .map((content) => {
                  if (content.contentType === "img") {
                    return (
                      <img
                        src={"http://localhost:13715/Images/" + content.content}
                        width="300"
                        height="100"
                        className="imgCenter"
                        style={{
                          display: "block",
                          marginLeft:"auto",
                          marginRight:"auto",
                          width: "auto",
                        }}
                      />
                    );
                  } else {
                    return <p>{content.content}</p>;
                  }
                })}
            </div>
          );
        })}
      
    </div>
  );
}
export default Content;
