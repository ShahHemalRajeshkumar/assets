export const findComponent = (components, idName) => {
    return components?.find(({ id_name }) => id_name === idName) || {};
};
