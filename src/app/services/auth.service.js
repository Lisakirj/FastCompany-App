import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

// console.log(httpAuth.params.key);
const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signUp`, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log("register", data);
    return data;
  },
  logIn: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log("login", data);
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};
export default authService;
