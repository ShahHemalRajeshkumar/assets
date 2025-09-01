import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StoryblokService from '@/utils/storyblok-service';

import { IconComponent } from './IconComponent/IconComponent';

import LinkRoute from '@/utils/link-route';

const TestimonialCard = ({ image, title, position, description, link }) => {
    const preparedLink = {
        link,
    };
    const path = LinkRoute(preparedLink);

    const hoverStyle = path ? 'hover:border-primary' : '';

    const cardBaseClasses = `rounded-lg overflow-hidden border p-4 transition duration-300 ${hoverStyle}`;

    const CardContent = () => (
        <>
            <div className='flex items-center space-x-2'>
                <div className='min-w-[3.5rem] w-14 h-14 relative'>
                    <Image className='rounded-full' src={image.filename} alt={image.alt} layout='fill' objectFit='cover' />
                </div>
                <div>
                    <h3 className='text-lg font-bold'>{title}</h3>
                    <p className='flex gap-1 text-sm text-gray-600'>
                        <IconComponent icon='thumbsUp' />
                        {position}
                    </p>
                </div>
            </div>
            {typeof description === 'string' ? (
                <p className='text-sm text-gray-600 mt-4'>{description}</p>
            ) : (
                <p
                    className='text-sm text-gray-600 inline-block !mt-4'
                    dangerouslySetInnerHTML={{
                        __html: StoryblokService.client.richTextResolver.render(description),
                    }}
                />
            )}
        </>
    );

    return (
        <div className={cardBaseClasses}>
            {path ? (
                <a href={path} target={link.target === '_blank' ? '_blank' : '_self'} rel='noopener noreferrer'>
                    <CardContent />
                </a>
            ) : (
                <CardContent />
            )}
        </div>
    );
};

export default TestimonialCard;
