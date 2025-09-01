export const transformImage = (image, param) => {
  if (!image) return '';
  image = param && param.length ? image + '/m/' + param : image;
  return image;
};

export const backgroundImageUrl = (image, param) => transformImage(image, param) || '';

export const isWebpSupported = () => {
  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};
