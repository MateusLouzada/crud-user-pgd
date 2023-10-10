import axios from "axios";

const commentsApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/comments",
  });
  
export default commentsApi;
  