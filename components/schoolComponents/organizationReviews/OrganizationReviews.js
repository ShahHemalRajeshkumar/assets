import EmbedSocialReviewComponent from '@/components/EmbedSocialReviewComponent';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper'; // ✅ Corrected Import
import 'swiper/swiper-bundle.min.css';
import ArrowLeft from '@/components/icons/ArrowLeft';

function OrganizationReviews({ reviews, language }) {
  const [showNav, setShowNav] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setShowNav(reviews.length > 3);
  }, [reviews]);
  return (
    <div className='relative  z-1'>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
            768:{
                slidesPerView:2
            },
            1200:{
                slidesPerView:3
            }
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className='reviws-slider !pb-2'>
        {reviews.map(({ name, image, date, review, source, rating }, index) => {
          return (
            <SwiperSlide key={index}>
              <div className='bg-white border-[1px] border-gray-300 rounded-xl p-4 text-center flex flex-col items-center h-full  w-full max-w-[280px] sm:max-w-full mx-auto'>
                <img src={image} alt={name} className='w-full max-w-[60px] h-[60px] rounded-full object-cover' />
                <h3 className='font-semibold text-[16px] leading-[110%] mt-1'>{name}</h3>
                <p className='text-gray-500 text-[14px]'>{date}</p>
                <div className='flex justify-center gap-1 my-2'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill='currentColor'
                      viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.628 5.03h5.286c.969 0 1.371 1.24.588 1.81l-4.282 3.117 1.628 5.03c.3.921-.755 1.688-1.544 1.117L10 15.347l-4.256 3.684c-.79.57-1.845-.196-1.545-1.117l1.628-5.03-4.282-3.117c-.784-.57-.38-1.81.588-1.81h5.286l1.63-5.03z' />
                    </svg>
                  ))}
                </div>
                <p className='text-gray-700 text-[14px] mt-1 leading-[120%]'>{review}</p>
                <div className='mt-3 w-full max-w-[25px]'>
                  <Image src='/assets/images/google.webp' alt='Google' width={30} height={30} className='w-[25px] h-[25px]' />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showNav && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='absolute left-4  sm:-left-4 top-1/2 -translate-y-1/2 z-10 border-[1px] border-gray-300 bg-white p-2 rounded-full shadow-md  transition-all'>
            <ArrowLeft className=' w-[20px] h-[20px]' />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='absolute right-4 sm:-right-4 top-1/2 -translate-y-1/2 z-10 border-[1px] border-gray-300 bg-white p-2 rounded-full shadow-md  transition-all'>
            <ArrowLeft className=' w-[20px] h-[20px] rotate-180' />
          </button>
        </>
      )}
    </div>
  );
}

export default OrganizationReviews;
