export const createWixImagePath = (mediaManagerImgFormat) => {
  const basePath = 'https://static.wixstatic.com/media/';
  const wixURL = mediaManagerImgFormat?.slice(15).split('/')[0];
  const imgPath = `${basePath}${wixURL}`;
  return imgPath;
};
