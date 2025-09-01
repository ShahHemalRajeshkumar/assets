import Image from 'next/image';
import React from 'react';
import Star from '../icons/star';
import { translateENtoDE } from 'functions/translator';
import organizationOwnerImg from 'public/assets/images/profile.webp';
import useWindowSize from 'hooks/useWindowSize';

function SchoolOrganizationCard({ organizationData, language, showPopup, itemReachPoint }) {
  const { full_name, organizationLogo, organizationOwner,contact } = organizationData;
  const organizationName = language == 'ch-en' ? full_name?.en : full_name?.de;
  const phoneNumber = contact?.phone?.startsWith('+') ? contact.phone : `+${contact?.phone}`;
  const { width } = useWindowSize()

  return (
    <div className='w-full max-w-full  md:max-w-[28%]   mt-[-10%] xs:mt-[-15%] md:mt-[-19%] xl:mt-[-17.1%]  z-1   md:sticky md:top-[20px] top-auto  md:ml-3 lg:ml-[40px]  relative md:px-0 px-[8px]'>
      <div className='bg-white px-[16px] xs:px-[24px]  shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.10),0px_4px_6px_-2px_rgba(16,24,40,0.05)] sm:rounded-[20px] rounded-b-[20px] xs:pt-0 pt-20'>
        <div className='flex items-center flex-col pt-6 md:pt-0 '>
          <div className='md:mt-0 absolute xs:static top-[-48px] em:top-[-70px] xs:top-auto xs:mt-[-10%] sm:mt-[-15%] rounded-xl overflow-hidden shadow-[5.5px_5.5px_13.75px_0px_rgba(0,0,0,0.15)] md:shadow-none px-4 em:px-3 sm:px-6 md:px-0  bg-white'>
            <img
              src={organizationLogo}
              alt='logo'
              className='w-full max-w-[140px] sm:max-w-[156px] md:max-w-[200px] h-[145px] sm:h-[156px] md:h-[200px] object-cover'
            />
          </div>
          <h3 className='text-[20px] capitalize sm:text-[24px] font-bold font-Roboto text-black text-center leading-[116.5%] mt-[16px] xs:mt-[18px] mb-[16px] sm:my-[16px]'>
            {organizationName}
          </h3>

          {/* <div className='flex items-center gap-3  mb-[24px]'>
            <div className=''>
              <img
                src={'/assets/images/google.webp'}
                alt='images'
                className='w-full max-w-[24px] h-[24px] object-cover'
              />
            </div>
            <div className='flex  items-center gap-[1px]'>
              {[...Array(5)].map((_, index) => (
                <Star key={index} className='w-[24px] h-[24px]' />
              ))}
            </div>
            <span className='text-black text-[15px] font-Roboto font-semibold leading-[100%]'>{`4.6 (17)`}</span>
          </div> */}
          {organizationData?.availability_text?.[language == 'ch-en' ? 'en' : 'de'] && (
            <p className='text-[14px] font-Roboto leading-[147%] text-black border-b-[1px] border-[#D0D5DD] pb-[12px]'>
              {organizationData?.availability_text[language == 'ch-en' ? 'en' : 'de']}
            </p>
          )}
        </div>
        <div className=' flex items-center gap-3 mt-[12px]'>
          <div className='w-full max-w-[48px] h-[48px] rounded-full'>
            <Image src={organizationOwnerImg} alt='img' className='w-full h-full  object-cover' />
          </div>
          <div>
            <h4 className='text-[15px] font-Roboto font-bold leading-[160%] text-black/[87%]'>
              {contact?.firstname} {contact?.lastname}
            </h4>
            <h5 className='text-[14px] leading-[150%] font-Roboto text-[#000000ae]'>
              {language == 'ch-en' ? contact?.role.en : contact?.role.de}
            </h5>
          </div>
        </div>
        <div className='flex flex-col gap-4 py-[16px]'>
          <button
            className='text-[15px] font-medium font-Roboto uppercase text-white bg-[#21697C] py-3 px-4 rounded-full border-[1px] border-transparent  transition-all duration-300 ease-linear leading-[126%] hover:bg-[#004252]'
            onClick={() =>
              showPopup('contectUs', {
                title: translateENtoDE('Get in touch with us', language),
              })
            }>
            {language == 'ch-en' ? 'CONTACT US' : translateENtoDE('WRITE US', language)}
          </button>
          {width < 600 ? (
            <a
              href={`tel:${phoneNumber}`}
              className='text-[15px] font-medium font-Roboto uppercase text-[#21697C] border-[1px] border-[#21697C] py-3 px-4 rounded-full transition-all duration-300 ease-linear leading-[126%] hover:bg-[#21697C]/[10%] w-full text-center'>
              {translateENtoDE('CALL US', language)}
            </a>
          ) :  (<button
            onClick={() =>
              showPopup('callUs', {
                title: translateENtoDE('Get in touch with us', language),
              })
            }
            className='text-[15px] font-medium font-Roboto uppercase text-[#21697C] border-[1px] border-[#21697C] py-3 px-4 rounded-full transition-all duration-300 ease-linear leading-[126%] hover:bg-[#21697C]/[10%] w-full text-center'>
            {translateENtoDE('CALL US', language)}
          </button>)}
        </div>
      </div>
    </div>
  );
}

export default SchoolOrganizationCard;
