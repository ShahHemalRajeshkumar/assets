export function getSlugAfterDash(input) {
  if (typeof input !== 'string') return '';

  const parts = input?.split('-');

  return parts?.length > 1
    ? parts[parts?.length - 1]?.toLocaleLowerCase()?.trim() === 'mzo'
      ? parts[parts?.length - 2]
      : parts[parts?.length - 1]
    : input;
}
