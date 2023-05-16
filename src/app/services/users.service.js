import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const usersEndpoint = "user/";

const usersService = {
  fetchAll: async () => {
    const { data } = await httpService.get(usersEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      usersEndpoint + payload._id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      usersEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  updateUser: async (newData) => {
    const { data } = await httpService.patch(
      usersEndpoint + localStorageService.getUserId(),
      newData
    );
    return data;
  },
};
export default usersService;
