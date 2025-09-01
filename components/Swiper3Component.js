import Swiper from 'swiper';
import React, { useEffect, useRef } from 'react';
import SwiperCore, { Navigation, Scrollbar, Pagination } from 'swiper/core';
import dynamic from 'next/dynamic';
import Styles from '../styles/swiper.module.scss';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));

SwiperCore.use([Navigation, Scrollbar, Pagination]);
const Swiper3Component = ({ blok }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      navigation: {
        nextEl: '.button-next3',
        prevEl: '.button-prev3',
      },
      pagination: {
        el: '.pagination',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
          width: 400,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 20,
          width: 740,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
          width: 990,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 30,
          width: 1130,
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className={`${Styles['ms-swiper']} relative sm:mx-16`}>
      <div ref={swiperRef} className='swiper-container swiperThree'>
        {blok.slides.map((slide) => (
          <div className={`swiper-wrapper ${Styles['ms-swiper-wrapper']} flex items-stretch`} key={slide._uid}>
            {slide.components.map((comp) => (
              <div className='swiper-slide' key={comp._uid}>
                <DynamicComponent blok={comp} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`swiper-button-prev button-prev3 ${Styles['ms-swiper-button-prev']}`}></div>
      <div className={`swiper-button-next button-next3 ${Styles['ms-swiper-button-next']}`}></div>
      <div className='w-full mt-4 space-x-2 swiper-pagination pagination'></div>
    </div>
  );
};

export default Swiper3Component;
