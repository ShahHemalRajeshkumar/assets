import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import LinkRoute from '@/utils/link-route';
import StoryblokService from '@/utils/storyblok-service';

const InfoCardComponent = ({ blok }) => {
    const { title, titleSuffix, subtitle, href, animatedTitle } = blok;
    const path = LinkRoute(blok);
    const countUpRef = useRef(null);
    const [countUp, setCountUp] = useState(null);
    const [isInView, setIsInView] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const cardClasses = clsx(
        'rounded-lg border p-4 flex flex-col items-center justify-center transition-shadow duration-300',
        'border-gray-300',
        { 'hover:border-gray-400': path },
        { 'shadow-md': path, 'hover:shadow-xl cursor-pointer': path }
    );

    useEffect(() => {
        const handleScroll = () => {
            if (!hasScrolled) {
                setHasScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView && hasScrolled) {
                    setIsInView(true);
                    if (countUp && animatedTitle) {
                        countUp.start();
                    }
                }
            },
            { threshold: 1 }
        );

        if (countUpRef.current) {
            observer.observe(countUpRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isInView, countUp, animatedTitle, hasScrolled]);

    useEffect(() => {
        async function createCountUpInstance() {
            if (countUpRef.current && !countUp && animatedTitle) {
                const countUpModule = await import('countup.js');
                const endVal = title ? parseFloat(title.replace(/[^\d.]/g, '')) : 0;
                const countUpInstance = new countUpModule.CountUp(countUpRef.current, endVal, { duration: 3 });
                if (!countUpInstance.error) {
                    setCountUp(countUpInstance);
                    if (isInView) {
                        countUpInstance.start();
                    }
                } else {
                    console.error(countUpInstance.error);
                }
            }
        }

        createCountUpInstance();
    }, [title, isInView, animatedTitle,countUp]);


    const cardContent = (
        <>
            <div className='text-lg flex items-center md:text-2xl font-semibold text-white'>
                {animatedTitle ? <span ref={countUpRef} className="text-3xl md:text-4xl font-bold text-primary" /> : <span className="text-3xl md:text-4xl font-bold text-primary">{title}</span>}
                {titleSuffix && <span className='ml-1 text-primary text-base md:text-lg'>{titleSuffix}</span>}
            </div>
            <h3
                className='text-black text-base md:text-lg md:max-w-[180px] text-center mt-2 font-regular'
                dangerouslySetInnerHTML={{
                    __html: StoryblokService.client.richTextResolver.render(subtitle),
                }}
            />
        </>
    );

    return (
        path ? (
            <a href={path} className={cardClasses}>
                {cardContent}
            </a>
        ) : (
            <div className={cardClasses}>
                {cardContent}
            </div>
        )
    );
};

export default InfoCardComponent;