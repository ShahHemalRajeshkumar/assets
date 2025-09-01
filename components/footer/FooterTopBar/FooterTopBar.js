import React from 'react';

import FooterLogoSection from './FooterLogoSection/FooterLogoSection';
import FooterOtherData from './FooterOtherData/FooterOtherData';

const FooterTopBar = ({language, isTeacherInfoPage, footerData, blok }) => {
  const [footerLogoSection, ...otherFooterData] = footerData;

  return (
    <div className='contain w-full flex flex-col lg:grid lg:grid-cols-4 lg:gap-6 py-10'>
      <FooterLogoSection footerData={footerLogoSection} isTeacherInfoPage={isTeacherInfoPage} language={language} />
      <div className="lg:col-span-3">
        <FooterOtherData footerData={otherFooterData} blok={blok} />
      </div>
    </div>
  );
};

export default FooterTopBar;
