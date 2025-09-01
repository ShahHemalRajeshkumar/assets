import ThumbRight from '@/components/icons/ThumbRight';
import { translateENtoDE } from 'functions/translator';
import React from 'react';

const AskQuestionSection = ({ contactHandle, language }) => {
  const contactFormData = {
    title: 'Get in touch',
    description: `Send me a message to get started with lessons.`,
    placeholder: `Enter your message here...`,
    buttonText: 'CONTACT ME',
    footerText: '95% find their ideal teacher on the first try',
  };

  return (
    <div className='min-[1101px]:max-w-[380px] w-full min-[1101px]:mx-auto bg-white rounded-lg p-[16px] smd:p-[24px] border-[1px] border-[#E4E7EC] min-[1101px]:border-transparent shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)]'>
      <h2 className='text-[19px]  leading-[100%] text-black font-bold mb-[12px]'>{translateENtoDE(contactFormData.title, language)}</h2>
      <p className='text-[14px] text-black/[87%] font-normal mb-[12px]'>{translateENtoDE(contactFormData.description, language)}</p>
      <textarea
        readOnly
        rows={4}
        onClick={contactHandle}
        className='w-full border-[1px] border-[#D0D5DD] rounded pl-[16px] pr-[12px] pt-[12px] placeholder:text-[14px] placeholder:text-[#000000]/[68%] text-[14px] text-[#000000]/[68%] pb-[19px] h-[96px] smd:h-[240px] min-[1101px]:h-[96px] resize-none'
        placeholder={translateENtoDE(contactFormData.placeholder, language)}
      />
      <button
        onClick={contactHandle}
        className='w-full mt-[20px] bg-[#f9843b] hover:bg-[#f7650a] text-white font-medium text-[15px] leading-[100%] py-[16.5px] rounded-full transition duration-300'>
        {translateENtoDE(contactFormData.buttonText, language)}
      </button>
      <p className='flex items-center justify-center gap-[8px] mt-[16px]'>
        <ThumbRight />
        <span className='text-[12px] text-[#002D3B] leading-[100%]'>{translateENtoDE(contactFormData.footerText, language)}</span>
      </p>
    </div>
  );
};

export default AskQuestionSection;
