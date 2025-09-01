export const getFilterParamsQuery = (form) => {
  if (form && typeof form === 'object') {
    const age = form?.age ? `&age=${form?.age}` : '';
    const location = form?.location ? `&location=${form?.location}` : '';
    const duration = form?.duration ? `&duration=${form?.duration?.replace(/[^0-9]/g, '')}` : '';

    return `${location}${age}${duration}`;
  }

  return '';
};
