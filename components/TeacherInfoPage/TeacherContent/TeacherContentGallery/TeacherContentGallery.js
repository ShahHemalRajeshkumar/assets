import cx from 'classnames';
import React, { useRef, useState, memo, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import PlayButtonIcon from '../../../icons/PlayButton.svg';
import ChevronLeft from '../../../icons/ChevronLeft.svg';
import useBlockWidth from '../../useBlockWidth';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

function convertDriveUrl(url) {
  const match = url.match(/\/d\/([^/]+)\//);
  if (!match || !match[1]) {
    return '';
  }

  const fileId = match[1];
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`;
}

export function getGalleryImage(item) {
  if (item?.type === 'image') return item?.url;

  const youtubeMatch = item?.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return item.url;
}

function isVideo(item) {
  const url = item?.url || '';
  return item?.type === 'video' || url.includes('youtube.com') || url.includes('youtu.be');
}

SwiperCore.use([Navigation, Pagination]);

const GalleryItem = memo(({ item, index, popupHandle }) => {
  const finalImageUrl = useMemo(() => getGalleryImage(item), [item]);
  const isVideoItem = useMemo(() => isVideo(item), [item]);
  
  return (
    <div
      onClick={() => popupHandle(index)}
      className={cx(
        'teacher-content-slider-scroll-item cursor-pointer teacher-content-gallery-slide-wrapper mr-3 relative overflow-hidden rounded-lg',
        { 'mr-5': false }
      )}>
      <Image
        src={finalImageUrl}
        alt={`gallery-item-${index}`}
        width={340}
        height={200}
        className='object-cover w-full h-full'
        loading='lazy'
        quality={75}
        sizes='(max-width: 768px) 200px, 340px'
      />
      <div className='teacher-content-gallery-slide relative z-10'>
        {isVideoItem && (
          <div className='teacher-content-gallery-slide-play'>
            <PlayButtonIcon />
          </div>
        )}
      </div>
    </div>
  );
});

const TeacherContentGallery = memo(({ gallery = [], showPopup, organizationGalleryClass = '' }) => {
  const ref = useRef();
  const { blockWidth } = useBlockWidth(ref, 'swiper');
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChange = ({ activeIndex }) => {
    setCurrentIndex(activeIndex);
  };

  const popupHandle = (index) => {
    showPopup('gallery', { slideIndex: index });
  };

  return (
    <div ref={ref}>
      {!!blockWidth && (
        <div className='teacher-content-slider teacher-content-slider-gallery '>
          <div className={`teacher-content-slider-scroll-wrapper ${organizationGalleryClass}`}>
            <div className='teacher-content-slider-scroll scrollbarHidden'>
              {gallery.slice(0, 6).map((item, index) => (
                <GalleryItem
                  key={item?.id || index}
                  item={item}
                  index={index}
                  popupHandle={popupHandle}
                />
              ))}
            </div>
          </div>
          <div className='teacher-content-slider-scroll-hidden '>
            <div
              className={cx('teacher-slider-button teacher-slider-button-prev', {
                'opacity-0 cursor-default': !currentIndex,
              })}>
              <ChevronLeft color='#ffffff' />
            </div>
            <div
              className={cx('teacher-slider-button teacher-slider-button-next', {
                'opacity-0 cursor-default': currentIndex === gallery.length - 2,
              })}>
              <ChevronLeft color='#ffffff' className='slider-btn-next' />
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              onSlideChange={onSlideChange}
              navigation={{
                prevEl: '.teacher-slider-button-prev',
                nextEl: '.teacher-slider-button-next',
              }}
              style={{ maxWidth: `${blockWidth}px` }}>
              {gallery.slice(0, 8).map((item, index) => {
                const finalImageUrl = getGalleryImage(item);
                return (
                  <SwiperSlide
                    key={item?.id || index}
                    onClick={() => popupHandle(index)}
                    className='teacher-content-gallery-slide-wrapper cursor-pointer'
                    style={{ width: '340px', marginRight: '10px' }}>
                    <div className='teacher-content-gallery-slide h-full'>
                      <div className='relative w-full h-full rounded-[12px] overflow-hidden'>
                        <Image
                          src={finalImageUrl}
                          alt={`gallery-item-${index}`}
                          width={340}
                          height={200}
                          className='object-cover w-full h-full'
                          loading='lazy'
                          quality={75}
                          sizes='340px'
                        />
                      </div>
                      {isVideo(item) && (
                        <div className='teacher-content-gallery-slide-play'>
                          <PlayButtonIcon />
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
});

export default TeacherContentGallery;