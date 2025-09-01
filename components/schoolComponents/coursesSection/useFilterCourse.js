export function useFilterCourse(courses, courseFilterQuery) {
    if (!courses || !Array.isArray(courses)) {
        return [];
    }

    return courses?.filter((course) => course?.instrument_id == courseFilterQuery?.instrument || courseFilterQuery?.instrument === ''
    ).filter((teacher) => (courseFilterQuery.age ? teacher.age_groups.some((age) => age.toLowerCase() == courseFilterQuery.age.toLowerCase()): true)).filter((categories)=> courseFilterQuery?.courseType !== '' ? categories?.mzo_course_category_id == courseFilterQuery?.courseType : categories);
}
