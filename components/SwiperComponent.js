import React from 'react';
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import SwiperCore, { Navigation } from 'swiper';
import Styles from '../styles/swiper.module.scss';
SwiperCore.use([Navigation]);

const SwiperComponent = ({ blok }) => {
  return (
    <Swiper
      watchOverflow={true}
      pagination={{ clickable: true }}
      navigation={{
        prevEl: '.ms-button-prev1',
        nextEl: '.ms-button-next1',
      }}>
      {blok.slides.map((slide) =>
        slide.components.map((comp) => (
          <SwiperSlide key={comp._uid} className='px-6 py-12 lg:p-12'>
            <DynamicComponent blok={comp} />
          </SwiperSlide>
        ))
      )}
      <div className={`swiper-button-prev ms-button-prev1 ${Styles['ms-button-prev1']}`} />
      <div className={`swiper-button-next ms-button-next1 ${Styles['ms-button-next1']}`} />
    </Swiper>
  );
};
export default SwiperComponent;
