import { storyblokEditable } from '@storyblok/react';
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import React, { useRef } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import dynamic from 'next/dynamic';

const DownloadComponent = ({ blok }) => {
  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());
  const A = styled.a`
    ${(props) => props.styles}
  `;
  return (
      <A {...storyblokEditable(blok)} href={blok.file} download target='_blank' styles={blok.styles} className={responsiveClasses.current}>
        {blok.components.map((component) => (
          <DynamicComponent blok={component} key={component._uid} />
        ))}
      </A>
  );
};

export default DownloadComponent;
