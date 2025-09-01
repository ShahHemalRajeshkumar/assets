import React from 'react';
import FooterList from './FooterList/FooterList';

const FooterOtherData = ({ footerData, blok }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
    {footerData.map((footer) => (
      <div key={footer._uid}>
        <FooterList linkData={footer} />
      </div>
    ))}
  </div>
);

export default FooterOtherData;
