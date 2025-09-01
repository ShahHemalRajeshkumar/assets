import cx from 'classnames';
import Image from 'next/image';
import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { translateENtoDE, translateFieldKeyToEN } from '../../../../functions/translator';
import ChevronRightPrimary from '../../../icons/ChevronRightPrimary.svg';
import CourseInstrumentIcon from '../../../icons/CourseInstrument.svg';
import CourseLocation from '../../../icons/CourseLocation.svg';
import useWindowSize from '../../../../hooks/useWindowSize';
import PeopleIcon from '../../../icons/People.svg';

const getCourseName = (name = '', ref, windowWidth) => {
  const _name = name.trim().replace('  ', ' ');
  const width = ref?.current?.getBoundingClientRect()?.width;

  if (width && _name?.length * 8 + (windowWidth > 1100 ? 20 : 0) > width) {
    return `${_name.slice(0, Math.ceil(width / 10))}...`;
  }

  return _name;
};

const TeacherContentCoursesListItem = ({ item, teacher, language, onClick, imageSize, seoActions, courseIndex }) => {
  const titleRef = useRef(null);
  const { width } = useWindowSize();
  const [courseName, setCourseName] = useState(item?.name || '');
  const minPrice = useMemo(() => {
    return item?.prices
      ?.filter((x) => x?.product_quantity === 5 && (item?.duration ? item.duration[0] === x?.duration : true))
      ?.sort((a, b) => a?.amount - b?.amount)[0];
  }, [item]);

  const courseHandle = useCallback(() => {
    onClick();
    if (seoActions?.selectCourse) seoActions?.selectCourse(item, courseIndex, teacher);
  }, [seoActions, onClick, courseIndex, teacher, item]);

  const courseLocation = useMemo(() => {
    const data = (item?.locations || [])?.map((item) => (item === 'teacher_place' ? 'studios' : item));

    return [...new Set(data)].map((locType) => translateFieldKeyToEN(locType, language)).join('/');
  }, [item, language]);

  const updateCourseName = useCallback(() => {
    setCourseName(getCourseName(item?.name, titleRef, width));
  }, [item, width, titleRef]);

  useEffect(() => {
    window.addEventListener('resize', updateCourseName);
    updateCourseName();

    return () => {
      window.removeEventListener('resize', updateCourseName);
    };
  }, [updateCourseName]);

  return (
    <div id={`course-item-${item?.id}`} className='teacher-content-course cursor-pointer' onClick={courseHandle}>
      <div className='teacher-content-course-image-wrap'>
        {!!item?.image_path && (
          <Image
            layout='fixed'
            objectFit='cover'
            src={item?.image_path}
            width={imageSize.width}
            height={imageSize.height}
            alt={`${item?.name} course image`}
            className={cx('teacher-content-course-image', {
              'rounded-lg': !item?.is_full,
              'rounded-t-lg': !!item?.is_full,
            })}
          />
        )}
        {!!item?.is_full && (
          <div className='teacher-content-course-booked'>{translateENtoDE('Fully booked', language)}</div>
        )}
      </div>
      <div className='teacher-content-course-info'>
        <div className='w-full pt-[10px] h-[100%] flex flex-col justify-between'>
          <div>
            <p className='text-14px font-bold tx-secondary'>{translateFieldKeyToEN(item?.course_type, language)}</p>
            <h3 ref={titleRef} className='text-16px font-bold leading-4 sm:text-18px'>
              {courseName}
            </h3>
          </div>
          <div>
            <div className='flex text-14px tx-secondary'>
              <CourseInstrumentIcon className='ml-[3px] mr-[3px]' />
              <span className='ml-[10px]'>{item?.instruments[0][language === 'ch-de' ? 'de' : 'en']}</span>
            </div>
            <div className='flex items-center text-14px tx-secondary'>
              <PeopleIcon />
              <span className='ml-[10px]'>
                {item?.ages
                  ?.sort()
                  ?.map((ageItem) => translateFieldKeyToEN(ageItem, language))
                  ?.join('/')}
              </span>
            </div>
            <div className='flex text-14px tx-secondary'>
              <CourseLocation />
              <span className='ml-[10px]'>{courseLocation}</span>
            </div>
          </div>
        </div>
        <div className='min-w-[140px]'>
          <div className='teacher-content-course-price-wrapper'>
            <div className='teacher-content-course-from-wrap'>
              <p className='teacher-content-course-from'>{translateENtoDE('from', language)}</p>
              <p className='teacher-content-course-price'>{`CHF ${minPrice?.amount}`}</p>
            </div>
            <p className='teacher-content-course-lesson'>{`${minPrice?.product_quantity} ${translateENtoDE(
              'lessons of',
              language
            )} ${minPrice?.duration} ${translateENtoDE('mins.', language)}`}</p>
          </div>
          <div
            className={cx('teacher-content-course-btn font-medium', {
              'ml-[20px]': language === 'ch-en',
            })}>
            {translateENtoDE('View prices', language)}
            <ChevronRightPrimary className='ml-0.5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherContentCoursesListItem;
