import axios from "axios";

const stagesApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/stages",
  });
  
export default stagesApi;
  