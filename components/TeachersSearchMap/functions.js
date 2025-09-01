// 'Certified Music Teacher'
// 'Certified Musician'
// 'Qualified Musician'
// 'Teacher in Education'
export const sortedByTypes = (data = []) => [
  ...data?.filter((item) => item?.profile_type === 'certified_teacher'),
  ...data?.filter((item) => item?.profile_type === 'certified_musician'),
  ...data?.filter((item) => item?.profile_type === 'professional_musician'),
  ...data?.filter((item) => item?.profile_type === 'verified_talent'),
  ...data?.filter((item) => item?.profile_type === 'music_school'),
];

export const sortedMarkers = (data = []) => {
  const withLikes = data
    ?.filter((item) => !!item?.recommendations)
    .sort((a, b) => b?.recommendations - a?.recommendations);

  const withoutLikes = data?.filter((item) => !item?.recommendations);

  return [...withLikes, ...sortedByTypes(withoutLikes)];
};
