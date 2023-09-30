import axios from "axios";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

import { toast } from "react-toastify";

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});
http.interceptors.request.use(
  async function (config) {
    // console.log(config.url); //..user/
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      // console.log(config.url);
      const refreshToken = localStorageService.getRefreshToken();
      const expiresDate = localStorageService.getTokenExpiresDate();

      if (refreshToken && expiresDate < Date.now()) {
        const data = await authService.refresh();
        // console.log(data);
        localStorageService.setTokens({
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        });
      }
    }
    const accesToken = localStorageService.getAccessToken();
    if (accesToken) {
      config.params = { ...config.params, auth: accesToken };
    } //https://fast-company-firebase-a0a77-default-rtdb.europe-west1.firebasedatabase.app/users/ada/name.json?auth=<ID_TOKEN>
    return config;
  },
  //error
  function (error) {
    return Promise.reject(error);
  }
);

const transformData = (data) => {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
};
http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      // console.log(error);
      toast.error("Щось пішло не так. Спробуйте знову пізніше.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
