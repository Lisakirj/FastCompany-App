import httpService from "./http.service";

const commentsEndpoint = "comment/";

const commentsService = {
  create: async (comment) => {
    const { data } = await httpService.put(
      commentsEndpoint + comment._id,
      comment
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentsEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`,
      },
    });
    return data;
  },
  deleteComment: async (id) => {
    const { data } = await httpService.delete(commentsEndpoint + id);
    // console.log(data)//null
    return data;
  },
};

export default commentsService;
