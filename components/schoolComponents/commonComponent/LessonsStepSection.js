import Calendar from '@/components/icons/Calendar';
import { CardIcon } from '@/components/icons/card';
import Cheat from '@/components/icons/Cheat';
import Music from '@/components/icons/Music';
import { translateENtoDE } from 'functions/translator';

export function LessonsStepSection(data, language, component, isTeacherSection = false) {
  const { firstTitle, firstSubtitle, secondTitle, secondSubtitle, thirdTitle, thirdSubtitle } = data;
  return (
    <div className='pt-[12px] flex flex-col gap-6 w-full'>
      {/* <p className='text-[17px] font-Roboto leading-[129%] block text-[#000000DE] font-bold'>
        {translateENtoDE('How it works', language)}
      </p> */}
      <div className='flex gap-[12px] md:gap-[16px] h-auto relative'>
        <Cheat className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />
        <div className='w-[2px] h-auto bg-[#21697C]'></div>
        <div>
          <h4 className='text-[14px] font-semibold leading-[150%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(firstTitle, language)}
          </h4>
          <p className='text-[12px] leading-[133%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(firstSubtitle, language)}
          </p>
        </div>
        <div className='w-[8px] h-[8px] border-[2px] rounded-full border-[#21697C] absolute bottom-[-20px] left-[45px]'></div>
      </div>
      <div className='flex  gap-[12px] md:gap-[16px] h-auto relative'>
        <Calendar className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />
        <div className='w-[2px] h-auto bg-[#21697C]'></div>
        <div>
          <h4 className='text-[14px] font-semibold leading-[150%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(secondTitle, language)}
          </h4>
          <p className='text-[12px] leading-[133%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(secondSubtitle, language)}
          </p>
        </div>
        <div className='w-[8px] h-[8px] border-[2px] rounded-full border-[#21697C] absolute bottom-[-20px] left-[45px]'></div>
      </div>
      <div className='flex  gap-[12px] md:gap-[16px] h-auto relative'>
        {isTeacherSection ? (
          <CardIcon className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />
        ) : (
          <Music className='min-w-[32px] h-[32px] max-h-[32px] my-auto' />
        )}
        <div className='w-[2px] h-auto bg-[#21697C]'></div>
        <div>
          <h4 className='text-[14px] font-semibold leading-[150%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(thirdTitle, language)}
          </h4>
          <p className='text-[12px] leading-[133%] text-[#000000DE] font-Roboto'>
            {translateENtoDE(thirdSubtitle, language)}
          </p>
        </div>
      </div>
      {component}
    </div>
  );
}
