import React, { useRef, useState, useEffect, useCallback } from 'react';
import UserProfileCard from './UserProfileCard';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation } from 'swiper';
import LinkRoute from '@/utils/link-route';
import { isExternalLink } from '@/utils/isExternalLink';

import clsx from 'clsx';

import { IconComponent } from './IconComponent/IconComponent';

SwiperCore.use([Navigation]);

const UserProfileSection = ({ blok }) => {
    const { body, link, linkLabel } = blok;
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [showNavigation, setShowNavigation] = useState(true);

    const path = LinkRoute({ link: link })

    const updateButtonStates = useCallback(() => {
        if (swiperRef.current) {
            setIsBeginning(swiperRef.current.isBeginning);
            setIsEnd(swiperRef.current.isEnd);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            updateButtonStates();
        };

        window.addEventListener('resize', handleResize);
        updateButtonStates();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [updateButtonStates]);

    useEffect(() => {
        const checkSlidesPerView = () => {
            const breakpoints = {
                640: 3,
                1140: 4,
            };

            const windowWidth = window.innerWidth;

            let maxSlidesPerView = 1;

            Object.keys(breakpoints).forEach((breakpoint) => {
                if (windowWidth >= breakpoint) {
                    maxSlidesPerView = breakpoints[breakpoint];
                }
            });

            setShowNavigation(body.length > maxSlidesPerView);
        };

        checkSlidesPerView();

        window.addEventListener('resize', checkSlidesPerView);

        return () => {
            window.removeEventListener('resize', checkSlidesPerView);
        };
    }, [body.length]);

    const handlePrevClick = useCallback(() => {
        swiperRef.current.slidePrev();
    }, []);

    const handleNextClick = useCallback(() => {
        swiperRef.current.slideNext();
    }, []);

    const commonButtonClasses =
        'absolute top-[-60px] z-10 text-primary m-2 cursor-pointer [&>*]:w-12 [&>*]:h-12 [&>svg>g>path]:fill-dark-primary';

    return (
        <section className={clsx('pt-10', showNavigation && 'md:pt-10', !showNavigation && 'md:pt-0')}>
            <div className='relative'>
                {showNavigation && (
                    <>
                        <button
                            aria-label='Go to previous slide'
                            onClick={handlePrevClick}
                            className={clsx(
                                commonButtonClasses,
                                'right-14',
                                isBeginning && 'opacity-50 cursor-not-allowed',
                                !isBeginning && 'outline-visible'
                            )}
                            disabled={isBeginning}>
                            <IconComponent icon='arrowLeft' />
                        </button>
                        <button
                            aria-label='Go to next slide'
                            onClick={handleNextClick}
                            className={clsx(
                                commonButtonClasses,
                                'right-0',
                                isEnd && 'opacity-50 cursor-not-allowed',
                                !isEnd && 'outline-visible'
                            )}
                            disabled={isEnd}>
                            <IconComponent icon='arrowRight' />
                        </button>
                    </>
                )}
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        updateButtonStates();
                    }}
                    onSlideChange={() => updateButtonStates()}
                    slidesPerView={1}
                    spaceBetween={15}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1140: {
                            slidesPerView: 4,
                        },
                    }}>
                    {body.map((card) => (
                        <SwiperSlide key={card._uid}>
                            <UserProfileCard {...card} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {path && linkLabel && (
                <div className='w-full text-center'>
                    {isExternalLink(path) ? (
                        <a href={path} className='inline-block my-8 font-bold text-lg text-primary outline-visible rounded-md' target="_blank" rel="noopener noreferrer">{linkLabel}</a>
                    ) : (
                        <Link href={path}>
                            <a className='inline-block my-8 font-bold text-lg text-primary outline-visible rounded-md'>{linkLabel}</a>
                        </Link>
                    )}
                </div>
            )}
        </section>
    );
};

export default UserProfileSection;
