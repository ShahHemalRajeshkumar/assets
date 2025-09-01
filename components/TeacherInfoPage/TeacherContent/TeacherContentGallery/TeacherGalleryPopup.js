import cx from 'classnames';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSnackbar } from 'react-simple-snackbar';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import TeacherGalleryPopupMobile from './TeacherGalleryPopupMobile';
import { translateENtoDE } from '../../../../functions/translator';
import TeacherGalleryPopupItem from './TeacherGalleryPopupItem';
import useWindowSize from '../../../../hooks/useWindowSize';
import ChevronLeft from '../../../icons/ChevronLeft.svg';
import { getScrollbarWidth } from '../../../../utils';
import LinkIcon from '../../../icons/CourseLink.svg';
import snackbarOptions from '../../snackbarOptions';     
import CloseIcon from '../../../icons/close.svg';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

const TeacherGalleryPopup = ({ gallery = [], teacherInfo, onClose, slideIndex = 0, language, seoActions }) => {
  const swiperRef = useRef(null);
  const { asPath } = useRouter();
  const { width } = useWindowSize();
  const [, onCopyText] = useCopyToClipboard();
  const [visible, setVisible] = useState(false);  
  const [openSnackbar] = useSnackbar(snackbarOptions);
  const [currentIndex, setCurrentIndex] = useState(slideIndex);

  const onPlay = (video) => null;

  const onSlideChange = ({ activeIndex }) => {
    setCurrentIndex(activeIndex);
    swiperRef?.current?.swiper?.slideTo(activeIndex);
  };

  const onSlideListChange = (index) => {
    setCurrentIndex(index);
    swiperRef?.current?.swiper?.slideTo(index);
  };

  const onCopyLink = useCallback(() => {
    const baseUrl = asPath.split('?')[0];
    const link = `${window.location.origin}${baseUrl}?gallery=${currentIndex || 0}`;

    onCopyText(link);
    openSnackbar(translateENtoDE('Link copied!', language));

    if (seoActions?.share) {
      seoActions?.share('link', 'gallery_item');
    }
  }, [asPath, onCopyText, openSnackbar, currentIndex, language, seoActions]);

  useEffect(() => {
    if (width > 768 && visible) setVisible(false);
    if (width <= 768 && !visible) setVisible(true);
  }, [width, visible]);

  useEffect(() => {
    setCurrentIndex(+slideIndex);
    swiperRef?.current?.swiper?.slideTo(+slideIndex);
  }, [slideIndex, swiperRef]);

  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);

 

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.setProperty('position', 'fixed', 'important');
      }, 10);
      document.body.classList.add('show-popup');
      document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);
      if (isWindows) document.body.classList.add('show-popup-window');
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.setProperty('position', 'fixed');
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    }

  
  }, [visible, isWindows]);

  if (visible) {
    return (
      <TeacherGalleryPopupMobile
        onPlay={onPlay}
        onClose={onClose}
        gallery={gallery}
        language={language}
        teacherInfo={teacherInfo}
        activeIndex={currentIndex}
        setActiveIndex={setCurrentIndex}
      />
    );
  }

  return (
    <div className='teacher-gallery-popup h-full'>
      <div className='teacher-gallery-popup-current-slide'>{`${currentIndex + 1} / ${gallery.length}`}</div>
      <div className='teacher-gallery-popup-buttons'>
        <div onClick={onCopyLink} className='teacher-gallery-popup-btn mr-4'>
          <LinkIcon color='#ffffff' />
        </div>
        <div onClick={onClose} className='teacher-gallery-popup-btn'>
          <CloseIcon color='#ffffff' />
        </div>
      </div>
      <div className='teacher-content-slider'>
        <div
          className={cx('teacher-slider-button teacher-slider-button-prev', {
            'opacity-0 cursor-default': !currentIndex,
          })}>
          <ChevronLeft color='#ffffff' />
        </div>
        <div
          className={cx('teacher-slider-button teacher-slider-button-next', {
            'opacity-0 cursor-default': currentIndex === gallery.length - 1,
          })}>
          <ChevronLeft color='#ffffff' className='slider-btn-next' />
        </div>
        <Swiper
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={onSlideChange}
          navigation={{
            prevEl: '.teacher-slider-button-prev',
            nextEl: '.teacher-slider-button-next',
          }}>
          {gallery.map((item, index) => (
            <SwiperSlide key={item.id}>
              <TeacherGalleryPopupItem
                isPlay
                item={item}
                slideIndex={index}
                activeIndex={currentIndex}
                setActiveIndex={setCurrentIndex}
                imageAlt={`${teacherInfo?.name} - Gallery - ${index + 1}`}
                onPlay={() => onPlay(item)}
                params={{
                  width: '80%',
                  height: '90%',
                  layout: 'responsive',
                  isVideo: item?.type === 'video',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='teacher-gallery-popup-slides'>
        {gallery.map((item, index) => (
          <TeacherGalleryPopupItem
            item={item}
            key={item.id * item.id}
            onPlay={() => onSlideListChange(index)}
            params={{
              width: 80,
              height: 60,
              layout: 'fixed',
              extraClass: 'mr-2',
              isVideo: item?.type === 'video',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherGalleryPopup;
