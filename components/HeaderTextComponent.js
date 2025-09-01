import React, { useRef } from 'react';
import styles from '../styles/headings.module.scss';
import { addPrefix } from '../utils/text';
import StoryblokService from '../utils/storyblok-service';
import { extractResponsiveValues, extractClassValues } from '../utils/breakpoint';  
import { storyblokEditable } from '@storyblok/react';

const createHeader = (level, text, sbClasses) => {
  const classes = sbClasses.trim('') !== '' ? sbClasses : styles[`h-${level}`];

  switch (level) {
    case 1:
      return <h1 className={classes}>{text}</h1>;
    case 2:
      return <h2 className={classes}>{text}</h2>;
    case 3:
      return <h3 className={classes}>{text}</h3>;
    case 4:
      return <h4 className={classes}>{text}</h4>;
    default:
      return '';
  }
};

const HeaderTextComponent = ({ blok }) => {
  const { text, level } = blok;

  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());

  return (
    <div {...storyblokEditable(blok)}>
      {createHeader(parseInt(level), text, responsiveClasses.current)}
    </div>
  );
};

export default HeaderTextComponent;
