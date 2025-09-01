const useCommonInstrument = (courses) => {
    return [...new Set(courses.flatMap(course =>
        course?.instruments?.map(instrument => instrument?.key) ?? []
    ))];
    
};

export default useCommonInstrument