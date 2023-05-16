import httpService from "./http.service";

const professionEndpoint = "profession/";

const professionsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return data;
  },
};
export default professionsService;
