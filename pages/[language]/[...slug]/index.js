import React from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { searchClient } from '../../../config';
import algoliasearch from 'algoliasearch/lite';
import * as algoliaCacheCommon from '@algolia/cache-common';
import { getStory, getLocation, getZoomLevel, getAroundRadius, getInstrumentById } from '../../../utils';
import { getComponentByKey } from '../../../utils/getComponentByKey';
import StoryblokService from '../../../utils/storyblok-service';
import LocationPage from '../../../components/LocationPage';
import { getAlgoliaData } from '../../../utils/algolia';
import Layout from '../../../components/Layout';

const Page = dynamic(() => import('../../../components/Page'));
const BlogLanding = dynamic(() => import('../../../components/BlogLandingPage'));

const mapboxToken = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const instrumentsIndex = searchClient.initIndex(process.env.ALGOLIA_INSTRUMENTS);

const algoliaConfig = {
  appId: process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID,
  apiKey: process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY,
};

const algoliaClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey, {
  hostsCache: algoliaCacheCommon.createNullCache(),
  requestsCache: algoliaCacheCommon.createNullCache(),
  responsesCache: algoliaCacheCommon.createNullCache(),
});

const getTeachers = (isReplica) => {
  const indexName = isReplica ? process.env.ALGOLIA_TEACHERINDEX_SW : process.env.ALGOLIA_TEACHERINDEX;
  return algoliaClient.initIndex(indexName);
};

