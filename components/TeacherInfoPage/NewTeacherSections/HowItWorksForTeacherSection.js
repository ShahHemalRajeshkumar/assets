import { LessonsStepSection } from '@/components/schoolComponents/commonComponent/LessonsStepSection';
import React from 'react';
import { BookNowCard } from './BookNowCard';

const HowItWorksForTeacherSection = ({ language, pricesHandle, handleOpenGuaranteeModal }) => {
  const StepFormObject = {
    firstTitle: 'Contact your teacher',
    firstSubtitle: 'Get in touch and ask any questions you have.',
    secondTitle: 'Schedule your first lesson',
    secondSubtitle: 'Agree on a date, time and location to get started with your lessons.',
    thirdTitle: 'Book your subscription',
    thirdSubtitle: 'Benefit from our money-back guarantee on your first lesson, simple as that.',
  };
  return (
    <div className='min-[1101px]:max-w-[380px] border-[1px] border-[#E4E7EC] min-[1101px]:border-transparent w-full min-[1101px]:mx-auto bg-white rounded-lg shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] pt-[24px] pb-[16px] px-[24px] min-[1101px]:mt-[20px]'>
      <h2 className='text-[19px] font-bold text-[#000000]/[87%] leading-[100%] '>{language == 'ch-en' ?`How it works` : 'Und so funktioniert es'}</h2>
      <div className='pt-[12px] pb-[24px] border-b-[1px] border-[#E4E7EC]'>
        {LessonsStepSection(StepFormObject, language, '', true)}
      </div>
      <BookNowCard handleOpenGuaranteeModal={handleOpenGuaranteeModal} isCourseModal={false} language={language}/>
      <button
        onClick={pricesHandle}
        className='text-[15px] font-medium font-Roboto uppercase text-[#21697C] border-[1px] border-[#21697C] py-3 px-4 rounded-full transition-all duration-300 ease-linear leading-[126%] hover:bg-[#21697C]/[10%] w-full text-center mt-[24px]'>{language === 'ch-en' ? `VIEW PRICES` : 'PREISE ANSEHEN'}</button>
    </div>
  );
};

export default HowItWorksForTeacherSection;
