import ThumbRight from '@/components/icons/ThumbRight';
import { translateENtoDE } from 'functions/translator';
import Image from 'next/image';
import React from 'react';

const ProfileModal = ({teacher, contactHandle, language}) => {
  return (
    <div className='max-w-[380px] w-full mx-auto bg-white rounded-lg  p-[24px] shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] flex flex-col items-center mt-[20px] '>
      <div className='w-full max-w-[240px] aspect-[240/240] '>
        <Image
          src={teacher?.avatar_path ||  '/assets/images/teacherdefault.avif'}
          alt={teacher?.name || 'Teacher profile picture'}
          width={240}
          height={240}
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <h2 className='text-[24px] text-[#000000]/[87%] font-bold leading-[110%] pt-[16px]'>{teacher?.name}</h2>
      <div className='pt-[24px] w-full'>
        <button onClick={contactHandle} className='w-full mt-[20px] bg-[#f9843b] hover:bg-[#f7650a] text-white font-medium text-[15px] leading-[100%] py-[16.5px] rounded-full transition duration-300'>
          {translateENtoDE('CONTACT ME', language)}
        </button>
        <p className='flex items-center justify-center gap-[8px] mt-[16px]'>
          <ThumbRight />
          <span className='text-[12px] text-[#002D3B] leading-[100%]'>
            {translateENtoDE('95% find their ideal teacher on the first try', language)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;
