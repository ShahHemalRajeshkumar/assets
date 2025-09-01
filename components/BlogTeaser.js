import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createWixImagePath } from '../utils/createWixImageURL';
import Styles from '../styles/text-advance.module.scss';
import Spinner from './Spinner';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
const BlogList = dynamic(() => import('./BlogList'));
import Link from 'next/link';
import Image from 'next/image';
import imageService from '../utils/image-service';
import apiCall from '../hooks/useApi';

import { getSlug } from '@/utils/getSlug';
import { getCategoryName } from '@/utils/getCategoryName';
import { filterPostsByTags } from '@/utils/filterPostsByTags';
import { getLastSegment } from '@/utils/getLastSegment';

import { WIX_ENDPOINTS } from '../constants/urls';

const createWixURL = (slug) => `${WIX_ENDPOINTS.baseURL}post/${slug}`;

const BlogTeaser = () => {
  const router = useRouter();

  const slug = getSlug(router.query.slug);
  const language = router.query.language.slice(3);
  const category = getCategoryName(slug, language);

  const fetchData = () => {
    if (slug === 'gitarre-mieten' || slug === 'guitar-rentals') {
      const response = apiCall(`${WIX_ENDPOINTS.getPostsByLang()}?language=${language}`);
      return {
        loading: response.loading,
        result: { items: filterPostsByTags(response.data, language) },
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'klavierunterricht') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('klavier')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'piano-lessons') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('piano-1')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'gitarrenunterricht') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('gitarre')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'guitar-lessons') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('guitar')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'gesangsunterricht') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('gesang')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'geigenunterricht') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('geige,violine,bratsche')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'singing-lessons') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('singing')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'drums-lessons') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('drums,percussion')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    if (getLastSegment(router.asPath) === 'schlagzeugunterricht') {
      const response = apiCall(
        `${WIX_ENDPOINTS.getPostsByTagNames()}?tags=${encodeURIComponent('schlagzeug,percussion,e-schlagzeug')}&language=${language}`
      );
      return {
        loading: response.loading,
        result: response?.data,
        error: response.error
      };
    }
    const response = apiCall(
      `${WIX_ENDPOINTS.getPostsByLangAndCat()}?category=${encodeURIComponent(category)}&language=${language}`
    );
    return {
      loading: response.loading,
      result: response.data,
      error: response.error
    };
  };

  const { loading, result, error } = fetchData();

  const [mainArticle, ...restArticles] = result?.items || [];
  const englishVersion = language === 'en';

  result?.items?.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    scrollPosition && document.getElementById('view_from_here')?.scrollIntoView();
    sessionStorage.removeItem('scrollPosition');
  }, []);

  const pathDetail = () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
  };

  const advancedFormat = require('dayjs/plugin/advancedFormat');
  dayjs.extend(advancedFormat);

  const errMsg = englishVersion
    ? 'No articles found. Find out more here:'
    : 'Keine Artikel gefunden. Erfahren Sie hier mehr:';


  return (
    <>
      {loading && (
        <div className='contain'>
          <Spinner />
        </div>
      )}
      {!error && result?.items?.length > 0 && (
        <div className='contain' id='view_from_here'>
          <div className='flex space-x-12'>
            <div className='w-full md:w-1/2'>
              <div>
                <div className='mb-4'>
                  <Link href={createWixURL(mainArticle?.slug)} passHref>
                    <a>
                      <Image
                        onClick={() => pathDetail()}
                        className='rounded-lg cursor-pointer'
                        src={createWixImagePath(mainArticle?.coverImage)}
                        alt={mainArticle?.title}
                        width='879'
                        height='490'
                        quality={50}
                        objectFit='cover'
                        blurDataURL={createWixImagePath(mainArticle?.coverImage)}
                      />
                    </a>
                  </Link>
                </div>
                <Link href={createWixURL(mainArticle?.slug)} passHref>
                  <a>
                    <div
                      onClick={() => pathDetail()}
                      className='font-medium cursor-pointer md:text-24px leading-28px text-20px hover:text-primary'>
                      <h3>{mainArticle?.title}</h3>
                    </div>
                  </a>
                </Link>
                <p className='my-4 text-light-grey-300 text-14px md:my-2'>{`${mainArticle?.author.nickname} ${dayjs(
                  mainArticle?.publishedDate,
                  {
                    locale: language,
                  }
                ).format('Do MMMM YYYY')}`}</p>
                <div
                  className={`${Styles['rich-text-list']} text - black line - clamp - 4 opacity - 80 md: opacity - 60 leading - 28px ms -break-line font - thin`}>
                  {mainArticle?.plainContent}
                </div>
              </div>
            </div>
            <div className='hidden w-full md:w-1/2 md:block'>
              {restArticles && <BlogList wixArticles={restArticles} />}
            </div>
          </div>
        </div>
      )}
      {(!result || result?.items?.length === 0) && !loading && (
        <div className='flex flex-wrap justify-center contain'>
          <p className='mr-2'>{errMsg}</p>
          <a className='underline' href={WIX_ENDPOINTS.baseURL}>{`${WIX_ENDPOINTS.baseURL}${englishVersion ? 'en' : ''
            } `}</a>
          .
        </div>
      )}
    </>
  );
};
export default BlogTeaser;