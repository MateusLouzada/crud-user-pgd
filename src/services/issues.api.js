import axios from "axios";

const issuesApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/issues",
  });
  
export default issuesApi;
  