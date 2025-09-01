import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { extractClassValues, extractResponsiveValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import Image from 'next/image';
import styled from 'styled-components';
import imageService from '../utils/image-service';

const Div = styled.div`
  ${(props) => props.styles}
`;

const ImageComponent = ({ blok }) => {
  const responsiveClasses = useRef(
    [
      'relative',
      ...(blok.font_style || []),
      addPrefix('text-', blok.color),
      ...extractResponsiveValues(blok, 'font_size'),
      ...extractClassValues(blok),
    ]
      .filter((cls) => !!cls)
      .join(' ')
      .trim()
  );

  return (   
      <Div {...storyblokEditable(blok)} className={responsiveClasses.current} styles={blok.styles}>
        <Image
          src={blok.image}
          alt={blok.alt || "image"}
          className={responsiveClasses.current}
          width={blok.width || 1440}
          height={blok.height || 280}
          priority={blok.priority || false}
          quality={75}
          placeholder="blur"
          blurDataURL={imageService({
            url: blok.image,
            width: 10,
            quality: 40,
          })}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Div>
  );
};

export default ImageComponent;
