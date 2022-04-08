import axios from "axios";


const url = "http://localhost:13715/api/";

export const loadData =  (content)=>{
    return  axios.get(url + content);
    
}

export const createData =  (content,body)=>{
    return  axios.post(url + content, body);
}

export const updateData = (content,id,body)=>{
    return  axios.put(url + content + id, body);
}