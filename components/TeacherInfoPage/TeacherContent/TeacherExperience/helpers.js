export const sortExperienceData = (dates = []) => {
  const present = dates
    .filter((item) => !!item?.present)
    .sort((a, b) => {
      return new Date(b?.start_date) - new Date(a?.start_date);
    });

  const notPresent = dates
    .filter((item) => !item?.present)
    .sort((a, b) => {
      return new Date(b?.end_date) - new Date(a?.end_date);
    });

  const list = [...present, ...notPresent];

  return list;
};
