import React, { useState, useEffect } from 'react';
import { searchClient, instrumentsIndex, algoliaClient } from '../../../../config';
import InstrumentLandingPage from '../../../../components/InstrumentLandingPage';
import StoryblokService from '../../../../utils/storyblok-service';
import { getInstrumentById } from '@/utils/getInstrumentById';
import StructuredData from '@/components/StructuredData';
import Layout from '../../../../components/Layout';
import { findComponent } from '../../../../utils';
import {
  fetchInstrumentLocations,
  fetchInstrumentsData,
  fetchTeachersData,
  fetchStoryData,
} from '../../../../apiHelpers';

const likes = searchClient.initIndex(process.env.ALGOLIA_RECOMMENDATION_INDEX);
const getTeachers = algoliaClient.initIndex(process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT);
export async function getStaticProps() {
  const language = 'ch-de';
  const instruments = await fetchInstrumentsData(instrumentsIndex);

  const instrument = getInstrumentById(instruments, 'piano', 'en') || null;

  const storyFetchResult = await fetchStoryData(
    StoryblokService,
    language,
    'musikunterricht/klavierunterricht'
  );
  const teachers = await fetchTeachersData(getTeachers, instrument?.key);

  const story = storyFetchResult.result?.data?.story || null;
  const status = storyFetchResult.status;

  const likesList = (await likes?.search('piano'))?.hits || [];

  return {
    props: {
      recommendations: likesList,
      instrument,
      instruments,
      _online: teachers?.hits || [],
      language,
      story,
      status,
    },
    revalidate: 60,
  };
}

function KlavierunterrichtPage({
  story,
  language,
  instrument,
  instruments,
  _online,
  recommendations,
}) {
  const [onlineTeachers, setOnlineTeachers] = useState(_online || []);
  const [instrumentLocations, setInstrumentLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInstrumentLocations = async () => {
      setIsLoading(true);
      const { data, error } = await fetchInstrumentLocations('ch-de');
      if (data) setInstrumentLocations(data);
      if (error) setError(error);
      setIsLoading(false);
    };

    loadInstrumentLocations();
  }, [language]);

  const [globalReference, pageContent] = story.content.body;

  const componentIds = [
    'hero-component',
    'two-col-component',
    'links-component',
    'table-component',
    'faq-component',
    'two-col-component-2',
    'teaser-component',
    'lined-card-component',
  ];

  const [
    heroComponent,
    twoColComponent,
    linksComponent,
    tableComponent,
    faqComponent,
    twoColComponent2,
    teaserComponent,
    linedCardComponent,
  ] = componentIds.map((id) => findComponent(pageContent.components, id));

  return (
    <Layout
      noIndex={story?.content?.noIndex}
      meta={story?.content?.meta}
      keywords={story?.content?.keywords}
      alternateSlug={story.alternates[0]?.full_slug}
      language={language}
      story={story?.content}
      languageChange={() =>
        (location.href = location.href.replace(
          'ch-de/musikunterricht/klavierunterricht',
          'ch-en/music-lessons/piano-lessons'
        ))
      }>
      <InstrumentLandingPage
        recommendations={recommendations}
        teachers={onlineTeachers}
        instrument={instrument}
        language={language}
        instrumentLocations={instrumentLocations}
        pageContent={{
          heroComponent,
          twoColComponent,
          linksComponent,
          tableComponent,
          faqComponent,
          twoColComponent2,
          teaserComponent,
          linedCardComponent,
        }}
        titleTexts={{
          mainTitle: 'Klavierunterricht in der Schweiz',
          teacherTitle: 'Unsere qualifizierten Klavierlehrer*innen',
          recommendationsTitle: 'Empfehlungen unserer Klavier-Schüler*innen',
        }}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Wie weiss ich, dass die Klavierlehrer*innen qualifiziert sind?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Alle Klavierlehrer*innen von Matchspace Music werden von einer ausgebildeten Musiklehrer*innen geprüft und auf unserer Plattform freigeschalten.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wieviel kostet der Klavierunterricht?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die Kosten für eine Stunde Unterricht unterscheiden sich von Kanton zu Kanton und beginnen bei ca. CHF 85 bis CHF 115 pro Stunde...',
              },
            },
            {
              '@type': 'Question',
              name: 'Ab welchem Alter kann man Klavier spielen lernen?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kinder können Klavier je nach Entwicklungsstand bereits ab ca. 4 Jahren spielen lernen...',
              },
            },
            {
              '@type': 'Question',
              name: 'Wo findet der Klavierunterricht statt?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Unsere Klavierlehrpersonen bieten ihren Unterricht im Studio, als Hausbesuch oder online an.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wie finde ich die passende Klavierlehrperson?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bei Matchspace Music unterrichten hunderte qualifizierte Klavierlehrer*innen. Suche nach dem Instrument in deiner Nähe...',
              },
            },
          ],
        }}
      />
    </Layout>
  );
}
export default KlavierunterrichtPage;
