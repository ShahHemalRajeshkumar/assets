import React, { useEffect, useState } from 'react';
import Styles from '../styles/blog-details.module.scss';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import StoryblokService from '../utils/storyblok-service';

const SubscribeComponent = dynamic(() => import('./SubscribeComponent'));
const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import 'dayjs/locale/de';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const BlogDetails = ({ blok, articles }) => {
  const router = useRouter();
  useEffect(() => {
    setUrl(`${window.location.origin}${router.asPath}`);
  }, [router]);

  articles.component = blok.recommended_articles[0].component;
  const [url, setUrl] = useState('');
  const advancedFormat = require('dayjs/plugin/advancedFormat');
  dayjs.extend(advancedFormat);
  const language = router.query.language.slice(3);

  return (
    <div className='contain'>
      <p className='w-full font-bold lg:text-48px lg:leading-56px text-24px leading-34px md:w-2/3 lg:mt-9 mt-28'>
        {blok.title}
      </p>
      <div className='flex flex-col ms-blog-details lg:space-x-16 md:space-x-8 md:flex-row'>
        <div className='w-full md:w-2/3'>
          <div className='flex items-center justify-between my-4 lg:my-9'>
            <div className='flex items-center'>
              <div className='relative w-12 h-12 '>
                <Image
                  src={blok.portrait_author_image}
                  alt={blok.alt}
                  className='rounded-full'
                  height='54'
                  width='54'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={blok.portrait_author_image}
                />
              </div>
              <div className='ml-4'>
                <p className='font-medium text-16px'>{blok.author}</p>
                <p className='text-black text-14px opacity-60'>
                  {' '}
                  {blok.posted_on} {dayjs(blok.publishing_date, { locale: language }).format('Do MMMM YYYY')}
                </p>
              </div>
            </div>
            <div className={`${Styles.ms_social_media} flex space-x-2 cursor-pointer relative`}>
              <i className='material-icons-outlined text-light-grey-600'> share </i>
              <p className='opacity-60'>{blok.share}</p>
              <div
                className={`${Styles.ms_social_media_container} z-10 absolute shadow bg-light-grey-200 rounded-lg p-4 text-center top-10 space-y-2`}>
                <FacebookShareButton url={url} className='flex items-center space-x-2'>
                  <FacebookIcon size={20} round={true} borderRadius={20} iconFillColor={'white'} />
                  <p className='text-14px'>{blok.facebook}</p>
                </FacebookShareButton>
                <FacebookMessengerShareButton url={url} className='flex items-center space-x-2'>
                  <FacebookMessengerIcon size={20} round={true} borderRadius={20} iconFillColor={'white'} />
                  <p className='text-14px'>{blok.messenger}</p>
                </FacebookMessengerShareButton>
                <TwitterShareButton url={url} className='flex items-center space-x-2'>
                  <TwitterIcon size={20} round={true} borderRadius={20} iconFillColor={'white'} />
                  <p className='text-14px'>{blok.twitter}</p>
                </TwitterShareButton>
                <WhatsappShareButton url={url} className='flex items-center space-x-2'>
                  <WhatsappIcon size={20} round={true} borderRadius={20} iconFillColor={'white'} />
                  <p className='text-14px'>{blok.whatsapp}</p>
                </WhatsappShareButton>
                <EmailShareButton url={url} className='flex items-center space-x-2'>
                  <EmailIcon size={20} round={true} borderRadius={20} iconFillColor={'white'} />
                  <p className='text-14px'>{blok.email}</p>
                </EmailShareButton>
              </div>
            </div>
          </div>
          <div className='relative my-4'>
            <Image
              src={blok.hero_image}
              alt={blok.alt}
              className='rounded-lg'
              height={blok.hero_image_height}
              width={blok.hero_image_width}
              objectFit='cover'
              placeholder='blur'
              blurDataURL={blok.hero_image}
            />
          </div>
          <div
            className={`${Styles['rich-text-list']} text-black opacity-60 text-14px`}
            dangerouslySetInnerHTML={{ __html: StoryblokService.client.richTextResolver.render(blok.hero_image_title) }}
          />
          <div className='mt-9'>
            <div
              className={`${Styles['rich-text-list']} mb-4`}
              dangerouslySetInnerHTML={{ __html: StoryblokService.client.richTextResolver.render(blok.abstract) }}
            />
            {blok.blog_components &&
              blok.blog_components.map((component) => <DynamicComponent key={component._uid} blok={component} />)}
          </div>
          {blok.tags && (
            <div className='my-9'>
              <p className='mb-6 font-bold text-16px leading-28px lg:text-24px lg:leading-36px'>{blok.tag}</p>
              <div className='flex flex-wrap gap-4'>
                {blok.tags.split(',').map((tag, index) => (
                  <div
                    className={`bg-light-grey-200 rounded-lg px-3 py-1 cursor-pointer text-14px ${
                      !index ? 'opacity-60' : 'opacity-60'
                    }`}
                    key={index}>
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='w-full md:w-1/3 lg:mt-8 lg:pt-3'>
          <p className='mb-12 font-bold lg:text-24px text-20px'> {blok.articles}</p>
          <DynamicComponent blok={articles} title={blok.title} />
          <p className='mt-8 font-bold lg:text-24px text-20px lg:mt-28'>{blok.subscribe_heading}</p>
          <p className='mt-2 mb-4 opacity-60'>{blok.subscribe_title}</p>
          <SubscribeComponent component={blok.component} options={blok.options} blok={blok} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;