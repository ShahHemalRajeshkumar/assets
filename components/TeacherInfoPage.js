// import aa from 'search-insights';
import dynamic from 'next/dynamic';
import SnackbarProvider from 'react-simple-snackbar';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useRef, useState, useMemo, useEffect } from 'react';
import { getTeacherTitle } from './TeacherInfoPage/TeacherContent/TeacherContentHead/functions';
import { getTeacherInfoStructureData } from '../utils/getTeacherInfoStructureData';
import useTeacherAnalytics from './TeacherInfoPage/useTeacherAnalytics';
import { useIntersectionObserver } from '../hooks/usehooks-ts';
import TeacherInfo from './TeacherInfoPage/TeacherInfo';
import StructuredData from './StructuredData';

const Navigation = dynamic(() => import('./navigation/Navigation'));
const Footer = dynamic(() => import('./footer/Footer'));
const Seo = dynamic(() => import('./Seo'));

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

// const algoliaConfig = {
//   appId: process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID,
//   apiKey: process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY,
// };

const TeacherInfoPage = ({ params, story, userToken, teacher }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const entry = useIntersectionObserver(ref, {});

  const showForm = [show, setShow];
  const isVisible = !!entry?.isIntersecting;

  const meta = useMemo(
    () => ({
      title:
        params?.language == 'ch-en'
          ? `${teacher?.name} ∙ Music teacher ∙ Matchspace Music`
          : `${teacher?.name} ∙ Musiklehrer/in ∙ Matchspace Music`,
      description: getTeacherTitle(teacher, params?.language),
    }),
    [teacher, params]
  );

  const siteUrl = typeof window === 'undefined' ? '' : window.location.origin;
  const seoParams = useMemo(
    () => ({
      ...params,
      pageUrl: `${siteUrl}/${params.language}/teachers/${teacher?.username}`,
      imageUrl: teacher?.avatar_path,
      links: [
        { rel: 'alternate', href: `${siteUrl}/ch-de/teachers/${teacher?.username}`, hreflang: 'de-ch' },
        { rel: 'alternate', href: `${siteUrl}/ch-de/teachers/${teacher?.username}`, hreflang: 'de' },
        { rel: 'alternate', href: `${siteUrl}/ch-en/teachers/${teacher?.username}`, hreflang: 'en' },
        { rel: 'alternate', href: `${siteUrl}/ch-en/teachers/${teacher?.username}`, hreflang: 'x-default' },
      ],
    }),
    [teacher, params, siteUrl]
  );

  const cookies = useMemo(() => {
    const data = {};

    if (typeof window !== 'undefined') {
      document?.cookie?.split(';')?.map((item) => {
        const split = String(item || '')
          .trim()
          .split('=');
        data[split[0]] = split[1];
        return item;
      });
    }

    return data;
  }, []);

  const [, setCookie] = useCookies(['_ALGOLIA']);

  useEffect(() => {
    if (!cookies['_ALGOLIA']) {
      // aa('init', { ...algoliaConfig, useCookie: true });

      const date = new Date();
      date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);

      setCookie('_ALGOLIA', userToken, {
        path: '/',
        expires: date,
        domain: COOKIE_DOMAIN,
      });
    }
  }, [cookies, userToken, setCookie]);

  const token = useMemo(() => cookies['_ALGOLIA'] || userToken, [cookies, userToken]);

  const seoActions = useTeacherAnalytics({
    teacher,
    algolia_user_token: token,
    user_language: params?.language,
  });

  useEffect(() => {
    setTimeout(() => setVisible(true), 1000);
  }, []);

  return (
    <CookiesProvider>
      <div className='teacher-page'>
        <Seo params={seoParams} meta={meta} />
        {visible && <StructuredData data={getTeacherInfoStructureData({ teacher, meta, seoParams })} />}
        <Navigation
          story={story}
          isOnSearchPage
          isTeacherInfoPage
          showForm={showForm}
          isVisible={isVisible}
          languageContent={null}
          language={params?.language}
        />
        <SnackbarProvider>
          <TeacherInfo teacher={teacher} seoActions={seoActions} language={params?.language} />
        </SnackbarProvider>
        <Footer isTeacherInfoPage story={story} />
      </div>
    </CookiesProvider>
  );
};

export default TeacherInfoPage;
