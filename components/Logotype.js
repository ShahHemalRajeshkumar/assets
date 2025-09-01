import React, { useEffect, useRef, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import { isExternalLink } from '@/utils/isExternalLink';

import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';

import LinkRoute from '../utils/link-route';

const Logotype = ({ blok, className }) => {
  const path = LinkRoute(blok);
  const logotype = (
    <div className={clsx('relative w-full h-full', className)}>
      <Image
        src={blok?.image?.filename}
        alt={blok?.image?.alt || "image"}
        className='relative object-contain pointer '
        layout='fill'
        objectFit='contain'
        quality={40}
      />
    </div>
  );

  const getComponent = () => {
    if (isExternalLink(blok?.link?.url)) {
      return (
        <a target='_blank' href={blok?.link?.url} rel='noreferrer'>
          {logotype}
        </a>
      );
    }
    if (path) {
      return (
        <Link href={path}>
          <a>{logotype}</a>
        </Link>
      );
    }
    return logotype;
  };

  return (
      <div {...storyblokEditable(blok)} className='w-full h-full'>{getComponent()}</div>
  );
};

export default Logotype;
