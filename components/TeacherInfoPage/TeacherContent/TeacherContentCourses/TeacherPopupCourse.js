import cx from 'classnames';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useMemo, useRef } from 'react';
import { sortSkillLevels } from '../../../../utils/teacherInfo';
import { translateENtoDE, translateFieldKeyToEN } from '../../../../functions/translator';
import TeacherConfigurator from '../../TeacherConfigurator/TeacherConfigurator';
import TeacherInfoBlock from '../../TeacherConfigurator/TeacherInfoBlock';
import CourseInstrumentIcon from '../../../icons/CourseInstrument.svg';
import CourseLocation from '../../../icons/CourseLocation.svg';
import CourseLevelIcon from '../../../icons/CourseLevel.svg';
import useWindowSize from '../../../../hooks/useWindowSize';
import CourseTimeIcon from '../../../icons/CourseTime.svg';
import PeopleIcon from '../../../icons/People.svg';
import ShowMoreText from '../../ShowMoreText';

const TeacherPopupCourse = ({
  teacher,
  language,
  showPopup,
  hidePopup,
  seoActions,
  courseIndex,
  course = {},
  courseParams,
  isConfigurator,
  isMobileOnClose,
}) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const { width } = useWindowSize();
  const rowLineClasses = 'flex text-14px font-medium mb-[16px] tx-primary';
  useEffect(() => {
    if (seoActions?.viewCourseModal) {
      seoActions?.viewCourseModal(course, courseIndex, teacher);
    }
  }, [seoActions, course, teacher, courseIndex]);

  useEffect(() => {
    if (wrapperRef?.current && isMobileOnClose) {
      if (wrapperRef?.current?.scrollTop === 0) {
        wrapperRef.current.scrollTop = wrapperRef?.current?.scrollHeight || 0;
      }
    }
  }, [wrapperRef, isMobileOnClose]);

  const courseLocations = useMemo(() => {
    const data = (course?.locations || [])?.map((item) => (item === 'teacher_place' ? 'studios' : item));

    return [...new Set(data)].map((locType) => translateFieldKeyToEN(locType, language)).join(' / ');
  }, [course, language]);

  return (
    <div ref={wrapperRef} id={`course-popup-${course?.id}`} className='teacher-page-popup-course'>
      <h3 className={cx('text-24px leading-[24px] font-bold mb-3')}>{course?.name}</h3>
      <div ref={contentRef} className={cx({ 'teacher-page-popup-course-grid': isConfigurator })}>
        <div>
          <div
            className={cx({
              'flex flex-col': isConfigurator,
              'teacher-page-popup-course-content': !isConfigurator,
            })}>
            <div className='relative overflow-hidden'>
              {!!course?.image_path && (
                <Image
                  layout='fixed'
                  objectFit='cover'
                  className='rounded-lg'
                  src={course?.image_path}
                  alt={`${course?.name} course image`}
                  height={isConfigurator ? (width < 500 ? 234 : 220) : 170}
                  width={isConfigurator ? (width < 500 ? window.innerWidth - 30 : 340) : 254}
                />
              )}
              {!isConfigurator && !!course?.is_full && (
                <div
                  style={{ width: `${isConfigurator ? (width < 500 ? 280 : 350) : 250}px` }}
                  className='teacher-content-course-booked'>
                  {translateENtoDE('Fully booked', language)}
                </div>
              )}
            </div>
            <div
              className={cx('teacher-page-popup-course-icons', {
                'mt-3': isConfigurator,
              })}>
              {width < 768 && !course?.is_full && isConfigurator && (
                <div
                  onClick={() => {
                    contentRef?.current?.scrollIntoView({ block: 'end' });
                    if (isMobile) document.body.classList.add('session-view');
                  }}
                  className={cx('configurator-book-btn', { 'max-w-[340px]': width > 499 })}>
                  {translateENtoDE('Configure session', language)}
                </div>
              )}
              <div className={rowLineClasses}>
                <CourseInstrumentIcon className='mr-3' />
                {course?.instruments[0][language === 'ch-de' ? 'de' : 'en']}
              </div>
              <div className={rowLineClasses}>
                <CourseLocation className='mr-2' />
                {courseLocations}
              </div>
              <div className={rowLineClasses}>
                <CourseTimeIcon className='mr-2 ml-0.5' />
                {course?.durations?.join(` ${translateENtoDE('mins.', language)} / `)}
                {` ${translateENtoDE('mins.', language)}`}
              </div>
              <div className={rowLineClasses}>
                <PeopleIcon className='mr-2' />
                {course?.ages
                  ?.sort()
                  ?.map((ageItem) => translateFieldKeyToEN(ageItem, language))
                  ?.join(' / ')}
              </div>
              <div className='flex text-14px font-medium tx-primary'>
                <CourseLevelIcon className='mr-2' />
                {sortSkillLevels(course?.skill_levels)
                  ?.map((ageItem) => translateFieldKeyToEN(ageItem, language))
                  ?.join(' / ')}
              </div>
            </div>
          </div>
          <div
            className={cx('mt-[20px] mb-[20px]', {
              // 'bg-yellow-200 rounded-2xl p-2 pt-3': course?.is_full,
            })}>
            <TeacherInfoBlock
              course={course}
              teacher={teacher}
              language={language}
              isCoursePopup={true}
              showPopup={showPopup}
              contactInfoRef={null}
              isConfigurator={isConfigurator}
            />
          </div>
          <p className='text-14px font-bold mb-1'>{translateENtoDE('About this course', language)}</p>
          <ShowMoreText
            maxLength={250}
            language={language}
            text={course?.description}
            textClasses='teacher-content-course-description'
            showButtonLabel={translateENtoDE('Show more', language)}
          />
        </div>
        {!!isConfigurator && (
          <TeacherConfigurator
            course={course}
            teacher={teacher}
            language={language}
            isCoursePopup={true}
            hidePopup={hidePopup}
            showPopup={showPopup}
            lessonId={course?.id}
            seoActions={seoActions}
            courseParams={courseParams}
            isBooked={!!course?.is_full}
          />
        )}
        {width < 768 && <div className='mb-[80px]' />}
      </div>
    </div>
  );
};

export default TeacherPopupCourse;
