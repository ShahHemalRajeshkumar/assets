import React from 'react';
import TeacherStudioIcon from '../../components/icons/TeacherStudio.svg';
import { translateENtoDE } from 'functions/translator';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { getSlugAfterDash } from '@/utils/schoolpage/getSlugAfterDash';
import { locationLink, redirectToMZO } from '@/utils/schoolpage/redirectMZO';

function OtherLocationSection({ locationsData, language }) {
  const router = useRouter();
  const regionSlug = getSlugAfterDash(router?.query?.regionSlug);

  return (
    <div id='otherlocation' className='org-gallery'>
      <div
        className={cx(
          'teacher-content-block md:!rounded-xl !px-[16px] !py-[20px] sm:!p-[20px] w-full !mb-[12px] sm:!mb-[20px]'
        )}>
        <h3 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto mb-[12px]'>
          {translateENtoDE('More Locations', language)}
        </h3>
        <p className='text-[15px] text-[#000000AD] leading-[160%] font-Roboto '>
          {translateENtoDE(
            'Learn more about our offers for music students at our other locations in Zurich Oberland.',
            language
          )}
        </p>
        {locationsData?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[12px]'>
            {(() => {
              const sortedLocations = [...locationsData].sort((a, b) => {
                const nameA = language === 'ch-en' ? a.full_name?.en?.toLowerCase() : a.full_name?.de?.toLowerCase();
                const nameB = language === 'ch-en' ? b.full_name?.en?.toLowerCase() : b.full_name?.de?.toLowerCase();
                return nameA.localeCompare(nameB);
              });

              const half = Math.ceil(sortedLocations.length / 2);
              const firstHalf = sortedLocations.slice(0, half);
              const secondHalf = sortedLocations.slice(half);

              return (
                <>
                  <div className='flex flex-col gap-3'>
                    {firstHalf.map((location, index) => {
                      const isActive = regionSlug?.toLowerCase() === location?.slug?.toLowerCase();
                      const href = locationLink(location, language);
                      return (
                        <a
                          key={index}
                          href={href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`flex items-center gap-2.5 cursor-pointer ${isActive && 'pointer-events-none'}`}>
                          <TeacherStudioIcon className='' />
                          <div>
                            <span
                              className={`text-[15px] font-Robot leading-[213%] underline ${
                                isActive ? 'text-gray-400' : 'text-[#000000DE]'
                              }`}>
                              {language === 'ch-en' ? location.full_name?.en : location.full_name?.de}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className='flex flex-col gap-3'>
                    {secondHalf.map((location, index) => {
                      const isActive = regionSlug?.toLowerCase() === location?.slug?.toLowerCase();
                      const href = locationLink(location, language);
                      return (
                        <a
                          key={index}
                          href={href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`flex items-center gap-2.5 cursor-pointer ${isActive && 'pointer-events-none'}`}>
                          <TeacherStudioIcon className='' />
                          <div>
                            <span
                              className={`text-[15px] font-Robot leading-[213%] underline ${
                                isActive ? 'text-gray-400' : 'text-[#000000DE]'
                              }`}>
                              {language === 'ch-en' ? location.full_name?.en : location.full_name?.de}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className='text-[14px] text-[#000000ae] leading-[115%] font-Roboto font-medium mt-4'>
            {translateENtoDE('No other location found', language)}
          </div>
        )}
      </div>
    </div>
  );
}

export default OtherLocationSection;
