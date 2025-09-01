import React, { useRef } from 'react';
import { extractClassValues } from '../utils/breakpoint';
import { storyblokEditable } from '@storyblok/react';

const GoogleMapComponent = ({ blok }) => {
  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());

  return (
      <div {...storyblokEditable(blok)} className='relative w-full h-full overflow-hidden rounded-lg' style={{position: 'relative', zIndex: 1}}>
        <iframe
          title='Google Map'
          className={`w-full h-full border-0 ${responsiveClasses.current}`}
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1005.7798808611252!2d67.07152891674669!2d24.90263488359459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f206942c371%3A0x43f386403124cd7!2sHassan%20Apartments%2C%20Block%20&#39;O&#39;%20Block%2013%20A%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1727945029254!5m2!1sen!2s'
          width='100%'
          height='100%'
          style={{clipPath: 'inset(0)', transform: 'translateZ(0)'}}
          loading='lazy'></iframe>
      </div>
  );
};
export default GoogleMapComponent;
