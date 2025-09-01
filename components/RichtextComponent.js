import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
import StoryblokService from '../utils/storyblok-service';
import { extractResponsiveValues, extractClassValues } from '../utils/breakpoint';

const RichtextComponent = ({ blok }) => {
  const responsiveClasses = useRef(
    [...extractResponsiveValues(blok, 'font_size'), ...extractClassValues(blok)].join(' ').trim()
  );
  return (
      <div
        {...storyblokEditable(blok)}
        className={responsiveClasses.current}
        dangerouslySetInnerHTML={{
          __html: StoryblokService.client.richTextResolver.render(blok.richText),
        }}
      />
    
  );
};

export default RichtextComponent;
