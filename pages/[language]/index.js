import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { getComponentByKey } from '../../utils/getComponentByKey';
import StoryblokService from '../../utils/storyblok-service';
import { getAlgoliaData } from '../../utils/algolia';
import { getCached, setCache } from '../../utils/server-cache';
import Layout from '../../components/Layout';

const Page = dynamic(() => import('../../components/Page'), { ssr: true });
const TeacherCallbackPopups = dynamic(() => import('../../components/TeacherInfoPage/TeacherCallbackPopups'), { ssr: false });

const LanguageIndexPage = ({ res, language, instruments }) => {
  useEffect(() => {
    StoryblokService.initEditor(this);
  }, []);

  const changeLanguage = () => {
    const { story } = res.data;
    if (story.alternates.length > 0) {
      const alternateSlug = story.alternates[0].full_slug;
      location.href = location.origin + '/' + alternateSlug;
    }
  };

  const contentOfStory = res?.data?.story?.content;
  const extendedMetaData = getComponentByKey(contentOfStory?.body, 'meta_data', 'component');
  const metaData = {
    ...contentOfStory?.meta,
    og_url: extendedMetaData?.og_url,
  };


  return contentOfStory ? (
    <Layout
      language={language}
      meta={metaData}
      keywords={contentOfStory?.keywords}
      alternateSlug={res.data.story.alternates[0].full_slug}
      languageChange={changeLanguage}
      story={contentOfStory}>
      <>
        <TeacherCallbackPopups isHomePage={true} language={language} />
        <Page
          content={contentOfStory}
          className='ms-page-scroll'
          // instruments={instruments || []}
          instruments={instruments?.data || []}
        />
      </>
    </Layout>
  ) : null;
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { language: 'ch-en' } },
      { params: { language: 'ch-de' } }
    ],
    fallback: 'blocking',
  };
}

// const instrumentsIndex = searchClient.initIndex(process.env.ALGOLIA_INSTRUMENTS);

export async function getStaticProps({ params }) {
  const language = params.language || 'ch-en';
  const isUsername = ['ch-en', 'ch-de'].includes(params.language);

  if (!isUsername) {
    return {
      redirect: {
        permanent: true,
        destination: `/ch-en/teachers/${params.language}`,
      },
    };
  }

  StoryblokService.setQuery(params);

  try {
    // Check cache first
    const cacheKey = `page-${language}`;
    const instrumentsCacheKey = 'instruments-data';
    
    let res = getCached(cacheKey);
    let instrumentsData = getCached(instrumentsCacheKey);
    
    const promises = [];
    
    if (!res) {
      promises.push(
        StoryblokService.get(`cdn/stories/${language}`, {
          resolve_relations: 'global_reference.reference',
          sbParams: 'published',
        }).then(data => {
          setCache(cacheKey, data);
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(res));
    }
    
    if (!instrumentsData) {
      promises.push(
        getAlgoliaData({
          type: 'instruments',
          url: process.env.ALGOLIA_URL,
        }).then(data => {
          setCache(instrumentsCacheKey, data);
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(instrumentsData));
    }
    
    const [storyRes, algoliaRes] = await Promise.allSettled(promises);
    res = storyRes;
    instrumentsData = algoliaRes;

    return {
      props: {
        res: res.status === 'fulfilled' ? res.value : null,
        status: res.status === 'fulfilled' ? 200 : 500,
        language,
        instruments: instrumentsData.status === 'fulfilled' ? instrumentsData.value || [] : [],
      },
      revalidate: 3600, // Cache for 1 hour
    };
  } catch (error) {
    return {
      props: {
        res: null,
        status: 500,
        language,
        instruments: [],
      },
      revalidate: 60, // Retry after 1 minute on error
    };
  }
}

export default LanguageIndexPage;
