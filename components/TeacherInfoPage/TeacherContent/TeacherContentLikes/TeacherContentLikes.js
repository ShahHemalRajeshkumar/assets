import cx from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import React, { useRef, useMemo, useState, useCallback } from 'react';
import TeacherContentLikeItem from './TeacherContentLikeItem';
import useWindowSize from '../../../../hooks/useWindowSize';
import ChevronLeft from '../../../icons/ChevronLeft.svg';
import useBlockWidth from '../../useBlockWidth';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

const TeacherContentLikes = ({ popupLabel = '', likes = [], language, showPopup, isStorybook }) => {
  const ref = useRef();
  const { width } = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { blockWidth } = useBlockWidth(ref, isStorybook ? 'storybook' : 'swiper');

  const onShowPopup = useCallback(() => {
    if (showPopup && popupLabel) {
      showPopup('likes', {
        title: popupLabel,
      });
    }
  }, [popupLabel, showPopup]);

  const onSlideChange = ({ activeIndex }) => {
    setCurrentIndex(activeIndex);
  };

  const params = useMemo(
    () => ({
      slidesPerView: width > (isStorybook ? 1000 : 800) ? (isStorybook ? (width < 1200 ? 3 : 4) : 3) : 2,
      sliderStyles: {
        width: '50%',
        maxWidth: `${
          blockWidth / (width > (isStorybook ? 1000 : 800) ? (isStorybook ? (width < 1200 ? 3 : 4) : 3) : 2) - 10
        }px`,
      },
    }),
    [width, blockWidth, isStorybook]
  );

  const arrows = useMemo(
    () => ({
      isFirst: !currentIndex,
      isLast:
        currentIndex ===
        likes.length - (width > (isStorybook ? 1000 : 800) ? (isStorybook ? (width < 1200 ? 3 : 4) : 3) : 2),
    }),
    [currentIndex, likes, width, isStorybook]
  );

  const sorted = useMemo(() => {
    return likes?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
  }, [likes]);

  return (
    <div ref={ref}>
      {!!blockWidth && (
        <div className='teacher-content-slider teacher-content-slider-likes'>
          <div className='teacher-content-slider-scroll-wrapper'>
            <div className='teacher-content-slider-scroll pr-2'>
              {sorted.map((item, index) => (
                <div
                  key={index}
                  className={cx('teacher-content-slider-scroll-item mr-3', {
                    'mr-4': index === likes.length - 1,
                  })}>
                  <TeacherContentLikeItem info={item} language={language} onShowPopup={onShowPopup} />
                </div>
              ))}
            </div>
          </div>
          <div className='teacher-content-slider-scroll-hidden'>
            <div className={cx('teacher-content-slider-buttons-top', { 'mr-[15px]': !!isStorybook })}>
              <ChevronLeft
                color={arrows.isFirst ? '#5C6471' : '#21697C'}
                className={cx('likes-btn-prev mr-8 cursor-pointer transition hover:animate-pulse', {
                  'disabled-chevron-arrow': arrows.isFirst || likes?.length < (isStorybook ? 4 : 3),
                  'opacity-0': likes?.length < (isStorybook ? 4 : 3),
                })}
              />
              <ChevronLeft
                color={arrows.isLast ? '#5C6471' : '#21697C'}
                className={cx('likes-btn-next transform rotate-180 cursor-pointer transition hover:animate-pulse', {
                  'disabled-chevron-arrow': arrows.isLast || likes?.length < (isStorybook ? 4 : 3),
                  'opacity-0': likes?.length < (isStorybook ? 4 : 3),
                })}
              />
            </div>
            <Swiper
              spaceBetween={10}
              onSlideChange={onSlideChange}
              slidesPerView={params.slidesPerView}
              style={{
                width: `100%`,
                maxWidth: `${blockWidth}px`,
              }}
              navigation={{
                prevEl: '.likes-btn-prev',
                nextEl: '.likes-btn-next',
              }}>
              {sorted.map((item, index) => (
                <SwiperSlide key={index} style={params.sliderStyles}>
                  <TeacherContentLikeItem info={item} language={language} onShowPopup={onShowPopup} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherContentLikes;
