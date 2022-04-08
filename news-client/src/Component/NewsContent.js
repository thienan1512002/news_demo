import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";

function Content(props) {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    loadData("news/1").then((data) => {
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
              <h6 align="center">Date Create : {news.newsDate}</h6>
              {news.newsContents.sort((a, b) =>a.sequence-b.sequence).map((content)=>{
                 if(content.contentType === "img"){
                     return <img src={"http://localhost:13715/Images/" + content.content} width="300" height="100"/>
                 }else{
                     return <p>{content.content}</p>
                 }
              })}      
            </div>
          ); 
        })}
    </div>
  );
}
export default Content;
