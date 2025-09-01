import React, { useState, useEffect } from 'react';
import DynamicComponent from './DynamicComponent';
import useWindowSize from '../hooks/useWindowSize';
import clsx from 'clsx';
import LinkRoute from '@/utils/link-route';

const MOBILE_WIDTH_THRESHOLD = 768;
const DEFAULT_VISIBLE_ITEMS_MOBILE = 4;
const DEFAULT_VISIBLE_ITEMS_DESKTOP = 9;

const InfoCardSection = ({ blok }) => {
    const { width } = useWindowSize();
    const { body, linkLabel, initialVisibleItemsMobile, initialVisibleItemsDesktop, buttonLabel } = blok;

    const [visibleItems, setVisibleItems] = useState(initialVisibleItemsDesktop || DEFAULT_VISIBLE_ITEMS_DESKTOP);
    const [userHasLoadedMore, setUserHasLoadedMore] = useState(false);

    useEffect(() => {
        if (!userHasLoadedMore) {
            const isMobile = width <= MOBILE_WIDTH_THRESHOLD;
            const newVisibleItems = isMobile
                ? initialVisibleItemsMobile || DEFAULT_VISIBLE_ITEMS_MOBILE
                : initialVisibleItemsDesktop || DEFAULT_VISIBLE_ITEMS_DESKTOP;
            if (visibleItems !== newVisibleItems) {
                setVisibleItems(newVisibleItems);
            }
        }
    }, [width, initialVisibleItemsMobile, initialVisibleItemsDesktop, visibleItems, userHasLoadedMore]);

    const loadMoreItems = () => {
        setVisibleItems(body.length);
        setUserHasLoadedMore(true);
    };

    const path = LinkRoute(blok);

    return (
        <>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-x-12 '>
                {body.map((component, index) => (
                    <div key={component._uid} className={clsx('dynamic-component-wrapper', index >= visibleItems && 'hidden')}>
                        <DynamicComponent blok={component} />
                    </div>
                ))}
            </div>
            {visibleItems < body.length && (
                <div className='w-full text-center'>
                    <button
                        type='button'
                        onClick={loadMoreItems}
                        className='inline-block my-8 font-bold text-18px text-primary outline-visible rounded-md'>
                        {buttonLabel}
                    </button>
                </div>
            )}
            {path && linkLabel && (
                <div className='w-full text-center'>
                    <a
                        href={path}
                        className='inline-block primary bg-primary px-11 py-3 rounded-full hover:bg-dark-primary mt-10 outline-visible'>
                        <span className='font-medium text-white text-16px'>{linkLabel}</span>
                    </a>
                </div>
            )}
        </>
    );
};

export default InfoCardSection;
