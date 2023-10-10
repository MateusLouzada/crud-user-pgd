import axios from "axios";

const issuesTypeApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/issuetypes",
  });
  
export default issuesTypeApi;
  