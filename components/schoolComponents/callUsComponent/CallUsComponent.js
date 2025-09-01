import React from 'react';
import organizationOwnerImg from '../../../public/assets/images/profile.webp';
import Image from 'next/image';

function formatSwissNumber(number) {
  const numStr = number.toString();
  if (numStr.length !== 11) {
    throw new Error('Number must be exactly 11 digits');
  }

  const parts = [
    numStr.slice(0, 2),
    numStr.slice(2, 4),
    numStr.slice(4, 7),
    numStr.slice(7, 9),  
    numStr.slice(9)     
  ];

  return parts.join(' ');
}

function CallUsComponent({ organizationData, hidePopup, language }) {
  const { organizationName, organizationLogo, organizationOwner, contact, full_name, availability_text } = organizationData;
  return (
    <div className='max-w-[500px] p-5'>
      <div className='flex flex-row xs:flex-row items-center justify-between gap-4'>
        <div className='flex items-center'>
          <div className='w-[48px] h-[48px] rounded-full overflow-hidden mr-3'>
            <Image
              src={organizationOwnerImg}
              alt={full_name}
              className='w-full max-w-[48px] h-[48px] rounded-full object-cover'
            />
          </div>
          <div>
            <h2 className='font-bold text-[15px] leading-[160%]'>
              {contact?.firstname} {contact?.lastname}
            </h2>
            <p className='text-[#000000AD] font-Roboto text-[14px]'>
              {language == 'ch-en' ? contact.role?.en : contact?.role?.de}
            </p>
          </div>
        </div>
        <div className='max-w-[100px]'>
          <Image src={organizationLogo} alt={organizationName} className='object-cover' width={100} height={36} />
        </div>
      </div>
      <p className='pt-3 text-[#000000AD] text-[22px]'>+{formatSwissNumber(contact?.phone)}</p>
      <p className='text-[#000000AD] text-[15px] pt-3'>{language == 'ch-en' ? availability_text?.en : availability_text?.de}</p>
    </div>
  );
}

export default CallUsComponent;
