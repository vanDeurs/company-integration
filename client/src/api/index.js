import axios from "axios";
import Cookies from "js-cookie";

const APP_URL = "http://localhost:3000";

export default () => {
  const token = Cookies.get("token");
  const api = axios.create({
    baseURL: APP_URL + "/api",
    headers: {
      "x-auth": token
    }
  });

  return api;
};
