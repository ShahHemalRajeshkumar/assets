import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { extractClassValues, extractResponsiveValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import dynamic from 'next/dynamic';

const IconComponent = ({ blok }) => {
  const responsiveClasses = useRef(
    [
      blok.line_height,
      blok.text_transform,
      blok.text_align,
      blok.font_type,
      'material-icons-outlined',
      ...(blok.font_style || []),
      addPrefix('text-', blok.color),
      ...extractResponsiveValues(blok, 'font_size'),
      ...extractClassValues(blok),
    ]
      .join(' ')
      .trim()
  );

  return (
      <i {...storyblokEditable(blok)} className={responsiveClasses.current}>{blok.icon_name}</i>
  );
};

export default IconComponent;
