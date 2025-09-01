export const isExternalLink = (path) => {
    return path.startsWith('http://') || path.startsWith('https://');
};