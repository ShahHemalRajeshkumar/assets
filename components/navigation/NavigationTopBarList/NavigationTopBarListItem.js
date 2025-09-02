import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import LinkRoute from '../../../utils/link-route';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NavigationExtendedBarListItem from '../NavigationExtendedBar/NavigationExtendedBarListItem';

const DownArrow = dynamic(() => import('../../icons/DownArrow'));
const NavigationTopBarListItem = ({ header, clickMenu, clickedHeader, language }) => {
  const { show, internal_link, name, active } = header;
  const [informativeSideData, ...restLinks] = internal_link || [];
  const currentHeaderSelected = clickedHeader === name;
  const headerClass = clsx('mr-4 xl:mr-8 group', {
    'border-primary sm-nav-active': show,
  });
  const linkClass = clsx('block', {
    'text-primary text-opacity-100 font-semibold': active,
    'font-medium': !active,
  });
  const buttonClass = clsx(
    'inline-flex items-center justify-center text-black text-opacity-50',
    'cursor-pointer hover:text-primary hover:text-opacity-100',
    'border-b-4 border-transparent hover:border-primary focus:outline-none'
  );
  const iconButtonClass = clsx('material-icons-outlined text-gray-500 hover:text-gray-700');
  const groupFocusVisibleButton = '';
  const groupFocusVisibleAnchor = '';
  return (
    <li className='relative'>
      {/* Main navigation item */}
      <div className={headerClass}>
        {internal_link?.length ? (
          <button
            className={`pt-2 pb-5 transition group/button ${buttonClass}`}
            onClick={() => clickMenu(header)}
          >
            <div className={`flex ${groupFocusVisibleButton}`}>
              <p className={linkClass}>{name}</p>
              <span className='max-h-[27px]'>
           +     <DownArrow />
              </span>
            </div>
          </button>
        ) : (
          <a
            href={LinkRoute(header)}
            className={`${linkClass} group/anchor border-b-4 border-transparent -mr-1
            transition hover:border-primary pt-2 pb-5 focus:outline-none`}
          >
            <span className={groupFocusVisibleAnchor}>{name}</span>
            {header?.highlight && (
              <span
                className='text-white text-12px ml-2'
                style={{
                  position: 'relative',
                  bottom: 3,
                  padding: '4px 7px',
                  background: '#C0055B',
                  borderRadius: 8,
                }}
              >
                {header?.highlighter_text}
              </span>
            )}
          </a>
        )}
      </div>
      {/* Extended navigation dropdown */}
      {currentHeaderSelected && restLinks && show && (
        <ul className='bg-white shadow-md flex flex-col absolute min-[1280px]:top-[85px] min-[1370px]:top-[75px] z-[50] rounded-lg min-w-[200px]'>
          <div className='relative pt-4 pb-2 pl-2 pr-12 flex flex-col gap-2'>
            <div
              className='absolute cursor-pointer right-2 top-2'
              onClick={() => clickMenu(header)}
            >
              <i className={iconButtonClass}>clear</i>
            </div>
            {restLinks.map((link) => (
              <NavigationExtendedBarListItem key={link._uid} link={link} />
            ))}
          </div>
        </ul>
      )}
    </li>
  );
};
export default NavigationTopBarListItem;
