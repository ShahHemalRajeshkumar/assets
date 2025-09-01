import { storyblokEditable } from '@storyblok/react';
import React, { useRef } from 'react';
import { extractClassValues, extractResponsiveValues } from '@/utils/breakpoint';
import { addPrefix } from '@/utils/text';
import dynamic from 'next/dynamic';

const Icon = ({ blok }) => {
  const responsiveClasses = useRef(
    ['material-icons-outlined', ...extractResponsiveValues(blok), ...extractClassValues(blok)].join(' ').trim()
  );

  
  return (
    <i
        className={responsiveClasses.current}
      style={{
        fontSize: `${blok.font_size}px`,
        height: `${blok.icon_height}px`,
        width: `${blok.icon_width}px`,
        paddingTop: `${blok.padding_top}px`,
        paddingLeft: `${blok.padding_left}px`,
        paddingRight: `${blok.padding_right}px`,
        paddingBottom: `${blok.padding_bottom}px`,
        marginTop: `${blok.margin_top}px`,
        marginLeft: `${blok.margin_left}px`,
        marginRight: `${blok.margin_right}px`,
        marginBottom: `${blok.margin_bottom}px`,
        //borderRadius: `${blok.border_radius}px`,
        //justifySelf: blok.image_align,
        //alignItems: 'center',
      }}
      {...storyblokEditable(blok)}>
      {blok.icon_name}
    </i>
  );
};

export default Icon;
