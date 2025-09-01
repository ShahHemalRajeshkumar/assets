import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LinkRoute from '@/utils/link-route';
import { IconComponent } from './IconComponent/IconComponent';

import clsx from 'clsx';

const UserProfileCard = ({
    backgroundImage: { filename: bgFilename, alt: bgAlt },
    profileImage: { filename: profileFilename, alt: profileAlt },
    title,
    titleIcon,
    location,
    icons,
    href,
}) => {
    const path = LinkRoute({ link: href });
    const openNewTab = href?.target === '_blank';

    const cardContent = (
        <div className={clsx('rounded-lg shadow-lg flex flex-col border border-gray-200', path && '')}>
            <div className='relative aspect-[4/1]'>
                <Image className='rounded-t-lg' src={bgFilename} alt={bgAlt} layout='fill' objectFit='cover' />
                <div className='rounded-full absolute bottom-[-30px] left-1/2 transform -translate-x-1/2'>
                    <Image className='rounded-full' src={profileFilename} alt={profileAlt} width={70} height={70} />
                </div>
            </div>

            <div className='mt-12'>
                <div className='flex flex-col items-center'>
                    {title && (
                        <div className='flex gap-2 items-center'>
                            <div className='relative [&>*]:!w-6 [&>*]:h-10'>
                                <IconComponent icon={titleIcon} />
                            </div>
                            <h3 className='font-bold text-lg'>{title}</h3>
                        </div>
                    )}
                    {location && (
                        <div className='flex items-center'>
                            <div className='relative [&>*]:!w-6 [&>*]:h-10'>
                                <IconComponent icon='location2' />
                            </div>
                            <p className='text-base text-gray-700 my-4'>{location}</p>
                        </div>
                    )}
                </div>
                {icons?.length > 0 && (
                    <div className='mb-6 flex items-center justify-center gap-4 w-full'>
                        {icons.map((icon, index) => (
                            <div key={icon._uid} className='[&>*]:w-8 [&>*]:h-8 [&>*]:md:w-6 [&>*]:md:h-6'>
                                <IconComponent icon={icon.icon_name} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );

    return path ? (
        <Link href={path} passHref>
            <a
                target={openNewTab ? '_blank' : '_self'}
                rel={openNewTab === '_blank' ? 'noopener noreferrer' : undefined}
                className='outline-visible'>
                {cardContent}
            </a>
        </Link>
    ) : (
        cardContent
    );
};

export default UserProfileCard;
