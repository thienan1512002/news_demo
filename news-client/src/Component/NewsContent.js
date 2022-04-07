import { React, useState, useEffect } from "react";
import { loadData } from "../services/Data";


function Content(){
    const [contents , setContents] = useState(null);

    useEffect(() =>{
        loadData("newscontents/1").then((data)=>{
            setContents(data.data);
        });
    });

    return (
        <div className="container">
            {contents&&contents.map(content =>{
                if(content.contentType ==="img"){
                    return (
                      <img
                        src={"http://localhost:13715/" + content.content}
                        alt=""
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