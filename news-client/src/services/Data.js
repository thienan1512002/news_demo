import axios from "axios";


const url = "http://localhost:13715/api/";

export const loadData = async (content)=>{
    return await axios.get(url + content);
    
}

export const createData = async (content,body)=>{
    return await axios.post(url + content, body);
}