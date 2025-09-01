import * as yup from 'yup';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { getLessonParams, getLessonPriceInfo, getLessonInfo, getLessonPrice, getLessonCalculation } from './helpers';
import TeacherConfiguratorStepTwo from './TeacherConfiguratorStepTwo';
import TeacherConfiguratorLesson from './TeacherConfiguratorLesson';
import TeacherConfiguratorSelect from './TeacherConfiguratorSelect';
import { translateENtoDE } from '../../../functions/translator';
import useWindowSize from '../../../hooks/useWindowSize';
import TeacherInfoBlock from './TeacherInfoBlock';
import ShieldIcon from '../../icons/shield.svg';
import { filteredByParams } from './helpers';
import { BookNowCard } from '../NewTeacherSections/BookNowCard';

const TeacherConfigurator = ({
  course,
  teacher,
  isModal,
  language,
  lessonId,
  isBooked,
  fixedTabs,
  hidePopup,
  showPopup,
  seoActions,
  courses = [],
  courseParams,
  isCoursePopup
}) => {
  const totalRef = useRef(null);
  const { query } = useRouter();
  const { width } = useWindowSize();
  const [geoloc, setGeoLoc] = useState('');
  const [geoType, setGeoType] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [isSecondStepError, setIsSecondStepError] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessons: 10,
      location: '',
      duration: '',
      ageGroupe: '',
      lessonId: lessonId || '',
    },
    resolver: yupResolver(
      yup.object().shape({
        lessons: yup.string().required(translateENtoDE('Required', language)),
        lessonId: yup.string().required(translateENtoDE('Required', language)),
        location: yup.string().required(translateENtoDE('Required', language)),
        duration: yup.string().required(translateENtoDE('Required', language)),
        ageGroupe: yup.string().required(translateENtoDE('Required', language)),
      })
    ),
  });

  const updateLessonId = (id) => {
    setValue('lessonId', id);
    setValue('duration', '');
    setValue('location', '');
    setValue('ageGroupe', '');
  };
  const lesson = watch('lessonId');
  const lessons = watch('lessons');
  const duration = watch('duration');
  const location = watch('location');
  const ageGroupeValue = watch('ageGroupe');

  const isDisabled = !lesson || !lessons || !duration || !location || !ageGroupeValue;

  const { lessonInfo, lessonOptions, ageOptions, locationOptions } = useMemo(() => {
    return getLessonParams({ course, query, courses, lesson, language, locations: teacher?.locations });
  }, [course, courses, teacher, lesson, query, language]);

  const currentCourse = useMemo(() => {
    return getLessonInfo({ course, courses, lesson, query });
  }, [course, courses, lesson, query]);

  const { prices, lessonPrice, lessonsDuration } = useMemo(() => {
    return getLessonPriceInfo(lessonInfo, { lessons, duration, ageGroupeValue });
  }, [lessonInfo, lessons, duration, ageGroupeValue]);

  const { discount, totalPriceWithoutDiscount } = useMemo(() => {
    return getLessonCalculation(lessonPrice, lessons);
  }, [lessonPrice, lessons]);

  const shareLinkHandle = useCallback(() => {
    showPopup('links', { title: translateENtoDE('Share this page', language) });
  }, [showPopup, language]);

  const courseParamsValues = useMemo(
    () => ({
      lessons,
      duration,
      location,
      isSecondStep,
      ageGroupeValue,
      lesson: lesson || lessonId,
    }),
    [lesson, lessonId, isSecondStep, lessons, duration, location, ageGroupeValue]
  );

  const showPrices = useCallback(() => {
    showPopup('prices', {
      extraClass: 'teacher-page-popup-prices',
      title: translateENtoDE('Configure your session', language),
      courseParams: courseParamsValues,
    });
  }, [showPopup, courseParamsValues, language]);

  const lessonHandle = useCallback(
    (isPrice) => {
      const courseID = lesson || lessonId;
      if (courseID) {
        showPopup(`course${isPrice ? '-price' : ''}`, {
          course: course || courses?.filter((item) => item?.id === courseID)[0],
          title: translateENtoDE('Course details', language),
          extraClass: 'teacher-page-popup-course-mobile',
          courseParams: courseParamsValues,
          isMobileOnClose: !!isCoursePopup,
          extraOnClose: () => {
            if (!isPrice) showPrices();
          },
        });
      }
    },
    [showPopup, showPrices, isCoursePopup, language, lesson, lessonId, course, courses, courseParamsValues]
  );

  const guaranteeHandle = useCallback(() => {
    showPopup('guaranteeNewPopup', {
      title: translateENtoDE('Our flexible payment options', language),
      extraClass: 'teacher-page-popup-course-mobile ',
      isMobileOnClose: !!isCoursePopup,
      extraOnClose: () => {
        if (isCoursePopup) {
          lessonHandle(isCoursePopup);
        } else {
          showPrices();
        }
      },
    });
  }, [lessonHandle, showPrices, showPopup, isCoursePopup]);

  const isFullyBooked = useMemo(() => {
    return !!isBooked || !!currentCourse?.is_full || (!lessonOptions?.length && !lessonId);
  }, [isBooked, lessonOptions, currentCourse, lessonId]);

  const buttonTitle = useMemo(() => {
    if (!isFullyBooked) return '';

    return `${translateENtoDE('Please contact', language)} ${teacher?.name} ${translateENtoDE(
      'to verify their availability',
      language
    )}`;
  }, [isFullyBooked, language, teacher]);

  const isFieldErrors = useMemo(
    () => !!Object.keys(errors).length && (!lesson || !lessons || !duration || !location || !ageGroupeValue),
    [errors, lesson, lessons, duration, location, ageGroupeValue]
  );

  const addToCart = useCallback(
    (form) => {
      if (seoActions?.addToCart) {
        const courseID = lesson || lessonId;
        const courseData = course || courses?.filter((item) => item?.id === courseID)[0];
        seoActions?.addToCart({
          course: courseData,
          form,
          discount,
          price: totalPriceWithoutDiscount,
          teacher,
        });
      }
    },
    [seoActions, teacher, course, courses, discount, totalPriceWithoutDiscount, lesson, lessonId]
  );

  const onSubmit = useCallback(
    ({ lessonId, location, duration, ageGroupe, lessons }) => {
      if (isSecondStep && !isFinished && !geoloc) {
        setIsSecondStepError(true);
      } else {
        setIsSecondStepError(false);
        if (!isSecondStep && (location === 'studios' || location === 'teacher_place')) {
          setIsSecondStep(true);
        } else {
          if (!isSecondStep || geoloc) {
            const courseParams = `&course_id=${lessonId}&location_type=${geoType || location}&student_age=${ageGroupe}`;
            const lessonParams = `&duration=${duration}&lessons=${lessons}`;
            const geoLocParams = geoloc ? `&geoloc=${geoloc}` : '';
            const lang = `&language=${language === 'ch-en' ? 'en' : 'de'}`;
            const link = `${process.env.MATCHSPACE_CHECKOUT}?${courseParams}${lessonParams}${geoLocParams}${lang}`;

            if (window) window.open(link, '_blank').focus();

            addToCart({ lessonId, location, duration, lessons, ageGroupe, geoloc });

            if (hidePopup) hidePopup();
          }
        }
      }
    },
    [hidePopup, isFinished, language, geoloc, geoType, isSecondStep, addToCart]
  );

  useEffect(() => {
    const cachedRef = totalRef.current;
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.intersectionRatio < 1), { threshold: [1] });

    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [totalRef]);

  useEffect(() => {
    if (courseParams && !isUpdated) {
      setValue('lessonId', courseParams?.lesson);
      setValue('lessons', courseParams?.lessons);
      setValue('location', courseParams?.location);
      setValue('duration', courseParams?.duration);
      setValue('ageGroupe', courseParams?.ageGroupeValue);
      setIsSecondStep(!!courseParams?.isSecondStep);

      setIsUpdated(true);
    }
  }, [courseParams, isUpdated, setValue]);

  useEffect(() => {
    if ((!duration && lessonsDuration?.length === 1) || (duration && !lessonsDuration.includes(duration))) {
      setValue('duration', lessonsDuration[0]);
    }
  }, [duration, setValue, lessonsDuration]);

  useEffect(() => {
    return;

    if (lessonOptions?.length && !lessonId && !courseParams) {
      const lessonByParams = filteredByParams(courses, query);

      if (!lesson) {
        setValue('lessonId', lessonByParams?.id || lessonOptions[0]?.value);
      }
      if (locationOptions?.length && !location) {
        const locationByParams = locationOptions.filter((item) =>
          item.label.toLocaleLowerCase().includes(query?.location)
        );
        setValue('location', locationByParams[0]?.value || locationOptions[0]?.value);
      }
      if (ageOptions?.length && !ageGroupeValue) {
        const locationByParams = ageOptions.filter((item) => item.value === query?.age);
        setValue('ageGroupe', locationByParams[0]?.value || ageOptions[0]?.value);
      }
      if (lesson && !duration) {
        const durationByParams = lessonsDuration.filter((item) => item === query?.duration);
        setValue('duration', durationByParams[0] || lessonsDuration[0]);
      }
    }
  }, [
    query,
    lesson,
    courses,
    lessonId,
    setValue,
    location,
    duration,
    ageOptions,
    courseParams,
    lessonOptions,
    ageGroupeValue,
    lessonsDuration,
    locationOptions,
  ]);

  const fullPrice = useMemo(() => {
    return getLessonPrice(prices[+lessons], lessonPrice?.duration) || 0;
  }, [prices, lessons, lessonPrice]);

  const isSurcharge = useMemo(() => location === 'student_place', [location]);
  const isDurationError = useMemo(
    () => (!!errors?.duration?.type || isFieldErrors) && !duration,
    [errors, duration, isFieldErrors]
  );

  const totalPrice = useMemo(() => {
    if (isSurcharge) {
      return +totalPriceWithoutDiscount + Math.ceil(Math.ceil(+lessonPrice?.surcharge * 1.2) * +lessons) || 0;
    }
    return +totalPriceWithoutDiscount || 0;
  }, [lessons, lessonPrice, isSurcharge, totalPriceWithoutDiscount]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cx('configurator-fixed', {
        'configurator-fixed-tabs': fixedTabs?.fixedTab && !isModal,
      })}>
      {!!fixedTabs?.fixedTab && !isModal && width > 768 && (
        <>
          {/* <div className='h-[80px] w-full mb-[8px]' /> */}
          <TeacherInfoBlock
            teacher={teacher}
            language={language}
            showPopup={showPopup}
            shareLinkHandle={shareLinkHandle}
            contactInfoRef={fixedTabs?.ref?.contactInfoRef}
          />
        </>
      )}
      <div
        ref={fixedTabs?.ref?.formRef}
        className={cx('configurator', {
          'configurator-booked': isFullyBooked,
        })}>
        {isSecondStep && !isDisabled ? (
          <TeacherConfiguratorStepTwo
            geoloc={geoloc}
            teacher={teacher}
            language={language}
            setGeoLoc={setGeoLoc}
            setGeoType={setGeoType}
            setIsFinished={setIsFinished}
            setIsSecondStep={setIsSecondStep}
            locations={currentCourse?.locations}
          />
        ) : (
          <>
            {!!lessonId && (
              <div className='flex items-center justify-between mb-4'>
                <p className='text-16px font-bold'>{translateENtoDE('Configure your session', language)}</p>
                {!!isFullyBooked && (
                  <p className='configurator-booked-line'>{translateENtoDE('Fully booked', language)}</p>
                )}
              </div>
            )}
            <div className='configurator-border'>
              {!lessonId && (
                <div className='grid grid-cols-1 configurator-border-bottom'>
                  <TeacherConfiguratorSelect
                    id='lessonId'
                    name='lessonId'
                    language={language}
                    options={lessonOptions}
                    value={watch('lessonId')}
                    error={errors?.lessonId?.type}
                    disabled={!lessonOptions?.length}
                    onChange={(value) => updateLessonId(value)}
                    label={translateENtoDE('Select course', language)}
                  />
                </div>
              )}
              <div className='grid grid-cols-2'>
                <TeacherConfiguratorSelect
                  id='location'
                  name='location'
                  language={language}
                  value={watch('location')}
                  options={locationOptions}
                  disabled={!watch('lessonId')}
                  error={errors?.location?.type}
                  label={translateENtoDE('Location', language)}
                  onChange={(value) => {
                    setValue('location', value);
                    setGeoLoc('');
                    setGeoType('');
                  }}
                />
                <div className='configurator-border-left'>
                  <TeacherConfiguratorSelect
                    id='ageGroupe'
                    name='ageGroupe'
                    language={language}
                    options={ageOptions}
                    value={watch('ageGroupe')}
                    disabled={!watch('lessonId')}
                    error={errors?.ageGroupe?.type}
                    label={translateENtoDE('Age group', language)}
                    onChange={(value) => {
                      setValue('ageGroupe', value);
                      if (watch('lessons') === 5) {
                        setValue('lessons', 10);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {!lessonId ? (
              <div
                onClick={() => lessonHandle(false)}
                data-test={`configurator-course-info-btn-${lessonId}`}
                className={cx('mt-2 mb-2 ml-3 text-14px font-bold text-primary', {
                  'cursor-pointer': Boolean(lesson || lessonId),
                })}>
                {translateENtoDE('View course details', language)}
              </div>
            ) : (
              <div className='mb-2' />
            )}
            <p
              className={cx('mb-1 text-14px font-medium', {
                'tx-secondary': !isDurationError,
                'text-rose-600': isDurationError,
              })}>
              {translateENtoDE('Select lesson duration:', language)}
            </p>
            <div className={`grid grid-cols-${lessonsDuration.length} gap-1 mb-4`}>
              {lessonsDuration.map((item, index) => (
                <div
                  key={index}
                  name='duration'
                  data-test={`configurator-duration-${item}`}
                  onClick={() => watch('lessonId') && setValue('duration', item)}
                  className={cx('configurator-duration', {
                    'configurator-duration-active': watch('duration') === item && watch('lessonId'),
                    'configurator-duration-disabled': !watch('lessonId'),
                  })}>
                  {`${item} ${translateENtoDE('mins.', language)}`}
                </div>
              ))}
            </div>
            <TeacherConfiguratorLesson
              errors={errors}
              prices={prices}
              language={language}
              setValue={setValue}
              lessonPrice={lessonPrice}
              lessons={watch('lessons')}
              ageGroupe={ageGroupeValue}
            />
          </>
        )}
        {!!+fullPrice && (
          <div className='flex items-center justify-between mt-[12px] text-12px leading-[12px] text-[#002D3B]'>
            <p>{`${lessons} ${translateENtoDE('Lessons', language)} x CHF ${+lessonPrice?.raw_amount || 0}`}</p>
            <p className='font-bold'>CHF {fullPrice}</p>
          </div>
        )}
        {!!discount && (
          <>
            <div className='flex items-center justify-between mt-[12px] text-[#002D3B]'>
              <p className='text-12px leading-[12px]'>
                {`${translateENtoDE(
                  discount === 33 ? 'Trial subscription discount' : 'Subscription discount',
                  language
                )}
                (${discount || 0}% ${translateENtoDE('saved', language)})`}
              </p>
              <p className='text-12px leading-[12px] font-bold text-discount'>
                CHF -{fullPrice - totalPriceWithoutDiscount || 0}
              </p>
            </div>
            {discount === '33' && (
              <p className='text-[10px] mt-[6px] leading-[10px] text-[#002D3B]'>
                {translateENtoDE('* The trial subscription is only available once.', language)}
              </p>
            )}
          </>
        )}
        {!!lessonPrice?.surcharge && isSurcharge && (
          <div className='flex items-center justify-between mt-[12px] text-12px leading-[12px] text-[#002D3B]'>
            <p>{translateENtoDE('Travel surcharge', language)}</p>
            <p className='font-bold'>CHF {Math.ceil(Math.ceil(+lessonPrice?.surcharge * 1.2) * +lessons)}</p>
          </div>
        )}
        <div
          ref={totalRef}
          className={`flex items-center justify-between mt-[12px] ${
            totalPrice ? 'text-[12px]' : 'text-[17px]'
          } leading-[17px] `}>
          <p className={`text-[#002D3B] ${totalPrice ? '' : 'font-bold'}`}>
            {'Total'}
          </p>
          <p
            className={cx({
              'text-[#002D3B] font-semibold text-12px': totalPrice,
              'text-14px font-[500] tx-secondary': !totalPrice,
            })}>
            {!!+totalPrice ? `CHF ${totalPrice}` : translateENtoDE('Choose options', language)}
          </p>
        </div>
        {totalPrice ? (
          <div ref={totalRef} className={`flex items-center justify-between mt-[8px] text-[17px] leading-[17px] `}>
            <p className={`text-[#002D3B] font-bold`}>{translateENtoDE('Book today, pay later', language)}</p>
            <p
              className={cx({
                'text-[#ED6928] font-bold': totalPrice,
              })}>
              {`CHF 0*`}
            </p>
          </div>
        ) : null}
        {isFieldErrors && (
          <p className='mt-2 text-14px text-rose-600'>
            {translateENtoDE('Please fill in all required fields', language)}
          </p>
        )}
        {isSecondStepError && !geoloc && (
          <p className='mt-2 text-14px text-rose-600'>{translateENtoDE('Please select a studio address', language)}</p>
        )}
        <div className={cx({ 'h-12 mb-2': width < 768 && !isModal && isVisible })}>
          <button
            id='request-button'
            title={buttonTitle}
            disabled={isFullyBooked}
            data-test={`configurator-btn-${isFullyBooked ? 'booked' : 'checkout'}`}
            className={cx({
              'configurator-book-btn': !isFullyBooked,
              'configurator-book-btn-disabled': isFullyBooked,
            })}>
            {translateENtoDE(
              isFullyBooked ? 'Fully booked' : isSecondStep ? 'Continue to booking' : 'Continue to booking',
              language
            )}
          </button>
        </div>
        <div className='flex justify-center mt-[12px]'>
          {/* <div
            onClick={guaranteeHandle}
            data-test='configurator-trial-lesson-btn'
            className='flex items-center justify-center text-[13px] font-[600] text-[#21697C] cursor-pointer hover:text-[#004252]'>
            <ShieldIcon className='mr-[6px] mb-[2px]' />
            {translateENtoDE('Trial lesson with money-back guarantee', language)}
          </div> */}
          <BookNowCard handleOpenGuaranteeModal={guaranteeHandle} isCourseModal={true} language={language}/>
        </div>
      </div>
    </form>
  );
};

export default TeacherConfigurator;
