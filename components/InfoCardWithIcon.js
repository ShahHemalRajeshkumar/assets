import React from 'react';
import { IconComponent } from './IconComponent/IconComponent';
import Link from 'next/link';
import clsx from 'clsx';
import LinkRoute from '@/utils/link-route';

const InfoCardWithIcon = ({ blok }) => {
  const { title, subtitle, href, iconName, icon } = blok;

  const preparedLink = {
    link: href,
  };
  const path = LinkRoute(preparedLink);

  const cardClasses = clsx('flex items-center justify-between h-full relative bg-white border rounded-lg', {
    'cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out outline-visible': path,
  });

  const iconContainerClasses = `
     bg-gray-300 h-full  flex items-center px-4 rounded-tl-md rounded-bl-md
  `;

  const titleClasses = `
    font-semibold text-lg text-gray-800 !text-primary
  `;

  const subtitleClasses = `
    text-gray-600 text-sm line-clamp-2
  `;

  const content = (
    <>
      <div className={iconContainerClasses}>
        <IconComponent icon={icon || 'placeholder'} />
      </div>
      <div className='flex-grow py-2 pl-4 pr-12 rounded-tr-md rounded-br-md border-2 border-t-gray-300 h-full flex flex-col justify-center'>
        <h3 className={titleClasses}>{title}</h3>
        <p className={subtitleClasses}>{subtitle}</p>
      </div>
    </>
  );

  if (path) {
    return (
      <Link href={path} passHref>
        <section  className={cardClasses} role='presentation' tabIndex={0}>
          {content}
        </section>
      </Link>
    );

  } else {
    return (
      <section className={clsx(' ', cardClasses)} role='presentation'>
        {content}
      </section>
    );
  }
};

export default InfoCardWithIcon;
