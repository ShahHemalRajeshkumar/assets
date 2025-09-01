export function TeacherFilterSection(teachers, filteredQuery) {
    return teachers
        .filter((teacher) =>
            teacher.instruments.some((instrument) => instrument.key.includes(filteredQuery.instrument))
        )
        .filter((teacher) =>
            filteredQuery.age.length ? Object.keys(teacher.age_taught).some((age) => teacher.age_taught[age] === true && age === filteredQuery.age) : true
        );
}
