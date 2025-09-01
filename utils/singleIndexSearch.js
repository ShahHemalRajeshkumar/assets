export const singleIndexSearch = (helper, parameters) => {
  return helper.searchOnce(parameters).then((res) => {
    return {
      rawResults: res.content._rawResults,
      state: res.content._state,
    };
  });
};
