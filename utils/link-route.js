const LinkRoute = (value) => {
  if (!value) {
  return '/';
  }

  if (value.link?.linktype !== 'url') {
    if (typeof value !== 'string') {
      if (value.link?.url?.length > 2) {
        return (
          '/' +
          ((value.link?.url).substr(-1) === '/'
            ? value.link?.url.substr(0, value.link?.url.length - 1)
            : value.link?.url)
        );
      } else if (value.link?.cached_url?.length > 2) {
        return (
          '/' +
          ((value.link?.cached_url).substr(-1) === '/'
            ? value.link?.cached_url.substr(0, value.link?.cached_url.length - 1)
            : value.link?.cached_url)
        );
      }
    } else {
      return '/' + (value.substr(-1) === '/' ? value.substr(0, value.length - 1) : value);
    }
  } else {
    if (value.link?.url.substr(-1) === '-') {
      return value.link?.url.slice(0, -1);
    } else {
      return (value.link?.url).substr(-1) === '/'
        ? value.link?.url.substr(0, value.link?.url.length - 1)
        : value.link?.url;
    }
  }
};

export default LinkRoute;
