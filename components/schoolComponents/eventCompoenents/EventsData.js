import { translateENtoDE } from 'functions/translator';
import React from 'react';
import cx from 'classnames';
import View from '@/components/icons/View';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';

function EventsData({ language, organizationData }) {
  const eventData = organizationData?.events?.[0];

  return (
      <div className={cx('teacher-content-block md:!rounded-xl !px-[16px] !py-[20px] sm:!p-[20px] w-full !mb-[12px] sm:!mb-[20px]')}>
        <div className='flex flex-col items-start justify-between'>
          <h3 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto  sm:mb-0 mb-5'>
            {translateENtoDE('Events', language)}
          </h3>
          {eventData ?
            <>
              <img
                src={eventData?.image || '/assets/images/logo.png'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/logo.png';
                }}
                alt='image'
                className='w-full max-w-[48px] h-[48px] block sm:hidden object-contain'
              />
              <div className='flex sm:items-center gap-4 mt-[20px] flex-col sm:flex-row'>
                <img
                  src={eventData?.image || '/assets/images/logo.png'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/logo.png';
                  }}
                  alt='image'
                  className='w-full max-w-[48px] h-[48px] sm:block hidden object-contain'
                />

                <div>
                  <span className='text-[#000000DE] text-[15px] font-Roboto font-bold leading-[160%] mb-2 block'>
                    {language == 'ch-en' ? eventData?.title?.en : eventData?.title?.de}
                  </span>
                  <div className='[&>div>p]:!text-[14px]'>
                    <ShowMoreTextNext
                      language={language}
                      showButtonLabel={translateENtoDE('Show more', language)}
                      maxLength={370}>
                      {language == 'ch-en' ? eventData?.event_text?.en : eventData?.event_text?.de}
                    </ShowMoreTextNext>
                  </div>
                </div>
                <a href={eventData?.url} target='_blank' className='group relative'>
                  <View className='min-w-[20px] min-h-[20px] cursor-pointer' />
                  <span className='absolute -top-2 right-0 -translate-y-full bg-black/50  text-[12px] leading-[110%] tracking-[0.5px] font-medium text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50'>
                    {translateENtoDE('Open in new window', language)}
                  </span>
                </a>
              </div>
            </>
            : <div className='text-[14px] text-[#000000ae] leading-[115%] font-Roboto font-medium mt-4'>
                Event data not found
            </div>}
        </div>
      </div>
  );
}

export default EventsData;
