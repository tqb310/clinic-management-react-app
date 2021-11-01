import axiosClient from "./axiosClient";
import { auth } from "_constants/apiUrl";


const authentication = {
  async login(email, password) {
    const url = auth.login;
    try {
      const data = await axiosClient.post(url, { username: email, password: password });
      console.log(data);
      localStorage.setItem("accessToken", JSON.stringify(data));
      return data;
    } catch(err) {
      switch(err.response.status){
        case 404:return 1;
        case 401:return 2;
        default:return 3;
      }

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
