import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Styles from '../styles/blog-details.module.scss';
import StoryblokService from '../utils/storyblok-service';
import { Link } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import 'dayjs/locale/de';
import Image from 'next/image';

const BlogLanding = ({ blok, anchors }) => {
  let anchorId;
  const router = useRouter();
  router.query.language === 'ch-de'
    ? (anchorId = {
        Musiklehrpersonen: 'Musiklehrpersonen',
        'Musikschüler*innen': 'Musikschueler*innen',
      })
    : (anchorId = {
        'Music Teachers': 'Music-Teachers',
        'Music Students': 'Music-Students',
      });
  const [selected, setSelected] = useState('');
  const [cardNumber, setCardNumber] = useState(3);
  const [slug, setSlug] = useState('');
  const newArray = {};

  useEffect(() => {
    ['news', 'in-the-news'].includes(router.query.slug[0]) &&
      setSlug(router.query.slug[0] === 'in-the-news' ? 'In-the-news' : 'News-detail');
    ['neuigkeiten', 'in-den-nachrichten'].includes(router.query.slug[0]) &&
      setSlug(router.query.slug[0] === 'in-den-nachrichten' ? 'In-den-nachrichten' : 'Nachrichtendetails');
  }, [router.query.slug]);

  blok.data?.stories.map((article) => {
    if (newArray[article.content.type] !== undefined) {
      newArray[article.content.type].push(article);
    } else {
      newArray[article.content.type] = [];
      newArray[article.content.type].push(article);
    }
  });
  const articles = Object.entries(newArray);

  const mobile = useMediaQuery({ maxWidth: 599 });
  const tab = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  const smallLaptop = useMediaQuery({ minWidth: 960, maxWidth: 1279 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1439 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const extraLargeLaptop = useMediaQuery({ minWidth: 1920, maxWidth: 5000 });

  const device = [
    { xs: mobile },
    { sm: tab },
    { md: smallLaptop },
    { lg: medLaptop },
    { xl: largeLaptop },
    { xxl: extraLargeLaptop },
  ].find((value) => {
    if (Object.values(value)[0]) {
      return value;
    }
  });
  useEffect(() => {
    const startPosition = sessionStorage.getItem('startPosition');
    startPosition && document.getElementById(startPosition)?.scrollIntoView();
    sessionStorage.removeItem('startPosition');
  });
  const dev = device ? Object.keys(device) : 'xs';
  const pathDetail = (ind) => {
    sessionStorage.setItem('startPosition', ind);
  };
  const advancedFormat = require('dayjs/plugin/advancedFormat');
  dayjs.extend(advancedFormat);
  const language = router.query.language.slice(3);
  const sortArray = (bloks) => {
    const sortedArticle = bloks.sort((a, b) =>
      b.content.publishing_date > a.content.publishing_date
        ? 1
        : b.content.publishing_date < a.content.publishing_date
        ? -1
        : 0
    );
    const filteredArticle = sortedArticle.filter((list) => !list.content.show_blog_main_img);
    return filteredArticle;
  };
  return (
    <div>
      <div className='contain'>
        <p className='font-bold text-center text-24px md:text-48px leading-32px md:leading-56px mt-28 lg:mt-12'>
          {anchors.heading}
        </p>
        <p
          id={router.query.language.includes('en') ? 'Music-Students' : 'Musikschueler*innen'}
          className='w-10 px-12 pt-2 mx-auto border-b-4 border-primary'
        />
        {anchors.anchor_list && (
          <div className='px-6 mt-8 border-b md:mt-10 ms-tab--scroll border-disable'>
            <ol className='flex justify-center space-x-8 md:space-x-12'>
              {anchors.anchor_list.split(',').map((anchor, index) => (
                <li
                  className={`${
                    selected === anchor && 'border-b-4 border-primary text-primary'
                  } hover:text-primary md:px-8 text-18px pb-1 cursor-pointer`}
                  key={index}>
                  <Link
                    onSetActive={() => setSelected(anchor)}
                    to={anchorId[anchor]}
                    spy={true}
                    offset={['md', 'xs', 'sm'].includes(dev[0]) ? -80 : 15}
                    smooth={true}>
                    {anchor}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
        {articles.reverse().map(
          (article, ind) =>
            (article[0] === slug || router.query.slug === 'blog') && (
              <div key={ind}>
                <div className='mt-12 md:mt-8'>
                  <p className='font-bold md:text-34px md:leading-46px text-24px leading-28px'>
                    {router.query.slug[0] === 'blog' ? article[0].replace('-', ' ') : ''}
                  </p>
                  {article[1].map(
                    (articleList, index) =>
                      articleList.content.show_blog_main_img && (
                        <>
                          <div
                            className='grid-cols-2 md:grid md:space-x-10 md:mt-10 mt-7'
                            id={index}
                            key={articleList.content.uuid}>
                            <a href={`/${articleList.full_slug}`}>
                              <div className='relative'>
                                <Image
                                  onClick={() => pathDetail(index)}
                                  className='rounded-lg cursor-pointer'
                                  alt={articleList.content.alt}
                                  src={articleList.content.hero_image}
                                  height={articleList.content.hero_image_height}
                                  width={articleList.content.hero_image_width}
                                  objectFit='cover'
                                  placeholder='blur'
                                  blurDataURL={articleList.content.hero_image}
                                />
                              </div>
                            </a>
                            <div>
                              <p className='py-4 text-light-grey-300 md:py-0 text-14px'>
                                {articleList.content.by} {articleList.content.author.trim()},{' '}
                                {dayjs(articleList.content?.publishing_date, { locale: language }).format(
                                  'Do MMMM YYYY'
                                )}
                              </p>
                              <a href={`/${articleList.full_slug}`}>
                                <div className='my-2 font-medium cursor-pointer line-clamp-2 text-20px leading-28px lg:text-48px lg:leading-56px hover:text-primary'>
                                  {articleList.content.title}
                                </div>
                              </a>
                              <div
                                className={`${Styles['rich-text-list']} line-clamp-3 text-18px leading-28px md:text-20px md:leading-32px opacity-60 ms-break-line font-thin`}
                                dangerouslySetInnerHTML={{
                                  __html: StoryblokService.client.richTextResolver.render(articleList.content.abstract),
                                }}
                              />
                              <a href={`/${articleList.full_slug}`}>
                                <button type='button' className='hidden mt-4 btn-outline md:block'>
                                  {anchors.view_detail_button}
                                </button>
                              </a>
                            </div>
                          </div>
                        </>
                      )
                  )}
                </div>
                <div className='mt-10'>
                  <div className='grid gap-12 md:grid-cols-3'>
                    {sortArray(article[1]).map(
                      (blog, ind) =>
                        (ind < cardNumber || (['sm', 'md', 'xs'].includes(dev[0]) && ind < 5)) && (
                          <div className='border-b-4 border-primary' id={ind + 100} key={ind}>
                            <div className='relative'>
                              <a href={`/${blog.full_slug}`}>
                                <Image
                                  onClick={() => pathDetail(ind + 100)}
                                  className='rounded-lg cursor-pointer'
                                  alt={blog.content.alt}
                                  src={blog.content.hero_image}
                                  height={blog.content.hero_image_height}
                                  width={blog.content.hero_image_width}
                                  objectFit='cover'
                                  placeholder='blur'
                                  blurDataURL={blog.content.hero_image}
                                />
                              </a>
                            </div>
                            <p className='mt-2 text-light-grey-300 text-14px'>
                              {blog.content.author.trim()},{' '}
                              {dayjs(blog.content?.publishing_date, { locale: language }).format('Do MMMM YYYY')}
                            </p>
                            <a href={`/${blog.full_slug}`}>
                              <p
                                onClick={() => pathDetail(blog, ind + 100)}
                                className={`line-clamp-1 text-20px font-medium leading-32px cursor-pointer hover:text-primary my-3`}>
                                {blog.content.title}
                              </p>
                            </a>
                            <div
                              className={`${Styles['rich-text-list']} line-clamp-3 text-18px leading-28px opacity-60 mb-4 ms-break-line font-thin`}
                              dangerouslySetInnerHTML={{
                                __html: StoryblokService.client.richTextResolver.render(blog.content.abstract),
                              }}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
                <div id={router.query.language.includes('en') ? 'Music-Teachers' : 'Musiklehrpersonen'} />
                {article[1].length > 4 && cardNumber === 3 && (
                  <div
                    className={`${
                      router.query.slug[0] !== 'blog'
                        ? 'justify-center hidden' && setCardNumber(article[1].length)
                        : 'justify-center hidden md:flex'
                    }`}>
                    <button onClick={() => setCardNumber(article[1].length)} type='button' className='btn-outline mt-9'>
                      {' '}
                      {anchors.load_more_button}
                    </button>
                  </div>
                )}
                {cardNumber > 3 && router.query.slug[0] === 'blog' && (
                  <div className={`${article[1].length < 4 ? 'hidden' : 'md:flex'} justify-center`}>
                    <button onClick={() => setCardNumber(3)} type='button' className='btn-outline mt-9'>
                      {' '}
                      {anchors.load_less_button}
                    </button>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};
BlogLanding.displayName = 'BlogLanding';
export default BlogLanding;
