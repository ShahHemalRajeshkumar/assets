import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
//import StoryblokService from '../utils/storyblok-service';
import StoryblokService from '@/utils/storyblok-service';
import { extractResponsiveValues, extractClassValues } from '@/utils/breakpoint';
import SbEditable from 'storyblok-react';

const RichText = ({ blok }) => {
  const responsiveClasses = useRef(
    [...extractResponsiveValues(blok, 'font_size'), ...extractClassValues(blok)].join(' ').trim()
  );
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div
        {...storyblokEditable(blok)}
        className={responsiveClasses.current}
        dangerouslySetInnerHTML={{
          __html: StoryblokService.client.richTextResolver.render(blok.richText),
        }}
      />
    </SbEditable>
  );
};

export default RichText;
