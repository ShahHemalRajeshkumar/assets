export const getAroundRadius = (locationLength) => {
  if (locationLength === 2) return 60000;
  if (locationLength >= 3) return 40000;
  return null;
};
