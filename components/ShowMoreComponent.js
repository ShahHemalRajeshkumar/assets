import { storyblokEditable } from '@storyblok/react';
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import React, { useRef, useState } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const ShowMoreComponent = ({ blok }) => {
  const [initialSlide, setInitialSlide] = useState(blok.initialSlide);

  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());
  const Div = styled.div`
    ${(props) => props.styles}
  `;

  return (
      <Div {...storyblokEditable(blok)} className={responsiveClasses.current} styles={blok.styles}>
        {blok.components[0].components.map(
          (component, ind) => ind <= initialSlide && <DynamicComponent blok={component} key={component._uid} />
        )}
        {initialSlide === blok.initialSlide && (
          <div onClick={() => setInitialSlide(blok.components[0].components.length)}>
            <DynamicComponent blok={blok.buttonComponent[0]} />
          </div>
        )}
        {initialSlide !== blok.initialSlide && (
          <div onClick={() => setInitialSlide(blok.initialSlide)}>
            <DynamicComponent blok={blok.buttonComponent[1]} />
          </div>
        )}
      </Div>
  );
};

export default ShowMoreComponent;
