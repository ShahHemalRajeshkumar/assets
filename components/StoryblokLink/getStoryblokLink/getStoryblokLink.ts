export const getStoryblokLink = (link) => {
  if (!link || link.cached_url === 'homepage') {
    return '/';
  }

  const { linktype, cached_url: cachedUrl, url, email, anchor } = link;

  const anchorID = anchor ? `#${anchor}` : '';

  const storyblokLinkOptions = {
    story: cachedUrl ? `/${cachedUrl}` : '',
    url: url ?? '',
    email: `mailto:${email}`,
  };

  if (!linktype) {
    return '/';
  }

  if (storyblokLinkOptions[linktype] !== undefined) {
    return storyblokLinkOptions[linktype] + anchorID;
  }

  return '/';
};
