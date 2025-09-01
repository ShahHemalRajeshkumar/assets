import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { extractResponsiveValues, extractClassValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
const CountUp = dynamic(() => import('react-countup'));
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Div = styled.div`
  ${(props) => props.styles}
`;

const CounterAnimationComponent = ({ blok }) => {
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
      <Div  {...storyblokEditable(blok)} styles={blok.styles} className={responsiveClasses.current}>
        <CountUp end={blok.text.content[0].content[0].text} duration={blok.duration} />
      </Div>
  );
};

export default CounterAnimationComponent;
