export const getZoomLevel = (locationItemsLength) => {
  if (locationItemsLength === 2) {
    return 8;
  }
  if (locationItemsLength === 3) {
    return 10;
  }
  if (locationItemsLength > 3) {
    return 11;
  }
  return 6;
};
