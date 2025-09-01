import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import LinkRoute from '../utils/link-route';
import Image from 'next/image';
import { createWixImagePath } from '../utils/createWixImageURL';

const createWixURL = (slug) => `https://www.blog.matchspace-music.ch/post/${slug}`;

const BlogList = ({ blok, title, wixArticles }) => {
  const [articleIndex, setIndex] = useState(0);
  const [blogPage, setBlogPage] = useState(false);
  const router = useRouter();
  const newArray = useState({});

  useEffect(() => {
    setUrl(`${window.location.origin}${router.asPath}`);
   setBlogPage(router.asPath.includes('blog-de') || router.asPath.includes('blog-en'));
    setIndex(router.asPath.includes('blog-de' || 'blog-en') ? 4 : 4);
  }, [router.asPath]);

  const blogList = (bloks) => {
    bloks.data?.stories.map((article) => {
      if (newArray[article.content.type]) {
        newArray[article.content.type].push(article);
      } else {
        newArray[article.content.type] = [];
        newArray[article.content.type].push(article);
      }
    });
    const articles = Object.entries(newArray);
    const articleList = articles.slice(2);
    return articleList;
  };

  const sortArray = (bloks) => {
    let sortedArticle;
    sortedArticle = bloks.sort((a, b) =>
      b.content.publishing_date > a.content.publishing_date
        ? 1
        : b.content.publishing_date < a.content.publishing_date
        ? -1
        : 0
    );
    const filteredArticle = sortedArticle.filter((list) => list.content.title !== title);
    return filteredArticle;
  };
  const array = (blok) => {
    const filtered = blok.data?.stories.filter(
      (article) => article.content.type !== 'Music-Teachers' && article.content.type !== 'Musiklehrpersonen'
    );
    const sortedArticle = filtered?.sort((a, b) =>
      b.content.publishing_date > a.content.publishing_date
        ? 1
        : b.content.publishing_date < a.content.publishing_date
        ? -1
        : 0
    );
    const filteredArticle =
      router.asPath.includes('about-us') || router.asPath.includes('ueber')
        ? sortedArticle?.filter(
            (list) =>
              !list.content?.teaser_image_required && ['News-detail', 'Nachrichtendetails'].includes(list.content.type)
          )
        : sortedArticle?.filter((list) => !list.content?.teaser_image_required);
    return filteredArticle;
  };
  const [url, setUrl] = useState('');
  const advancedFormat = require('dayjs/plugin/advancedFormat');
  dayjs.extend(advancedFormat);

  const language = router.query.language === undefined || router.query.language.includes('en') ? 'en' : 'de';
  return (
    <div>
      <div className={blogPage ? 'space-y-8 pt-1' : 'space-y-8'}>
        {wixArticles?.slice(0, 4).map((article, ind) => (
          <div className='flex items-center space-x-6' key={article._id}>
            <a href={createWixURL(article.slug)}>
              <div
                className={`${blogPage ? 'h-20 w-20' : 'h-24 w-24'} max-w-none object-cover cursor-pointer relative`}>
                <Image
                  className='rounded-lg'
                  src={createWixImagePath(article?.coverImage)}
                  alt={article?.title}
                  quality={50}
                  layout='fill'
                  objectFit='cover'
                  // blurDataURL='data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUsVWsBwAB8gD77rmvpQAAAABJRU5ErkJggg=='
                />
              </div>
            </a>
            <div>
              <a
                href={createWixURL(article.slug)}
                className={`${
                  blogPage ? 'text-16px' : 'text-18px'
                } font-medium leading-28px cursor-pointer hover:text-primary line-clamp-2`}>
                <h3>{article.title}</h3>
              </a>
              <p className='text-14px opacity-60 line-clamp-1'>{`${article?.author.nickname} ${dayjs(
                article?.publishedDate,
                { locale: language }
              ).format('Do MMMM YYYY')}`}</p>
            </div>
          </div>
        ))}
        {/* {(router.asPath === '/ch-de' ||
          router.asPath === '/ch-en' ||
          router.asPath.includes('?') ||
          (router.query.slug && ['home', 'startseite', 'about-us', 'ueber-uns'].includes(router.query?.slug[0]))) &&
          array(blok)?.map(
            (article, index) =>
              index < articleIndex && (
                <div className='flex items-center space-x-6' key={article.uuid}>
                  <a href={LinkRoute(article.full_slug)}>
                    <div
                      className={`${
                        blogPage ? 'h-20 w-20' : 'h-24 w-24'
                      } max-w-none object-cover cursor-pointer relative`}>
                      <Image
                        src={article.content?.hero_image}
                        alt={article.content.alt}
                        className='rounded-lg'
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </a>
                  <div>
                    <a
                      href={LinkRoute(article.full_slug)}
                      className={`${
                        blogPage ? 'text-16px' : 'text-18px'
                      } line-clamp-2 font-medium leading-28px cursor-pointer hover:text-primary`}>
                      {article.content?.title}
                    </a>
                    <p className='text-14px opacity-60 line-clamp-1'>
                      {article.content?.by} {article.content?.author},{' '}
                      {dayjs(article.content?.publishing_date, { locale: language }).format('Do MMMM YYYY')}
                    </p>
                  </div>
                </div>
              )
          )} */}
      </div>
    </div>
  );
};

export default BlogList;
