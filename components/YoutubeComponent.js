import { useRef } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import { storyblokEditable } from '@storyblok/react';
import React from 'react';
import Styles from '../styles/youtube.module.scss';
import styled from 'styled-components';

const Div = styled.div`
  ${(props) => props.styles}
`;

const YoutubeComponent = ({ blok, width, height }) => {
  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());

  const src = `https://www.youtube-nocookie.com/embed/${blok.src}?rel=0&modestbranding=1`; 

  return (
      <Div  {...storyblokEditable(blok)}  className={`${Styles['ms-video-wrapper']}`} styles={blok.styles}>
        <iframe
          title='Youtube'
          src={src}
          width={width ? width : blok.width}
          height={height ? height : blok.height}
          frameBorder='0'
          className={responsiveClasses.current}
          loading='lazy'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen='true'
        />
      </Div>
  );
};

export default YoutubeComponent;
