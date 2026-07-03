import axios from "axios";

const API = axios.create({
  baseURL: "https://my-api-connect-with-react-3.onrender.com",
});

export default API;
