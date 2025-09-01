import React from 'react';
import Image from 'next/image';
import LinkRoute from '../../../utils/link-route';
import { trim, equals } from 'ramda';

import clsx from 'clsx';

const checkLinks = (url, cached_url) => !equals(trim(url), '') || !equals(trim(cached_url), '');

const NavigationExtendedBarListItem = ({ link, className }) => {
  const { svg, open, name, title, link: linkDetails } = link;
  const { url, cached_url } = linkDetails;

  const listItemClasses = clsx(
    'flex items-center transition-colors duration-300 ease-in-out p-1',
    'border-b border-gray-200 last:border-b-0',
    className
  );

  return (
    <li className={listItemClasses}>
      {svg && (
        <div className='mr-2 flex items-center justify-center w-8 h-8 rounded-full'>
          <Image src={svg} height='32' width='32' alt={title || ''} objectFit='cover' />
        </div>
      )}
      {checkLinks(url, cached_url) ? (
        <a
          href={LinkRoute(link)}
          rel='noreferrer'
          target={open ? '_blank' : '_self'}
          className={clsx(
            'cursor-pointer hover:text-primary whitespace-nowrap rounded-md',
            'outline-2 focus-visible:outline-offset-2 focus-visible:outline',
            'focus-visible:outline-primary'
          )}>
          {name}
        </a>
      ) : (
        <div className='relative block group'>
          {name}

          <span
            className={clsx(
              'absolute -top-5 left-0 border rounded-lg bg-primary-500 text-xs',
              'hidden group-hover:block px-2 text-white whitespace-nowrap'
            )}>
            Coming soon
          </span>
        </div>
      )}
    </li>
  );
};

export default NavigationExtendedBarListItem;