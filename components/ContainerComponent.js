import dynamic from 'next/dynamic';
import SbEditable from 'storyblok-react';
import React, { useRef } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import { sharedService } from '../utils/shared-service';
import styled from 'styled-components';
import imageService from '../utils/image-service';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));

const Div = styled.div`
  background-image: ${(props) => props.bgImage};
  ${(props) => props.styles}
`;

const ContainerComponent = ({ blok, instruments, slug }) => {
  const ref = React.useRef();
  const { enteredViewport } = useIntersectionObserver(ref, { threshold: 0.5 });

  const responsiveClasses = useRef(
    [
      blok.box_shadow,
      blok.box_width,
      blok.border_color,
      blok.border_radius,
      blok.background_color,
      blok.background_position,
      blok.background_size,
      blok.background_repeat,
      ...extractClassValues(blok),
    ]
      .join(' ')
      .trim()
  );

  const clickHandler = () => {
    sharedService.setNavOpen(false);
  };

  const lazyLoad = blok.enable_lazyload && !enteredViewport;

  // Adjust quality of background image for faster download
  const image = imageService({ url: blok.background_image, quality: 65 });
  const bgImage = lazyLoad
    ? `url("${imageService({ url: blok.background_image, quality: 30, width: 10, blur: 10 })}")`
    : `url("${image}")`;

  return (
    <SbEditable content={blok} key={blok._uid}>
      <Div
        ref={ref}
        styles={blok.styles}
        onClick={clickHandler}
        bgImage={bgImage}
        className={responsiveClasses.current}>
        {blok.components.map((content) => (
          <DynamicComponent blok={content} key={content._uid} instruments={instruments} slug={slug} />
        ))}
      </Div>
    </SbEditable>
  );
};

export default ContainerComponent;
