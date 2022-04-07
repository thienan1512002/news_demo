import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";


function Content(props){
    const [contents , setContents] = useState(null);

    useEffect(() =>{
        loadData("newscontents/1").then((data)=>{
            setContents(data.data);
        });
    });

    return (
        <div className="container">
            {contents&&contents.sort((a,b)=>a.sequence-b.sequence).map(content =>{
                if(content.contentType ==="img"){
                    return (
                      <img
                        src={"http://localhost:13715/" + content.content}
                        alt={content.sequence}
                        width="175"
                        height="300"
                      />
                    );
                }else {
                     return (
                       <p>{content.content}</p>
                     );
                }
            })}
        </div>
    )

}
export default Content;