import axios from "axios";

const projectsApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/projects",
  });
  
export default projectsApi;
  