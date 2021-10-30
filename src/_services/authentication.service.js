import axiosClient from "./axiosClient";
import { auth } from "_constants/apiUrl";

const authentication = {
  async login(email, password) {
    const url = auth.login;
    try {
      const data = await axiosClient.post(url, { email, password });
      console.log(data);
      localStorage.setItem("accessToken", JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },

  logout() {
    localStorage.removeItem("accessToken");
    window.location.reload();
  },

  getCurrentUser() {
    const tokenString = localStorage.getItem("accessToken");
    if (tokenString) {
      try{
        const user = JSON.parse(atob(tokenString.split(".")[1]));
        return {
          ...user,
          token: JSON.parse(tokenString)["access_token"],
        };
      }catch {
          return null;
      }
    }
    return null;
  },
};

export default authentication;
