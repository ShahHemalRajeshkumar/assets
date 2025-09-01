import React, { useRef } from 'react';
import { extractClassValues } from '@/utils/breakpoint';
import { storyblokEditable } from '@storyblok/react';
import { useMediaQuery } from 'react-responsive';

const GoogleMap = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());

  return (
    <>
      {DesktopSize && (
        <div
          className='relative w-full overflow-hidden rounded-lg'
          style={{
            height: `${blok?.heigth || 400}px`,
            maxWidth: `${blok?.width || 600}px`,
            position: 'relative',
            zIndex: 1
          }}
          {...storyblokEditable(blok)}>
          <iframe
            className="w-full h-full border-0"
            title='Google Map'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1398041.1378619722!2d8.224119!3d46.8131873!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa60731a95555%3A0xa6ef4c6044516d35!2sMatchspace%20Music!5e0!3m2!1sen!2s!4v1728306523313!5m2!1sen!2s'
            style={{clipPath: 'inset(0)', transform: 'translateZ(0)'}}
            loading='lazy'></iframe>
        </div>
      )}

      {TabletSize && (
        <div
          style={{
            height: `${blok?.mobile_height || 300}px`,
            maxWidth: `${blok?.mobile_width || 500}px`,
          }}
          {...storyblokEditable(blok)}
          className='relative w-full overflow-hidden rounded-lg' style={{position: 'relative', zIndex: 1}}>
          <iframe
            className={`w-full h-full border-0 ${responsiveClasses.current}`}
            title='Google Map'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1398041.1378619722!2d8.224119!3d46.8131873!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa60731a95555%3A0xa6ef4c6044516d35!2sMatchspace%20Music!5e0!3m2!1sen!2s!4v1728306523313!5m2!1sen!2s'
            style={{clipPath: 'inset(0)', transform: 'translateZ(0)'}}
            loading='lazy'></iframe>
        </div>
      )}

      {MobileSize && (
        <div
          style={{
            height: `${blok?.mobile_height || 250}px`,
          }}
          {...storyblokEditable(blok)}
          className='relative w-full overflow-hidden rounded-lg' style={{position: 'relative', zIndex: 1}}>
          <iframe
            title='Google Map'
            className={`w-full h-full border-0 ${responsiveClasses.current}`}
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1398041.1378619722!2d8.224119!3d46.8131873!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa60731a95555%3A0xa6ef4c6044516d35!2sMatchspace%20Music!5e0!3m2!1sen!2s!4v1728306523313!5m2!1sen!2s'
            style={{clipPath: 'inset(0)', transform: 'translateZ(0)'}}
            loading='lazy'></iframe>
        </div>
      )}
    </>
  );
};
export default GoogleMap;
