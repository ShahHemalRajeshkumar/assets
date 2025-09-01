export const getSlug = (slugData) =>
    Array.isArray(slugData) ? slugData.slice(-1)[0] : slugData;