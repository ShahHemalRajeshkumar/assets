import StoryblokService from '../utils/storyblok-service';
import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { extractClassValues, extractResponsiveValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import Styles from '../styles/text-advance.module.scss';
import styled from 'styled-components';

const Div = styled.div`
  ${(props) => props.styles}
`;

const TextAdvanceComponent = ({ blok }) => {
  const responsiveClasses = useRef(
    [
      blok.line_height,
      blok.text_transform,
      blok.text_align,
      blok.font_type,
      Styles['rich-text-list'],
      ...(blok.font_style || []),
      addPrefix('text-', blok.color),
      ...extractResponsiveValues(blok, 'font_size'),
      ...extractClassValues(blok),
    ]
      .join(' ')
      .trim()
  );

  return (
      <Div {...storyblokEditable(blok)} id={blok.id} styles={blok.styles} className={responsiveClasses.current}>
        <div
          dangerouslySetInnerHTML={{
            __html: StoryblokService.client.richTextResolver.render(blok.text),
          }}
        />
      </Div>
  );
};

export default TextAdvanceComponent;
