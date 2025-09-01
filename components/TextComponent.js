import React, { useRef } from 'react';
import { storyblokEditable } from "@storyblok/react";
import { extractResponsiveValues, extractClassValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import styled from 'styled-components';

const P = styled.p`
  ${(props) => props.styles}
`;
const Span = styled.span`
  ${(props) => props.styles}
`;

const TextComponent = ({ blok, inline }) => {
  const responsiveClasses = useRef(
    [
      blok.line_height,
      blok.text_transform,
      blok.text_align,
      blok.font_type,
      ...(blok.font_style || []),
      addPrefix('text-', blok.color),
      ...extractResponsiveValues(blok, 'font_size'),
      ...extractClassValues(blok),
    ]
      .join(' ')
      .trim()
  );

  return (
    <main {...storyblokEditable(blok)}>
      {inline ? (
        <Span styles={blok.styles} className={responsiveClasses.current}>
          {blok.text.content[0].content[0].text}
        </Span>
      ) : (
        <P styles={blok.styles} className={responsiveClasses.current}>
          {blok.text.content[0].content[0].text}
        </P>
      )}
    </main>
  );
};

export default TextComponent;
