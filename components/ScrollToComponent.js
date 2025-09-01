import { useRef } from 'react';
import { extractClassValues, extractResponsiveValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import { storyblokEditable } from '@storyblok/react';
import React from 'react';
import { Link } from 'react-scroll';
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const ScrollToComponent = ({ blok }) => {
  const responsiveClasses = useRef(
    [
      blok.line_height,
      blok.text_transform,
      blok.text_align,
      blok.font_type,
      'cursor-pointer',
      ...(blok.font_style || []),
      addPrefix('text-', blok.color),
      ...extractResponsiveValues(blok, 'font_size'),
      ...extractClassValues(blok),
    ]
      .join(' ')
      .trim()
  );

  return (
    <div {...storyblokEditable(blok)}>
      {blok.scroll_to !== 'top' ? (
        <div style={blok.styles}>
          <Link offset={-100} className={responsiveClasses.current} to={blok.scroll_to} spy={true} smooth={true}>
            {blok.components.map((component) => (
              <DynamicComponent blok={component} key={component._uid} />
            ))}
          </Link>
        </div>
      ) : (
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }>
          {blok.components.map((component) => (
            <DynamicComponent blok={component} key={component._uid} />
          ))}
        </div>
      )}
   </div>
  );
};

export default ScrollToComponent;