export async function getStaticProps({ req, params }) {
  //STORYBLOK COMPONENTS DYNAMIC RENDERING
  StoryblokService.setQuery(params || {});
  let slug = params?.slug;
  let language = params?.language || 'ch-en';
  let res = {};
  let instruments = [];
  let status = 200;
  let articles = {};

  try {
    // instruments = await instrumentsIndex.search('', {
    //   hitsPerPage: 1000,
    // });
    instruments = await getAlgoliaData({
      type: 'instruments',
      url: process.env.ALGOLIA_URL,
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const baseCdnUrl = 'cdn/stories';
    const slugsUrl = slug.join('/');

    const res = await StoryblokService.get(`${baseCdnUrl}/${language}/${slugsUrl}`, {
      resolve_relations: 'global_reference.reference',
    });

    const articles = await StoryblokService.get(`cdn/stories/`, {
      starts_with: `${language}/${language.includes('en') ? 'blog-en' : 'blog-de'}`,
      sort_by: 'content.date:desc',
    });

    return {
      props: {
        res,
        language,
        slug,
        articles,
        status: 200,
        instruments: instruments?.data,
        // instruments: instruments?.hits || [],
      },
    };
  } catch (err) {
    console.log('error: ', err?.response?.status);

    if (err.response?.status === 404 || err?.response?.status === 400) {
      try {
        const _params = params || {};
        const language = params?.language.split(/[-]+/).pop();
        _params.location = params?.slug[1];
        _params.instruments = params?.slug[0];

        const location = params.location.replaceAll('+', '/').split('-');
        const instrumentQuery = _params?.instruments.split(/[-]+/).slice(0, -1);
        const instrumentId = instrumentQuery.join('-');

        const aroundLatLng = await getLocation(_params, mapboxToken);
        const locationName = await getLocation(_params, mapboxToken, true);
        const story = await getStory(`/${_params.language}`);

        const instrumentsData = await getAlgoliaData({
          type: 'instruments',
          url: process.env.ALGOLIA_URL,
        });
        const instruments = instrumentsData?.data?.map((item) => ({
          ...item,
          de: item.de,
          en: item.en,
          id: item.id,
          key: item.key,
        }));
        // const instrumentsData = await instrumentsIndex.search('', {
        //   hitsPerPage: 400,
        // });
        // const instruments = (instrumentsData?.hits || [])?.map((item) => ({
        //   ...item,
        //   de: item.de,
        //   en: item.en,
        //   id: item.id,
        //   key: item.key,
        // }));
        const instrument = getInstrumentById(instruments, instrumentId, language) || null;
        const searchState = { query: instrumentId };
        const locationItemsLength = location?.length;

        const radius = getAroundRadius(locationItemsLength);
        const zoomLevel = getZoomLevel(locationItemsLength);
        const fullLocationName = locationName?.matching_place_name || _params?.location || '';
        const isSwitzerland = ['switzerland', 'schweiz'].includes(_params.location);
        const fullQuery = `${instrument?.key || ''} ${aroundLatLng} ${fullLocationName}`;
        const ip = `${req?.headers['x-forwarded-for'] || '146.70.126.101'}`;

        const locationNameSort = `${params.location || ''}`.split(/[-,]/)[0];

        const teachers = await getTeachers(isSwitzerland).search(fullQuery, {
          hitsPerPage: 500,
          getRankingInfo: true,
          advancedSyntax: true,

          aroundPrecision: [
            { from: 0, value: 2000 },
            { from: 6010, value: 4000 },
            { from: 14010, value: 10000 },
            { from: 34010, value: 40000 },
          ],
          // minimumAroundRadius: 40000,
          // aroundRadius: radius ? radius : 'all',
          optionalWords: [aroundLatLng, `${fullLocationName}`],
          ...(ip && (isSwitzerland || !_params?.location)
            ? {
              aroundLatLngViaIP: true,
              headers: { 'X-Forwarded-For': ip },
            }
            : { aroundLatLng }),
        });
        const teachersData = [];
        const onlineTeachers = [];

        teachers?.hits?.filter((item) => {
          const isOnlyOnline =
            !item?.locations?.teacher_place?.checked &&
            (!item?.locations?.studios?.checked || !item?.locations?.studios?.address_list?.length) &&
            (!item?.locations?.student_place?.checked || !item?.locations?.student_place?.address_list?.length);

          if (item?.locations?.online && isOnlyOnline) {
            onlineTeachers.push(item);
          } else {
            teachersData.push(item);
          }

          return item;
        });

        if (instrument?.key === undefined) {
          throw new Error();
        } else {
          return {
            props: {
              story,
              radius,
              location,
              zoomLevel,
              instrument,
              instruments,
              searchState,
              isSwitzerland,
              params: _params,
              userToken: uuidv4(),
              _online: onlineTeachers,
              resultsState: teachersData,
              language: _params?.language,
              locationName: fullLocationName,
              locationData: locationName || null,
              _prevInstrument: instrument?.key || null,
              ipAddress: isSwitzerland ? ip || '' : '',
              aroundLatLng: teachers?.aroundLatLng || aroundLatLng || null,
            },
            revalidate: 600,
          };
        }
      } catch (err) {
        // If location page parsing failed, return 404
        console.error('Location page parsing failed:', err);
      }
    }

    try {
      res = await StoryblokService.get(`cdn/stories/${language}/page-not-found`, {
        resolve_relations: 'global_reference.reference',
      });
    } catch (err) {
      console.error('Failed to fetch 404 page:', err);
      res = { data: { story: null } };
    }

    return {
      props: {
        res,
        language,
        slug,
        articles: {},
        status: 404,
        instruments: [],
      },
    };
  }
}

function findSubstring(inputStr) {
  const substrings = ['ch-de', 'ch-en'];
  for (const substr of substrings) {
    if (inputStr.includes(substr)) {
      return substr;
    }
  }
  return null;
}

export async function getStaticPaths({ params }) {
  let res = await StoryblokService.get('cdn/links/');

  let paths = [];
  Object.keys(res?.data.links).forEach((linkKey) => {
    const link = res.data.links[linkKey];
    if (
      res?.data.links[linkKey].is_folder ||
      res?.data.links[linkKey].slug === '/' ||
      link.slug.includes('global/navigation') ||
      link.slug.includes('test/navigation')
    ) {
      return;
    }

    const fullSlug = link.slug;
    const language = findSubstring(fullSlug);
    if (!language) return;

    const segments = fullSlug.split('/').filter(Boolean);
    if (segments[0] === language) {
      segments.shift();
    }

    const excludedPaths = ['music-lessons', 'musikunterricht'];

    if (segments.length >= 1 && !excludedPaths.includes(segments[0])) {
      paths.push({ params: { language, slug: segments } });
    }
  });
  return { paths, fallback: 'blocking' };
}

class LocationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: props?.res?.data?.story,
      language: props.language,
      slug: props.slug,
      articles: props.articles,
      status: props.status,
    };
  }

  componentDidMount() {
    StoryblokService.initEditor(this);
  }

  changeLanguage = (event) => {
    this.setState({ language: event }, () => {
      location.href = location.href.replace(this.state.story.full_slug, this.state?.story?.alternates[0]?.full_slug);
    });
  };

  render() {
    const contentOfStory = this.state?.story?.content;
    const extendedMetaData = getComponentByKey(contentOfStory?.body, 'meta_data', 'component');

    const metaData = {
      ...contentOfStory?.meta,
      og_url: extendedMetaData?.og_url,
    };

    return (
      <>
        {this.props?.story ? (
          <LocationPage {...this.props} />
        ) : (
          <Layout
            noIndex={contentOfStory?.noIndex}
            language={this.state.language}
            meta={metaData}
            keywords={contentOfStory?.keywords}
            alternateSlug={this.state?.story?.alternates[0]?.full_slug}
            story={contentOfStory}
            languageChange={this.changeLanguage}>
            {this.state.slug === 'blog' ? (
              <BlogLanding blok={this.state.articles} anchors={contentOfStory} />
            ) : (
              <Page className='ms-page-scroll' content={contentOfStory} instruments={this.props.instruments} />
            )}
          </Layout>
        )}
      </>
    );
  }
}

export default LocationsPage;
