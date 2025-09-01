function createSlug(fullName, isRedirect = false) {
  if (!fullName) return '';

  let slug = fullName.trim().toLowerCase().replace(/\s+/g, '-');

  if (isRedirect) {
    return slug.replace(/-mzo$/, '');
  }
  return slug.endsWith('-mzo') ? slug : `${slug}-mzo`;
}

export function redirectToMZO(location, language) {
  const fullName =
    language === 'ch-en'
      ? location?.full_name?.en
      : location?.full_name?.de;

  const slug = createSlug(fullName, true);

  if (slug) {
    window.open(`/${language}/schools/mzo/${slug}`, '_blank', 'noopener,noreferrer');
  }
}

export function locationLink(location, language) {
  const fullName =
    language === 'ch-en'
      ? location?.full_name?.en
      : location?.full_name?.de;

  const slug = createSlug(fullName, false);

  return slug ? `/${language}/schools/mzo/${slug}` : '/';
}
