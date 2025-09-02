import cx from 'classnames';
import Image from 'next/image';
import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { translateENtoDE, translateFieldKeyToEN } from '../../../functions/translator';
import ChevronRightPrimary from '../../icons/ChevronRightPrimary.svg';
import useWindowSize from '../../../hooks/useWindowSize';
import SmallClock from '../../../components/icons/SmallClock';
import SmallProfile from '../../../components/icons/SmallProfile';
import SmallMusic from '../../../components/icons/SmallMusic';
import { getKidsAndAdultsLabel } from '../commonComponent/getKidsAndAdultsLabel';
import { formatPrice } from '../commonComponent/formatPrice';
import { desktopPriceCard } from '../commonComponent/desktopPriceCard';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

function useDebouncedEffect(effect, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
}
const getCourseName = (name = '', ref, windowWidth) => {
  const _name = name.trim().replace('  ', ' ');
  const width = ref?.current?.getBoundingClientRect()?.width;
  if (width && _name?.length * 8 + (windowWidth > 1100 ? 20 : 0) > width) {
    return `${_name.slice(0, Math.ceil(width / 10))}...`;
  }
  return _name;
};

const CourseCard = React.memo(({ item, teacher, language, onClick, imageSize, seoActions, courseIndex }) => {
  const titleRef = useRef(null);
  const { width } = useWindowSize();
  const [courseName, setCourseName] = useState(item?.name || '');
  const { courseCategoriesData } = useSchoolPage();

  const courseHandle = useCallback(() => {
    onClick();
    if (seoActions?.selectCourse) seoActions?.selectCourse(item, courseIndex, teacher);
  }, [seoActions, onClick, courseIndex, teacher, item]);
  const updateCourseName = useCallback(() => {
    setCourseName(getCourseName(item?.name, titleRef, width));
  }, [item, width]);

  useDebouncedEffect(() => {
    updateCourseName();
  }, [updateCourseName], 200);

  const lowestAndHighest = useMemo(() => {
    const prices = item?.prices;
    if (!prices || prices.length === 0) return [];
    if (prices.length === 1) return [prices[0]];
    const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
    return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
  }, [item?.prices]);

  const sortedDurations = useMemo(() => {
    return item?.durations?.length ? [...item?.durations].sort((a, b) => a - b) : [];
  }, [item?.durations]);

  const category = courseCategoriesData?.find((category) => category?.id == item?.mzo_course_category_id);

  return (
    <div
      id={`course-item-${item?.id}`}
      className="grid smd:grid-cols-[0.8fr_2fr] w-full gap-3 lg:gap-6 border-0 sm:border border-[#d0d5dd] rounded-lg sm:pl-3 pr-3 lg:pr-5 py-4 cursor-pointer"
      onClick={courseHandle}
    >

      <div className="w-full max-w-full smd:max-w-[240px]">
        <div className="w-full smd:max-w-[240px] h-[190px] lg:h-[160px] relative overflow-hidden rounded-lg">
          {item?.instrument?.image_url ? (
            <Image
              src={item?.instrument?.image_url}
              alt={`${item?.name} course image`}
              width={240}
              height={160}
              sizes="(max-width: 640px) 100vw, 240px"
              quality={70} 
              loading="lazy" 
              placeholder="blur"
              blurDataURL="/placeholder-course.jpg"
              className="!w-full !h-full object-cover rounded-lg"
            />
          ) : (
            <div className="rounded-lg w-full h-[182px] bg-gray-200"></div>
          )}
          {!!item?.is_full && (
            <div className="teacher-content-course-booked">
              {translateENtoDE('Fully booked', language)}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col justify-between">
        <div>
          <p className="text-[14px] font-semibold mb-1">
            {category?.type_name[language === 'ch-en' ? 'en' : 'de']}
          </p>
          <h3 ref={titleRef} className="text-[17px] font-bold leading-[129%]">
            {language === 'ch-en' ? item?.title.en : item?.title?.de}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {item?.instrument && (
              <div className="flex items-center gap-1 py-1 px-2 bg-[#F2F4F7] rounded">
                <SmallMusic className="w-5 h-5" />
                <span className="text-[12px] lg:text-[14px]">{language === 'ch-en' ? item?.instrument?.en : item?.instrument?.de}</span>
              </div>
            )}
            {item?.age_groups?.length > 0 && (
              <div className="flex items-center gap-1 py-1 px-2 bg-[#F2F4F7] rounded">
                <SmallProfile className="w-5 h-5" />
                <span className="text-[12px] lg:text-[14px]">
                  {item?.age_groups
                    ?.sort()
                    ?.map((ageItem) => translateFieldKeyToEN(ageItem, language))
                    ?.join('/')}
                </span>
              </div>
            )}
            {sortedDurations.length > 0 && (
              <div className="flex items-center gap-1 py-1 px-2 bg-[#F2F4F7] rounded">
                <SmallClock className="w-5 h-5" />
                <span className="text-[12px] lg:text-[14px]">
                  {sortedDurations.length > 1
                    ? `${sortedDurations[0]}-${sortedDurations[sortedDurations.length - 1]}`
                    : `${sortedDurations[0]}`} {translateENtoDE('mins.', language)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-end justify-between mt-3">
          <div>
            {(item?.min_prices?.kids?.price || item?.min_prices?.adults?.price) && (
              <div>
                <h6 className="text-[12px] font-semibold">
                  {translateENtoDE('Starting from', language) + ':'}
                </h6>
                <div className="flex gap-3 mt-2">
                  {item?.min_prices?.kids?.price && (
                    <div>
                      {desktopPriceCard(item?.min_prices?.kids, lowestAndHighest[0], language)}
                    </div>
                  )}
                  {item?.min_prices?.adults?.price && (
                    <div>
                      {desktopPriceCard(item?.min_prices?.adults, lowestAndHighest[1], language)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div
            className={cx(
              'font-medium flex items-center justify-center border border-[#21697C] rounded-full py-1.5 px-3 max-w-[155px] cursor-pointer hover:bg-[#21697C]/10',
              'text-[12px] lg:text-[14px] uppercase text-[#21697C]'
            )}
          >
            {translateENtoDE('MORE DETAILS', language)}
            <ChevronRightPrimary className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
});
export default CourseCard;
