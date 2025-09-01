/* eslint-disable default-param-last */
/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */

function get_url_extension(url) {
  if (!url) {
    return null;
  }
  return url.split(/\#|\?/)[0].split('.').pop().trim();
}

const imageService = ({ url, width = 0, height = 0, quality = 75, blur = 0 }) => {
  if (!url) {
    return null;
  }

  if (get_url_extension(url) === 'svg') {
    return url;
  }
  // Return original with optimized quality
  if (width === 0 && height === 0) {
    return `${url}/m/filters:quality(${quality})${blur ? `:blur(${blur})` : ''}`;
  }

  return `${url}/m/${width}x${height}/filters:quality(${quality})${blur ? `:blur(${blur})` : ''}`;
};

export default imageService;
