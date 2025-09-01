import React, { useEffect, useState } from 'react';
import { allBreakpointsNames, extractClassValues, extractStyleValue, mobileFirstValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import { useMediaQuery } from 'react-responsive';

const InlineSvgComponent = ({ blok }) => {
  const [style, setStyle] = useState({});

  const mobile = useMediaQuery({ maxWidth: 599 });
  const tab = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  const smallLaptop = useMediaQuery({ minWidth: 960, maxWidth: 1279 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1439 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const extraLargeLaptop = useMediaQuery({ minWidth: 1920, maxWidth: 5000 });

  const device = [
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
  const dev = device ? Object.keys(device) : 'xs';
  const styles = mobileFirstValues(blok, 'style');
  const index = allBreakpointsNames.findIndex((breakpointName) => breakpointName === dev[0]);

  useEffect(() => {
    if (styles && styles[index]) {
      if (index > 0 && styles[index].length > 1) {
        const styled = extractStyleValue(styles, index);
        setStyle((prevState) => ({ ...prevState, ...styled }));
      } else {
        const styled = extractStyleValue(blok.style);
        setStyle((prevState) => ({ ...prevState, ...styled }));
      }
    }
  }, [styles, index, blok.style]);

  const responsiveClass = () => {
    if (blok) {
      return [
        blok.background_color,
        blok.border_radius,
        addPrefix('text-', blok.text_color),
        addPrefix('hover:', blok.hover_background_color),
        addPrefix('hover:text-', blok.hover_text_color),
        ...extractClassValues(blok),
      ];
    }
  };
  return (
    <div
      className={`${responsiveClass() && responsiveClass().join(' ').trim()}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: blok?.svg }}></div>
  );
};

export default InlineSvgComponent;
