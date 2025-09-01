import { useIntersectionObserver } from '../hooks/usehooks-ts';
import StoryblokService from '../utils/storyblok-service';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Head = dynamic(() => import('../components/Head'));
const Navigation = dynamic(() => import('../components/navigation/Navigation'));
const Footer = dynamic(() => import('./footer/Footer'));

const INDEX = process.env.ALGOLIA_TEACHERINDEX;

const Layout = ({ children, language, meta, languageChange, keywords, alternateSlug, story, noIndex }) => {
  const ref = useRef(null);
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const showForm = [show, setShow];

  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  let newAlternateSlug = alternateSlug?.substr(alternateSlug.length - 1);
  if (newAlternateSlug === '/') {
    alternateSlug = alternateSlug.substr(0, alternateSlug.length - 1);
  }

  if (['ch-en/', 'ch-de/'].includes(alternateSlug)) {
    alternateSlug = alternateSlug.substr(0, alternateSlug.length - 1);
  }
  let asPath = '';
  if (router.asPath.substr(-1) === '/') {
    asPath = router.asPath.substr(0, router.asPath.length - 1);
  } else {
    asPath = router.asPath;
  }

  const pageNoIndex = noIndex === undefined ? !!INDEX.includes('pp_') : noIndex;

  return (
    <>
      <Head
        meta={meta}
        keywords={keywords}
        location={asPath}
        language={language?.slice(3)}
        alternateSlug={alternateSlug}
        noIndex={pageNoIndex}
      />
      <div ref={ref} />
      <Navigation
        language={language}
        languageContent={languageChange}
        isVisible={isVisible}
        story={story}
        showForm={showForm}
      />
      {children}
      <Footer story={story} />
      {StoryblokService.bridge()}
    </>
  );
};

export default Layout;
