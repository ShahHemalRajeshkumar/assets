import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sortSkillLevels } from '../../../utils/teacherInfo';
import { translateENtoDE, translateFieldKeyToEN } from '../../../functions/translator';
import useWindowSize from '../../../hooks/useWindowSize';
import ArrowLeft from '../../icons/ArrowLeft';
import Pluse from '@/components/icons/Pluse';
import Minus from '@/components/icons/Minus';
import useScroll from '../onScrollShowPopup';
import CloseIcon from '@/components/icons/closeIcon';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import ShareIcon from '@/components/icons/ShareIcon';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
import { TeachingLocation } from '../commonComponent/TeachingLocation';
import { CourseDetailsDesktopPriceCard } from '../commonComponent/CourseDetailsDesktopPriceCard';
import { StepFormObject } from '@/utils/schoolpage/StepFormDetails';

const OrganizationCouresDetailSidebar = ({
  language,
  course = {},
  onClose,
  isConfigurator,
  showPopup,
  isSidebarOpen,
  organizationData,
  isLoading,
  allOrganizationData,
}) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [showCallButton, setShowCallButton] = useState(false);
  const { width } = useWindowSize();
  const itemReachPoint = useRef();
  const sidebarRef = useRef();
  const { isReached } = useScroll(itemReachPoint, sidebarRef);
  const rowLineClasses =
    'flex items-center gap-[6px]  py-[6px] px-[6px] bg-[#F2F4F7] rounded-[4px] leading-[142%] text-[#000000AD] text-[14px] font-medium w-fit';
  const {courseCategoriesData} = useSchoolPage()
  const { query } = useRouter();
  const kidsCourses = course?.prices?.filter((item) => item.age_taught === 'kids') || [];
  const adultsCourses = course?.prices?.filter((item) => item.age_taught === 'adults') || [];
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
        setShowCallButton(scrollTop + clientHeight >= scrollHeight - 30);
      }
    };

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const lowestAndHighest = useMemo(() => {
    const prices = course?.prices;
    if (!prices || prices.length === 0) return [];
    if (prices.length === 1) {
      return [prices[0]];
    }
    const sortedPrices = prices.sort((a, b) => a.price - b.price);
    return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
  }, [course?.prices]);

  const faqs = [
    { question: 'What is your refund policy?', answer: 'You can request a refund within 14 days of purchase.' },
    {
      question: 'How do I change my account settings?',
      answer: 'Go to your profile and click on settings to update your details.',
    },
    {
      question: 'Can I upgrade my subscription later?',
      answer: 'Yes, you can upgrade anytime from the billing section.',
    },
    { question: 'Is there a free trial available?', answer: 'Yes, we offer a 7-day free trial for new users.' },
  ];
  const [openIndexes, setOpenIndexes] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndexes((prev) => (prev == index ? null : index));
  };

  function handleSignUpUrl() {
    const urlPrefix =
      process.env.NEXT_PUBLIC_ENVIRONMENT == 'staging'
        ? 'https://staging.matchspace.click'
        : 'https://app.matchspace-music.ch';
    const organization = query?.organization;
    const currentSlug = organizationData?.slug;

    const url = `${urlPrefix}/music-school/${organization}/signup?region=${currentSlug}&course_id=${
      course?.id
    }&language=${language.split('-')[1]}`;
    window?.open(url, '_blank');
  }

  const filterLocation =
    allOrganizationData
      ?.filter((location) => course?.region_ids?.find((item) => item == location?.id))
      .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? [];

  return (
    <div id={`course-popup-${course?.id}`} className=' h-full overflow-y-scroll pb-14 sm:pb-0' ref={sidebarRef}>
      <div className='flex justify-between items-center mb-[24px] p-[20px] border-b-[1px] border-[#E4E7EC] sticky top-0 bg-white z-[40]'>
        <div className='flex gap-3 items-center'>
          {isSidebarOpen && (
            <div onClick={onClose} className='cursor-pointer'>
              <ArrowLeft />
            </div>
          )}
          <h3 className='font-semibold text-[19px] tx-primary  font-Roboto'>
            {language == 'ch-en' ? 'Course details' : 'Kurs-Details'}
          </h3>
        </div>
        <div className='flex items-center gap-3'>
          <button onClick={() => showPopup('links', { title: translateENtoDE('Share this page', language) })}>
            <ShareIcon className='w-[24px] h-[24px]' />
          </button>
          <button onClick={onClose} className='text-gray-600 hover:text-red-500'>
            <CloseIcon />
          </button>
        </div>
      </div>
      {isLoading ? (
        <li className='flex items-center justify-center h-[80vh]'>
          {' '}
          <Spinner />
        </li>
      ) : (
        <div className='flex sm:flex-row flex-col justify-between gap-[8px] sm:gap-4 md:gap-[40px] px-4 md:px-[24px] pb-[24px] '>
          <div className='w-full sm:max-w-[288px]'>
            <div className='relative overflow-hidden'>
              {!!course?.instrument?.image_url ? (
                <div className='w-full max-w-full smd:max-w-[288px] h-[192px] [&>span]:!h-full [&>span]:!w-full'>
                  <Image
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-lg w-full max-w-full sm:!max-w-[288px] !h-[182px]'
                    src={course?.instrument?.image_url}
                    alt={`${course?.name} course image`}
                    height={isConfigurator ? (width < 500 ? 234 : 220) : 170}
                    width={isConfigurator ? (width < 500 ? window.innerWidth - 30 : 340) : 254}
                  />
                </div>
              ) : (
                <div className='rounded-lg w-full max-w-full sm:!max-w-[288px] !h-[182px] bg-gray-200'></div>
              )}
              {!isConfigurator && !!course?.is_full && (
                <div
                  style={{ width: `${isConfigurator ? (width < 500 ? 280 : 350) : 250}px` }}
                  className='teacher-content-course-booked'>
                  {translateENtoDE('Fully booked', language)}
                </div>
              )}
            </div>
            {/* <p className='text-[14px] font-bold text-[#000000ad] mt-[16px]'>
            {translateENtoDE(
              !course?.course_type == 'pri_vate'
                ? 'Private lessons'
                : course?.course_type == 'group'
                ? 'Group lessons'
                : course?.course_type == 'ensemble' && 'Ensemble lessons',
              language
            )}
          </p> */}
            <p className='text-[14px] font-bold text-[#000000ad] mt-[16px]'>
              {course?.mzo_course_category?.type_name[language == 'ch-en' ? 'en' : 'de']}
            </p>
            <h3 className={cx(' text-[17px] sm:text-[19px] leading-[24px] font-bold mb-[16px] mt-[4px]')}>
              {language == 'ch-en' ? course?.title?.en : course?.title?.de}
            </h3>
            {LessonsStepSection(
              StepFormObject,
              language,
              <button
                onClick={() => handleSignUpUrl()}
                className='text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full  hover:bg-[#004252] transition duration-300 ease-linear border-[1px] border-transparent '>
                {translateENtoDE(`Sign up`, language)}
              </button>
            )}
          </div>

          <div ref={contentRef} className='w-full max-w-full smd:max-w-[584px] sm:mt-0 mt-[16px] '>
            <div className='flex items-center justify-between mb-[24px]'>
              <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto '>
                {translateENtoDE(`Course information`, language)}
              </h2>
              <span className='text-[13px] font-Roboto leading-[123%] text-[#000000ad]'>{`Id : ${course?.id}`}</span>
            </div>
            <div>
              <div
                className={cx(
                  {
                    'flex flex-col': isConfigurator,
                    '': !isConfigurator,
                  },
                  'border-b-[1px] border-[#E4E7EC] pb-[20px] mb-[20px]'
                )}>
                <div
                  className={cx('flex flex-col gap-[24px]', {
                    'mt-3': isConfigurator,
                  })}>
                  <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
                    {/* instruments */}
                    <div className='w-full max-w-[280px]'>
                      <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de] mb-[8px]'>
                        {translateENtoDE(`Instruments`, language) + ':'}
                      </p>
                      {/* <CourseInstrumentIcon className='mr-3' /> */}
                      <div className='flex flex-wrap items-center gap-1'>
                        {
                          <div
                            className={`${rowLineClasses} ${
                              course?.instrument?.key == 'Rental Instruments Available' && 'bg-[#ADDEC9]'
                            }`}>
                            <div className='ms_instruments'>
                              <div
                                className={`ms_instruments-${String(course?.instrument?.key)
                                  .toLowerCase()
                                  .replace(' ', '_')} text-[19px] font-medium text-[#000000ad]`}
                              />
                            </div>
                            {course?.instrument && course?.instrument[language === 'ch-de' ? 'de' : 'en']}
                          </div>
                        }
                        {course?.partsgroup_rental ? (
                          <div className={`${rowLineClasses} bg-[#ADDEC9]`}>
                            {translateENtoDE('Rental instrument available', language)}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className='w-full max-w-[280px]'>
                      <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de] mb-[8px]'>
                        {translateENtoDE('Age groups taught', language) + ':'}
                      </p>
                      <div>
                        {/* <PeopleIcon className='mr-2' /> */}
                        <div className='flex items-center gap-1'>
                          {course?.age_groups?.sort()?.map((ageItem, idx) => (
                            <div key={idx} className={rowLineClasses}>
                              {translateFieldKeyToEN(ageItem, language)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
                    <div className='w-full max-w-[280px]'>
                      <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                        {translateENtoDE('Skill levels taught', language) + ':'}
                      </p>
                      <div className='flex flex-wrap gap-1 mt-[8px]'>
                        {/* <CourseLevelIcon className='mr-2' /> */}
                        {sortSkillLevels(course?.skill_levels).length > 0
                          ? sortSkillLevels(course?.skill_levels)?.map((ageItem, idx) => (
                              <div key={idx} className={rowLineClasses}>
                                {translateFieldKeyToEN(ageItem, language)}
                              </div>
                            ))
                          : course?.skill_levels?.map((skill, idx) => (
                              <div key={idx} className={rowLineClasses}>
                                {translateFieldKeyToEN(skill.toLowerCase(), language)}
                              </div>
                            ))}
                      </div>
                    </div>

                    <div className='w-full max-w-[280px]'>
                      <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                        {translateENtoDE('Lesson frequencies', language) + ':'}
                      </p>
                      <div className='flex  flex-wrap items-center gap-1 mt-[8px]'>
                        {course?.lesson_qts?.map((lesson, idx) => {
                          return (
                            <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                              <p>{`${lesson} ${
                                lesson.split('-')[0] > 1
                                  ? language == 'ch-de'
                                    ? 'Lektionen'
                                    : 'lessons'
                                  : language == 'ch-de'
                                  ? 'Lektion'
                                  : 'lesson'
                              }`}</p>
                            </div>
                          );
                        })}
                        {course?.frequencies?.map((freq, idx) => {
                          if (freq?.key == 'weekly') return;
                          return (
                            <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                              <p>{`${language == 'ch-en' ? freq.en : freq.de}`}</p>
                            </div>
                          );
                        })}
                        <div className={`whitespace-nowrap ${rowLineClasses}`}>
                          <p>{`${language == 'ch-en' ? 'weekly' : 'wöchentlich'}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* lession duration */}
                  <div ref={itemReachPoint} className='w-full max-w-[280px]'>
                    <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                      {translateENtoDE('Lesson durations', language) + ':'}
                    </p>
                    <div className='flex md:flex-nowrap flex-wrap items-center gap-1 mt-[8px]'>
                      {course?.durations.map((duration, idx) => {
                        return (
                          <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                            <p>{`${duration} ${translateENtoDE('mins.', language)}`}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {kidsCourses.length > 0 ||
                    (adultsCourses.length > 0 && (
                      <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
                        {kidsCourses.length > 0 && (
                          <div className='w-full max-w-[280px]'>
                            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                              {translateENtoDE('Offers for', language)} {translateENtoDE('Kids', language)}
                            </p>
                            <div className='flex flex-col gap-1 mt-[8px]'>
                              <div className={rowLineClasses}>{`Weekly: ${kidsCourses.length} ${translateENtoDE(
                                'lessons',
                                language
                              )}`}</div>
                              <div className={rowLineClasses}>{`Every 2 Weeks: ${kidsCourses.length} ${translateENtoDE(
                                'lessons',
                                language
                              )}`}</div>
                            </div>
                          </div>
                        )}

                        {adultsCourses.length > 0 && (
                          <div className='w-full max-w-[280px]'>
                            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                              {translateENtoDE('Offers for', language)} {translateENtoDE('Adults', language)}
                            </p>
                            <div className='flex flex-col gap-1 mt-[8px]'>
                              <div className={rowLineClasses}>{`Weekly: ${adultsCourses.length} ${translateENtoDE(
                                'lessons',
                                language
                              )}`}</div>
                              <div className={rowLineClasses}>{`Every 2 Weeks: ${
                                adultsCourses.length
                              } ${translateENtoDE('lessons', language)}`}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {filterLocation && filterLocation?.length > 0 && (
                <TeachingLocation title='Teaching locations' filterLocation={filterLocation} language={language} />
              )}

              {course?.min_prices?.kids?.price || course?.min_prices?.adults?.price ? (
                <div className='mt-[24px] pb-[24px] border-b-[1px] border-[#E4E7EC]'>
                  <p className='font-semibold text-[14px] leading-[150%] font-Roboto mb-[12px]'>
                    {translateENtoDE('Starting from', language) + ':'}
                  </p>
                  <div className='flex sm:flex-row flex-col items-center justify-between w-full mt-[12px] gap-2.5'>
                    {course?.min_prices?.kids?.price && (
                      <CourseDetailsDesktopPriceCard
                        priceData={course.min_prices.kids}
                        label='for kids and young adults'
                        language={language}
                      />
                    )}

                    {isReached && width < 600 && (
                      <div
                        onClick={handleSignUpUrl}
                        className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4'>
                        <button className='bg-[#F9843B] text-white text-[15px] font-medium uppercase py-3 w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition'>
                          {translateENtoDE('SIGN UP', language)}
                        </button>
                      </div>
                    )}

                    {course?.min_prices?.adults?.price && (
                      <CourseDetailsDesktopPriceCard
                        priceData={course.min_prices.adults}
                        label='for adults'
                        language={language}
                      />
                    )}
                  </div>
                  {course?.min_prices?.kids?.price || course?.min_prices?.adults?.price ? (
                    <p className='mt-[12px] text-[15px] font-Roboto leading-[160%] text-[#000000ad]'>
                      {translateENtoDE(
                        `The prices quoted are indicative and may change according to the course configuration and possible subsidization after registration.`,
                        language
                      )}
                    </p>
                  ) : null}
                </div>
              ) : null}
              <div className='mb-[24px]'>
                <div className='mt-[24px] mb-4'>
                  <p className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto'>
                    {translateENtoDE('About course', language)}
                  </p>
                </div>
                <ShowMoreTextNext
                  maxLength={200}
                  language={language}
                  showButtonLabel={translateENtoDE('Show more', language)}>
                  {language == 'ch-en' ? course?.description.en : course?.description.de}
                </ShowMoreTextNext>
              </div>
              <div className='w-full'>
                <p className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto mb-[16px]'>FAQ</p>
                <div className='flex flex-col sm:gap-[8px]'>
                  {organizationData?.faqs?.map((item, index) => (
                    <div key={index} className='border-b border-[#EDF3F5] mbn'>
                      <button
                        className='w-full flex items-center justify-between rounded-full py-[8px] cursor-pointer transition-colors'
                        onClick={() => toggleAccordion(index)}>
                        <span className='text-[##000000ad] text-[14px] leading-[150%] font-Roboto text-left '>
                          {language == 'ch-en' ? item?.faq_title?.en : item?.faq_title?.de}
                        </span>
                        <span className='text-[20px] text-[#21697C] font-bold'>
                          {openIndexes === index ? <Minus /> : <Pluse />}
                        </span>
                      </button>

                      {/* Animated answer section */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          openIndexes === index ? 'h-auto pb-[8px] pt-[4px]' : 'h-0'
                        }`}>
                        <p className='text-[#000000ad] text-[13px] font-normal'>
                          {language == 'ch-en' ? item?.faq_text?.en : item?.faq_text?.de}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationCouresDetailSidebar;
