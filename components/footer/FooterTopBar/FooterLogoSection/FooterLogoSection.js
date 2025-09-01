import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { IconComponent } from '@/components/IconComponent/IconComponent';

const generateSocialIcon = (link, iconSrc, alt) => (
  <Link href={link} passHref>
    <a rel='noopener noreferrer' className='relative outline-visible rounded w-8 h-8'>
      <Image className='absolute' layout='fill' src={iconSrc} alt={alt} />
    </a>
  </Link>
);

const FooterLogoSection = ({ footerData, isTeacherInfoPage, language }) => {
  const { image_logo, internal_link, icon_name } = footerData;

  // Dynamic class logic
  let classNames = '';

  if (isTeacherInfoPage) {
    // If it's the teachers page, check the language
    if (language === 'ch-en') {
      classNames = 'elfsight-app-4d85e9a6-af0e-482c-9149-1fcf7d897dac';
    } else if (language === 'ch-de') {
      classNames = 'elfsight-app-f63d87b7-8f15-4575-ae30-d8bc4a395ab9';
    }
  } else {
    // If it's not the teachers page, check the language
    if (language === 'ch-en') {
      classNames = 'elfsight-app-bfb85d97-6cf7-4564-9152-a2356c062327';
    } else if (language === 'ch-de') {

      classNames = 'elfsight-app-fd25024a-2452-4e98-9f1a-54ce628a8d66';
    }
  }


  return (
    <>
    <div className='md:pb-8 lg:basis-1/3 xl:pb-0 lg:w-full lg:max-w-[270px] '>
      <div className='max-w-[300pdx]'>
        <IconComponent icon={icon_name?.toLowerCase()} />
      </div>
      <p className='mt-6 text-black text-16px opacity-60'>{internal_link[0].name}</p>
      <div className='lg:flex md:flex mb-8 mt-24'>
        <div className='space-y-4'>
          {internal_link.map(
            (link, index) =>
              [1, 2].includes(index) && (
                <div key={link._uid}>
                  <Link href={link.link.url} passHref>
                    <a className='flex items-center space-x-4 cursor-pointer text-primary'>
                      <i className='material-icons-outlined text-20px text-primary'>{link.icon_name}</i>
                      <span>{link.name}</span>
                    </a>
                  </Link>
                </div>
              )
          )}
          
          <div className='lg:flex lg:space-x-24 md:space-x-0 sm:space-x-0 xs:space-x-0'>
            <div className='flex space-x-3 w-100 mb-8'>
              {generateSocialIcon(
                'https://www.facebook.com/Matchspace-100627415216907',
                'https://images.selise.club/ui-assets/images/ms-website/Group%2011.svg',
                'facebook'
              )}

              {generateSocialIcon(
                'https://www.instagram.com/accounts/login/',
                'https://images.selise.club/ui-assets/images/ms-website/Group%2013.svg',
                'instagram'
              )}
              {generateSocialIcon(
                'https://www.linkedin.com/company/matchspace',
                'https://images.selise.club/ui-assets/images/ms-website/Group%2012.svg',
                'linkedin'
              )}
              {generateSocialIcon(
                'https://www.youtube.com/channel/UC2dwy8vptJI-jiin_j6G_9g',
                'https://images.selise.club/ui-assets/images/ms-website/Group%2014.svg',
                'youtube'
              )}
            </div>
          </div>
        </div>
        <div className='inline-block xl:ml-[97px]  lg:ml-[65px]  md:ml-[50px] sm:-ml-3'>
          <div className={`${classNames}`} data-elfsight-app-lazy></div>
        </div>
      </div>
    </div>
    <Script src='https://static.elfsight.com/platform/platform.js' async />
    </>
  );
};
export default FooterLogoSection;

//'inline-block xl:mt-[80px] xl:ml-[97px] xl:pt-7 lg:ml-[65px] lg:pt-7 md:ml-[50px] md:pt-4 sm:-ml-3 sm:mt-5'