import React from 'react';
import { genrateInstrumentIcon } from '../instrumentIcon/instrumentIcon';
import Image from 'next/image';
import ArrowRight from '@/components/icons/ArrowRight';
import { translateENtoDE } from 'functions/translator';

function TeacherProfile({ teacher, showTeacherDetails, language }) {
  return (
    <div
      className='p-[16px] border-[1px] border-[#D0D5DD] rounded-lg flex flex-col items-center justify-between w-full h-full cursor-pointer'
      onClick={() => showTeacherDetails(teacher?.mzo_id)}
    >
      <div className='w-full max-w-[120px] h-[120px] rounded-full overflow-hidden relative'>
        <Image
          src={teacher?.image_url || '/assets/images/teacherdefault.avif'}
          alt={teacher?.name || 'Teacher profile'}
          layout="fill"
          objectFit="cover"
          sizes="120px" 
          quality={75} 
          priority={false} 
          placeholder="blur"
          blurDataURL="/placeholder.jpg" 
        />
      </div>
      <h3 className='text-[17px] font-Roboto mt-[16px] font-semibold text-black/[87%] leading-[129%] text-center'>
        {teacher?.name}
      </h3>
      <div className='flex items-center gap-4 my-[16px] justify-center'>
        {[...new Set([...teacher?.instruments])]?.slice(0, 3).map((instrument, index) => {
          return (
            <div key={index} className='text-[32px] [&>div>div]:ml-0 relative group cursor-pointer'>
              {genrateInstrumentIcon(instrument?.key)}
              <span className='absolute top-0 right-[50%] translate-x-1/2 -translate-y-full bg-black/50 text-[12px] leading-[110%] tracking-[0.5px] font-medium text-white shadow-2xl px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-0 transition-all duration-300 ease-linear sm:block hidden'>
                {language === 'ch-de' ? instrument.de : instrument.en}
              </span>
            </div>
          );
        })}
        <span className='text-gray-600'>
          {teacher?.instruments?.length - 4 > 0 ? `+${teacher?.instruments?.length - 4}` : null}
        </span>
      </div>
      <div className='cursor-pointer flex items-center justify-center p-[5px] rounded-full hover:bg-[#EDF3F5] w-full'>
        <span className='text-[14px] font-Roboto font-medium text-[#21697C] leading-[100%]'>
          {translateENtoDE('VIEW PROFILE', language)}
        </span>
        <ArrowRight className='[&>g>path]:fill-[#21697C] [&>g>path]:!fill-opacity-100 w-[20px] h-[20px]' />
      </div>
    </div>
  );
}

export default TeacherProfile;