import React, { useEffect, useState } from 'react';
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import { useMediaQuery } from 'react-responsive';
import 'react-multi-carousel/lib/styles.css';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import dynamic from 'next/dynamic';

SwiperCore.use([Navigation, Pagination]);

const MobileSwiperComponent = ({ blok }) => {
  const mobile = useMediaQuery({ maxWidth: 599 });
  const tab = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  const smallLaptop = useMediaQuery({ minWidth: 960, maxWidth: 1279 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1439 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const extraLargeLaptop = useMediaQuery({ minWidth: 1920, maxWidth: 5000 });
  const [showPagination, setShowPagination] = useState(false);
  const [slidePerView, setSlidePerView] = useState(1);

  const device = [
    { xs: mobile },
    { sm: tab },
    { md: smallLaptop },
    { lg: medLaptop },
    { xl: largeLaptop },
    { xxl: extraLargeLaptop },
  ].find((value) => {
    if (Object.values(value)[0]) {
      return value;
    }
  });
  const dev = device ? Object.keys(device) : 'xs';
  const slidePerViews = {
    xs: blok.slidesPerView,
    sm: 2,
    md: 2.2,
  };

  useEffect(() => {
    setSlidePerView(+slidePerViews[dev[0]]);
    setShowPagination(
      (dev[0] === 'xs' && blok.paginationNeeded && blok.mobile_show) || (dev[0] !== 'xs' && blok.paginationNeeded)
    );
  }, [blok.paginationNeeded, blok.mobile_show]);

  return (
    <Swiper
      className='lg:hidden h-96'
      pagination={showPagination && { clickable: true }}
      slidesPerView={slidePerView}
      navigation={blok.arrow && true}
      spaceBetween={10}>
      {blok.components?.map((slide) =>
        slide.components?.map((comp, index) => (
          <SwiperSlide key={comp._uid} className='pb-6'>
            <DynamicComponent blok={comp} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};
export default MobileSwiperComponent;
