export const getLastSegment = (url) => {
    const segments = url?.split('/');
    return segments?.pop();
};
