export const sortAndGroup = (arr = []) => {
  let result = [];
  let groupArray;

  arr.sort(function (a, b) {
    return a.longitude - b.longitude || a.latitude - b.latitude;
  });

  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1]?.longitude !== arr[i]?.longitude && arr[i - 1]?.latitude !== arr[i]?.latitude) {
      groupArray = [];
      result.push(groupArray);
    }
    groupArray?.push(arr[i]);
  }
  return result;
};
