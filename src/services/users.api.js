import axios from "axios";

const usersApi = axios.create({
    baseURL: "https://api-sgd-teste.azurewebsites.net/api/users",
  });
  
export default usersApi;
  