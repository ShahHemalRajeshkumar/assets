import Calendar from '@/components/icons/Calendar';
import { CardIcon } from '@/components/icons/card';
import Cheat from '@/components/icons/Cheat';
import EmailIcon from '@/components/icons/EmailIcon';

import { translateENtoDE } from 'functions/translator';
import Image from 'next/image';
import React from 'react';

export const stepsData = [
  {
    icon: <Cheat className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />,
    title: 'Contact your teacher',
    description: 'Get in touch and ask any questions you have.',
  },
  {
    icon: <Calendar className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />,
    title: 'Schedule your first lesson',
    description: 'Agree on a date, time and location to get started with your lessons.',
  },
  {
    icon:<CardIcon className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />,
    title: 'Book your subscription',
    description: 'Benefit from our money-back guarantee on your first lesson, simple as that.',
  },
];
const NewTeacherInfoSupport = ({language}) => {
  return (
    <section className='bg-white rounded-[8px] px-[16px] smd:px-[28px] md:px-[40px] py-[32px] md:mt-[28px] md:mb-[30px]'>
      <div className='flex flex-col md:flex-row gap-[40px] items-center'>
        {/* Left Steps */}
        <div className='w-full max-w-[800px]'>
          <h2 className=' text-[24px] smd:text-left text-center  leading-[117%] font-bold text-[#000000]/[87%]'>
            {language === 'ch-en' ?`How it works` : 'Und so funktioniert es'}
          </h2>
          <div className='flex-1 grid grid-cols-1 smd:grid-cols-3 place-content-center place-items-center smd:place-items-start gap-[24px] mt-[32px]'>
            {stepsData.map((step, index) => (
              <div key={index} className='flex flex-col smd:flex-row items-center smd:items-start gap-4'>
                <div>{step?.icon}</div>
                <div className='flex flex-col gap-[8px]'>
                  <h4 className='font-semibold smd:text-left text-center text-[17px] text-[#000000]/[87%] leading-[130%]'>
                    {translateENtoDE(step?.title, language)}
                  </h4>
                  <p className='text-[12px] smd:text-left text-center  text-[#000000]/[87%] leading-[133%]'>
                    {translateENtoDE(step?.description, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Contact Box */}
        <div className='md:ml-[40px] md:pl-[40px] border-t-[1px] md:border-t-0 md:border-l-[1px] border-l-[#E4E7EC] w-full md:w-fit pt-[40px] md:pt-0'>
          <h4 className='font-semibold text-center text-[17px] text-[#000000]/[87%] leading-[130%]'>
            {translateENtoDE('Do you need support?', language)}
          </h4>
          <div className='mt-[16px] flex flex-col items-center'>
            <Image
              src='https://matchspace-music.ch/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F121094%2F500x500%2Fe8b5572fbb%2Fprofile-image-claudia-carneiro.png&w=128&q=75'
             alt='Cláudia Carneiro'
              width={56}
              height={56}
              className='w-[56px] h-[56px] rounded-full'
            />
            <div className='mt-[12px] text-center font-bold text-[17px] text-[#000000]/[87%] leading-[130%]'>
              {'Cláudia Carneiro'}
            </div>
            <div className='font-normal text-[14px] text-[#000000]/[68%] leading-[140%] mt-[2px] text-center'>
              {translateENtoDE('Customer Success', language)}
            </div>
            <div className='flex flex-col items-center mt-[16px]'>
              <a href='tel:+41445168965' className='block py-[9px] text-[14px] font-medium text-center text-[#21697C]'>
                +41 44 516 89 65
              </a>
              <div className='flex items-center gap-[8px] py-[6px]'>
                <EmailIcon />
                <a href={`mailto:lessons@matchspace.com?subject=${translateENtoDE('I need help finding a teacher', language)}`} className=' text-[14px] font-medium text-center text-[#21697C]'>
                  {translateENtoDE('SEND US AN E-MAIL', language)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTeacherInfoSupport;
