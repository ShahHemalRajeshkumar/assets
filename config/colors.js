function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba( var( ${variableName}, ${opacityValue}))`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  primary: withOpacity('--color-primary'),
  secondary: withOpacity('--color-secondary'),
  accent: withOpacity('--color-accent'),
  disable: withOpacity('--color-disable'),
  white: withOpacity('--color-white'),
  red: withOpacity('--color-red'),
  black: withOpacity('--color-black'),
  'light-primary': withOpacity('--color-light-primary'),
  'dark-primary': withOpacity('--color-dark-primary'),
  'light-grey': withOpacity('--color-light-grey'),
  'light-grey-200': withOpacity('--color-light-grey-200'),
  'light-grey-300': withOpacity('--color-light-grey-300'),
  'light-grey-400': withOpacity('--color-light-grey-400'),
  'light-grey-600': withOpacity('--color-light-grey-600'),
};
