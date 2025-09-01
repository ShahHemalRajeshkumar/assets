import cx from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { offers, firstOffer, guitarOffer, keyboardOffer, pianoOffer } from './offersInfo';
import { translateENtoDE } from '../../functions/translator';
import ChevronLeft from '../icons/ChevronLeft.svg';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

const OurOffersComponent = ({ instrument, language = 'ch-en', locationGeo, seoActions }) => {
  const [seoInit, setSeoInit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChange = ({ activeIndex }) => {
    setCurrentIndex(activeIndex);
  };

  const openOfferHandle = useCallback(
    (url, item, index) => {
      window && window.open(url, '_blank').focus();

      if (seoActions?.selectPromotion) {
        seoActions?.selectPromotion(item, index);
      }
    },
    [seoActions]
  );

  const offersData = useMemo(() => {
    const isPiano = ['piano'].includes(instrument?.key); // Winti-Piano.ch
    const isKeyboard = ['keyboard'].includes(instrument?.key); // Winti-Piano.ch
    const isGuitar = ['guitar', 'ukulele', 'electric_guitar'].includes(instrument?.key); //  MyGuitar.ch

    return [
      ...firstOffer[language],
      ...(isPiano ? pianoOffer[language] : []),
      ...(isKeyboard ? keyboardOffer[language] : []),
      ...(isGuitar ? guitarOffer[language] : []),
      ...offers[language],
    ];
  }, [language, instrument]);

  useEffect(() => {
    if (seoActions?.viewPromotion && !seoInit && locationGeo) {
      seoActions?.viewPromotion(offersData);
      setSeoInit(true);
    }
  }, [seoActions, locationGeo, offersData, seoInit]);

  return (
    <div className='our-offers our-offers-scroll-slider overflow-hidden'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-20px font-bold'>{translateENtoDE('Our Offers', language)}</h2>
        {offersData?.length > 1 && (
          <div className='flex our-offers-arrows-hidden'>
            <ChevronLeft
              color={!currentIndex ? '#5C6471' : '#21697C'}
              className={cx('offer-button-prev mr-8 cursor-pointer transition hover:animate-pulse', {
                'disabled-chevron-arrow': !currentIndex,
              })}
            />
            <ChevronLeft
              color={currentIndex === offersData.length - 2 ? '#5C6471' : '#21697C'}
              className={cx('offer-button-next transform rotate-180 cursor-pointer transition hover:animate-pulse', {
                'disabled-chevron-arrow': currentIndex === offersData.length - 2,
              })}
            />
          </div>
        )}
      </div>
      <div className='our-offers-scroll-wrapper'>
        <div className='our-offers-scroll'>
          {offersData.map((item, index) => (
            <div
              key={item?.promotion_id}
              onClick={() => openOfferHandle(item.target_url, item, index)}
              className={cx('our-offers-scroll-item our-offers-slider-item mr-3', {
                'our-offers-scroll-item-last': index === offersData.length - 1,
              })}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
      </div>
      <div className='our-offers-scroll-hidden'>
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          onSlideChange={onSlideChange}
          navigation={{
            prevEl: '.offer-button-prev',
            nextEl: '.offer-button-next',
          }}>
          {offersData.map((item, index) => (
            <SwiperSlide
              id={item?.promotion_id}
              key={item?.promotion_id}
              className='our-offers-slider-item'
              onClick={() => openOfferHandle(item.target_url, item, index)}
              style={{
                height: '100% !important',
                maxHeight: '190px',
                backgroundImage: `url(${item.image})`,
              }}
            />
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurOffersComponent;
