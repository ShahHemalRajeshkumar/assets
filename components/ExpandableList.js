import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconComponent } from './IconComponent/IconComponent';
import useWindowSize from '../hooks/useWindowSize';
import LinkRoute from '@/utils/link-route';

import Link from 'next/link';
import styles from '../styles/headings.module.scss';

const ExpandableList = ({ blok }) => {
    const { title, titleURL, body, icon, isAccordionOnMobile, isAccordionOnDesktop, link } = blok;
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const path = LinkRoute({ link: titleURL })

    const isAccordion = title && ((isMobile && isAccordionOnMobile) || (!isMobile && isAccordionOnDesktop));

    const [expanded, setExpanded] = useState(!isAccordion || !title);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setExpanded(!isAccordion || !title);
    }, [isAccordion, title]);

    const toggleExpand = () => {
        if (isAccordion) {
            if (!expanded) {
                setOpacity(0);
                setTimeout(() => {
                    setExpanded(true);
                    setTimeout(() => setOpacity(1), 10);
                }, 10);
            } else {
                setOpacity(0);
                setTimeout(() => setExpanded(false), 700);
            }
        }
    };

    const listTransitionClass = expanded
        ? 'max-h-[2000px] opacity-100 transition-opacity duration-700 ease-in-out transition-max-height duration-700 ease-in-out'
        : 'max-h-0 opacity-0 overflow-hidden transition-opacity duration-700 ease-in-out transition-max-height duration-700 ease-in-out';

    return (
        <div className='rounded-lg overflow-hidden'>
            {title && (
                <div
                    onClick={toggleExpand}
                    className={`text-4xl flex justify-between font-semibold py-4 ${isAccordion ? 'cursor-pointer' : 'cursor-default'
                        }`}>
                    <div className='flex gap-4 items-center'>
                        {icon && <IconComponent icon={icon} className='text-gray-500' />}
                        {path ? (
                            <Link href={path}>
                                <a className='no-underline text-black hover:text-primary'>
                                    <h2 className={clsx(styles['h-2'], 'md:!text-[30px] lg:!text-[30px]')}>{title}</h2>
                                </a>
                            </Link>
                        ) : (
                            <h2 className={clsx(styles['h-2'], 'md:!text-[30px] lg:!text-[30px]')}>{title}</h2>
                        )}
                    </div>
                    <div className='flex justify-center items-center'>
                        {isAccordion && (
                            <div className={clsx('transition-transform duration-500', expanded ? 'rotate-90' : '-rotate-90')}>
                                <IconComponent icon='arrowLeft' />
                            </div>
                        )}
                    </div>
                </div>
            )}
            <ul className={`list-none ${listTransitionClass}`} style={{ opacity: opacity }}>
                {body?.map((item, index) => {
                    const blank = item.link?.target === '_blank';
                    const preparedLink = {
                        link: item.link,
                    };
                    const path = LinkRoute(preparedLink);

                    let linkElement;
                    if (path) {
                        const linkClasses = clsx(
                            `flex items-center focus-visible:bg-gray-100 py-2 ${index === 0 ? '' : 'border-t border-gray-200'}`,
                            'hover:bg-gray-100'
                        );

                        linkElement = blank ? (
                            <a href={path} target='_blank' rel='noopener noreferrer' className={linkClasses}>
                                {item.icon && (
                                    <div className='mr-2 [&>svg]:max-w-[40px] [&>svg]:max-h-[40px]'>
                                        <IconComponent icon={item.icon} className='text-gray-500' />
                                    </div>
                                )}
                                <span className='text-gray-700'>{item.text}</span>
                            </a>
                        ) : (
                            <Link href={path}>
                                <a className={linkClasses}>
                                    {item.icon && (
                                        <div className='mr-2 [&>svg]:max-w-[40px] [&>svg]:max-h-[40px]'>
                                            <IconComponent icon={item.icon} className='text-gray-500' />
                                        </div>
                                    )}
                                    <span className='text-gray-700'>{item.text}</span>
                                </a>
                            </Link>
                        );
                    } else {
                        linkElement = (
                            <span className={`flex items-center py-2 ${index === 0 ? '' : 'border-t border-gray-200'}`}>
                                {item.icon && (
                                    <div className='mr-2 [&>svg]:max-w-[40px] [&>svg]:max-h-[40px]'>
                                        <IconComponent icon={item.icon} className='text-gray-500' />
                                    </div>
                                )}
                                <span className='text-gray-700'>{item.text}</span>
                            </span>
                        );
                    }

                    return (
                        <li key={item._uid} className={path ? 'cursor-pointer' : ''}>
                            {linkElement}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExpandableList;