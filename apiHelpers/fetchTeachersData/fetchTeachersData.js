export const fetchTeachersData = async (getTeachers, instrumentKey) => {
    return await getTeachers.search(instrumentKey, {
        hitsPerPage: 300,
        advancedSyntax: true,
    });
};
