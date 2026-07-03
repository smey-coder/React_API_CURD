import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.190.1:3000",
});

export default API;