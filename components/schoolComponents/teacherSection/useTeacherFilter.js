export function useTeacherFilter(teachers, filteredQuery) {
  return teachers
    ?.filter((teacher) => teacher.instruments.some((instrument) => instrument?.id == filteredQuery.instrument || filteredQuery.instrument === ''))
    ?.filter((teacher) => (filteredQuery.age.length ? teacher.ages.some((age) => age === filteredQuery.age) : true));
}
