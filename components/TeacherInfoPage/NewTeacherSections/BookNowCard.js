import ArrowRight from '@/components/icons/ArrowRight';
import BookNow from '@/components/icons/BookNow';
import { translateENtoDE } from 'functions/translator';

export function BookNowCard({ handleOpenGuaranteeModal, isCourseModal, language }) {
  return (
    <div
      className={` flex items-center justify-between gap-[20px] ${
        !isCourseModal ? 'border-b-[1px] border-[#E4E7EC] py-[24px]' : 'pt-[16px] border-t-[1px] border-[#E4E7EC] w-full'
      } cursor-pointer`}
      onClick={handleOpenGuaranteeModal}>
      <div className='flex items-center gap-[20px]'>
        <div className='w-[48px] min-w-[48px] h-[48px] bg-[#EDF3F5] rounded-lg flex items-center justify-center'>
          <BookNow />
        </div>
        <div className='flex flex-col gap-[2px]'>
          <h3 className='text-[14px] leading-[150%] font-bold text-[#21697C] !mt-0'>{(isCourseModal ? "*" :'') + translateENtoDE('Book now, pay later', language)}</h3>
          <span className='text-[12px] leading-[133%] text-[#000000]/[87%] '>{translateENtoDE('Secure your slot for lessons today and pay later.', language)}</span>
        </div>
      </div>
      <ArrowRight className='[&>g>path]:fill-[#21697C]' />
    </div>
  );
}
