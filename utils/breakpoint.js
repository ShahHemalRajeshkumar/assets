import breakpoints from '../config/breakpoints';
import { useMediaQuery } from 'react-responsive';
import camelcase from 'camelcase';
export const generateBreakpointProps = Object.keys(breakpoints).reduce(
  (acc, breakpoint) => ({
    ...acc,
    [`${breakpoint}Class`]: String,
  }),
  {}
);

export const breakpointsNames = Object.keys(breakpoints);

export const allBreakpointsNames = ['mobile', ...breakpointsNames];

export const breakpointsValues = Object.values(breakpoints);

export const breakpointsArray = Object.keys(breakpoints).reduce(
  (acc, breakpoint) => ({
    ...acc,
    [breakpoint]: parseInt(breakpoints[breakpoint]),
  }),
  {}
);

export const extractResponsiveValues = (blok, name, withoutPrefix = false) => {
  if (blok) {
    return [
      blok[name],
      ...breakpointsNames.map((breakpointName) => {
        if (!blok[breakpointName + '_' + name]) {
          return '';
        }
        if (withoutPrefix) {
          return blok[breakpointName + '_' + name];
        }
        return breakpointName + ':' + blok[breakpointName + '_' + name];
      }),
    ];
  }
};

export const extractClassValues = (blok) => {
  if (blok.class) {
    return [
      ...blok.class.split(' '),
      ...breakpointsNames.map((breakpointName) => {
        if (!blok[breakpointName + '_class']) {
          return '';
        }
        return blok[breakpointName + '_class'].split(' ').map((className) => breakpointName + ':' + className);
      }),
    ].reduce((acc, val) => acc.concat(val), []);
  } else {
    return [];
  }
};

export const mobileFirstValues = (blok, name) => {
  if (blok) {
    const values = extractResponsiveValues(blok, name, true);
    let value = values[0];
    return values.map((_value) => {
      if (_value) {
        value = _value;
      }
      return value;
    });
  }
};

export const extractDevice = () => {
  const mobile = useMediaQuery({ maxWidth: 599 });
  const tab = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  const smallLaptop = useMediaQuery({ minWidth: 960, maxWidth: 1279 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1439 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const extraLargeLaptop = useMediaQuery({ minWidth: 1920, maxWidth: 5000 });

  return [
    { xs: mobile },
    { sm: tab },
    { md: smallLaptop },
    { lg: medLaptop },
    { xl: largeLaptop },
    { xxl: extraLargeLaptop },
  ].find((value) => {
    if (Object.values(value)[0]) {
      return value;
    }
  });
};

export const extractStyleValue = (styles, index) => {
  if (index && styles) {
    return styles[index]
      .trim()
      .split('\n')
      .reduce(function (a, b) {
        const i = b.split(':');
        a[camelcase(i[0])] = i[1];
        return a;
      }, {});
  } else if (styles) {
    return styles
      .trim()
      .split('\n')
      .reduce(function (a, b) {
        const i = b.split(':');
        a[camelcase(i[0])] = i[1];
        return a;
      }, {});
  }
};
