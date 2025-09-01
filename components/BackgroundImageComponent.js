/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));

export const BackgroundImageComponent = ({ blok }) => {
  const { alt = '', image, priority = false, quality, blurDataURL } = blok;

  const imageProps = {
    layout: 'fill',
    objectFit: 'cover',
    alt,
    src: image.filename,
    priority,
    quality: quality || 75,
  };

  if (blurDataURL.trim() !== '') {
    (imageProps.placeholder = 'blur'), (imageProps.blurDataURL = `data:image/svg+xml;base64,${blurDataURL}`);
  }

  return (
    <div className='relative w-full h-full'>
      <div className={`absolute w-full h-full`}>
        <Image className='md:object-custom-1' {...imageProps} />
      </div>
      {blok.components.map((component) => (
        <div className='absolute h-full w-full' key={component._uid}>
          <DynamicComponent blok={component} />
        </div>
      ))}
    </div>
  );
};

export default BackgroundImageComponent;
