export const extractSlugFromURL = (url) => {
  const decodedURI = decodeURI(url);
  const lastSlash = decodedURI.lastIndexOf('/');
  const slug = decodedURI.slice(lastSlash + 1);
  return slug;
};
