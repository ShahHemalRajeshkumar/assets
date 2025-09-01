import React, { useEffect, useState } from 'react';
import { createWixImagePath } from '../utils/createWixImageURL';
import { useRouter } from 'next/router';
import Styles from '../styles/text-advance.module.scss';
import dayjs from 'dayjs';
import Spinner from './Spinner';
import 'dayjs/locale/de';

import Link from 'next/link';
import Image from 'next/image';
import apiCall from '../hooks/useApi';

import { WIX_ENDPOINTS } from '../constants/urls';
import { PAGE_TYPES_EN, PAGE_TYPES_DE } from '../constants/page-types';
import { CATEGORIES_TYPE_EN, CATEGORIES_TYPE_DE } from '../constants/blog-categories';

const createWixURL = (slug) => `${WIX_ENDPOINTS.baseURL}post/${slug}`;

const getSlug = (slugData) => (Array.isArray(slugData) ? slugData.slice(-1)[0] : slugData);

const getCategoryName = (slug, language) => {
  switch (true) {
    case slug === PAGE_TYPES_EN.ABOUT_US && language === 'en':
      return CATEGORIES_TYPE_EN.IN_THE_NEWS;
    case slug === PAGE_TYPES_DE.ABOUT_US && language === 'de':
      return CATEGORIES_TYPE_DE.IN_THE_NEWS;
    default:
      return null;
  }
};

const NewsTeaser = (blok) => {
  const router = useRouter();

  const slug = getSlug(router.query.slug);
  const language = router.query.language.slice(3);
  const category = getCategoryName(slug, language);

  const { loading, data, error } = apiCall(
    `${WIX_ENDPOINTS.getPostsByLangAndCat()}?category=${encodeURIComponent(category)}&language=${language}`
  );

  data?.items?.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  const featuredArticles = data?.items?.slice(0, 2);
  const otherArticles = data?.items?.slice(2);

  const englishVersion = language === 'en';

  useEffect(() => {
    const position = sessionStorage.getItem('position');
    position && document.getElementById('from_here')?.scrollIntoView();
    sessionStorage.removeItem('position');
  }, []);

  const advancedFormat = require('dayjs/plugin/advancedFormat');
  dayjs.extend(advancedFormat);

  const goToDetail = () => {
    sessionStorage.setItem('position', window.pageYOffset);
  };

  const errMsg = englishVersion
    ? 'No articles found. Find out more here:'
    : 'Keine Artikel gefunden. Erfahren Sie hier mehr:';

  return (
    <>
      {loading && (
        <div className='contain'>
          <div className='mt-8'>
            <Spinner />
          </div>
        </div>
      )}
      {!error && data?.items?.length > 0 && (
        <div className='contain' id='from_here'>
          <>
            <div className='grid md:grid-cols-2 justify-center gap-8'>
              {featuredArticles.map((article) => (
                <div onClick={() => goToDetail()} key={article._id}>
                  <Link href={createWixURL(article?.slug)} passHref>
                    <a>
                      <div className='md:mt-9 mb-4 relative'>
                        <Image
                          className='rounded-lg cursor-pointer'
                          src={createWixImagePath(article?.coverImage)}
                          alt={article?.title}
                          height='700'
                          width='1230'
                          objectFit='cover'
                          placeholder='blur'
                          blurDataURL={createWixImagePath(article?.coverImage)}
                        />
                      </div>
                      <div className='text-20px leading-28px font-medium cursor-pointer hover:text-primary clamp-2'>
                        <h3>{article.title}</h3>
                      </div>
                    </a>
                  </Link>
                  <p className='text-16px text-light-grey-300 my-4'>{`${article?.author.nickname} ${dayjs(
                    article?.publishedDate,
                    {
                      locale: language,
                    }
                  ).format('Do MMMM YYYY')}`}</p>
                  <div className={`${Styles['rich-text-list']} opacity-60 line-clamp-2 ms-break-line font-thin`}>
                    {article?.plainContent}
                  </div>
                </div>
              ))}
            </div>
            <div className='hidden md:grid grid-cols-3 justify-center gap-8'>
              {otherArticles.map(
                (article, ind) =>
                  ind < 3 && (
                    <div className='pb-4' onClick={() => goToDetail()} key={article._id}>
                      <Link href={createWixURL(article?.slug)} passHref>
                        <a>
                          <div className='mt-9 mb-4 relative'>
                            <Image
                              className='rounded-lg cursor-pointer'
                              src={createWixImagePath(article?.coverImage)}
                              alt={article?.title}
                              height='700'
                              width='1230'
                              objectFit='cover'
                              placeholder='blur'
                              blurDataURL={createWixImagePath(article?.coverImage)}
                            />
                          </div>
                          <div className='text-20px leading-28px font-medium cursor-pointer hover:text-primary line-clamp-1'>
                            <h3>{article.title}</h3>
                          </div>
                        </a>
                      </Link>
                      <p className='text-16px text-light-grey-300 my-4'>{`${article?.author.nickname} ${dayjs(
                        article?.publishedDate,
                        {
                          locale: language,
                        }
                      ).format('Do MMMM YYYY')}`}</p>
                      <div className={`${Styles['rich-text-list']} opacity-60 line-clamp-3 ms-break-line font-thin`}>
                        {article?.plainContent}
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        </div>
      )}
      {(!data || data?.items?.length === 0) && !loading && (
        <div className='contain my-10 justify-center flex flex-wrap'>
          <p className='mr-2'>{errMsg}</p>
          <a className='underline' href={WIX_ENDPOINTS.baseURL}>{`${WIX_ENDPOINTS.baseURL}${
            englishVersion ? 'en' : ''
          }`}</a>
          .
        </div>
      )}
    </>
  );
};

export default NewsTeaser;
