import React, { useRef } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import styled from 'styled-components';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const VideoComponent = ({ blok }) => {
  const ref = React.useRef();
  const { enteredViewport } = useIntersectionObserver(ref, { threshold: 0.5 });

  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());
  const Div = styled.div`
    ${(props) => props.styles}
  `;

  return (
    <Div styles={blok.styles}>
      <video
        ref={ref}
        poster={enteredViewport ? blok.poster : ''}
        autoPlay={true}
        muted='muted'
        playsInline='playsinline'
        loop
        width={blok.width}
        height={blok.height}
        className={responsiveClasses.current}>
        <source src={enteredViewport ? blok.desktopSrc : ''} type='video/mp4' />
      </video>
    </Div>
  );
};

export default VideoComponent;
