import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import InstrumentLandingPage from '../../../../components/InstrumentLandingPage';
import { getInstrumentById } from '@/utils/getInstrumentById';
import StoryblokService from '../../../../utils/storyblok-service';
import { findComponent, transformInstrumentLocations } from '../../../../utils';
import { searchClient, instrumentsIndex, algoliaClient } from '../../../../config';
import { fetchInstrumentsData, fetchTeachersData, fetchStoryData, fetchInstrumentLocations } from '../../../../apiHelpers';
import StructuredData from '@/components/StructuredData';

const getTeachers = algoliaClient.initIndex(process.env.ALGOLIA_TEACHERINDEX);
const likes = searchClient.initIndex(process.env.ALGOLIA_RECOMMENDATION_INDEX);
export async function getStaticProps() {
  const language = 'ch-en';
  const [instruments, storyFetchResult, teachers, likesList] = await Promise.all([
    fetchInstrumentsData(instrumentsIndex),
    fetchStoryData(StoryblokService, language, 'music-lessons/drums-lessons'),
    fetchTeachersData(getTeachers, 'drums'),
    likes.search('drums'),
  ]);

  const instrument = getInstrumentById(instruments, 'drums', 'en') || null;
  const story = storyFetchResult.result?.data?.story || null;
  const status = storyFetchResult.status;
  return {
    props: {
      recommendations: likesList?.hits || [],
      instrument,
      instruments,
      _online: teachers?.hits || [],
      language,
      story,
      status,
    },
    revalidate: 86400,
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { language: 'ch-en' } }, { params: { language: 'ch-de' } }],
    fallback: 'blocking',
  };
}

function DrumsLessonsPage({ story, language, instrument, instruments, _online, recommendations }) {
  const [onlineTeachers, setOnlineTeachers] = useState(_online || []);
  const [instrumentLocations, setInstrumentLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInstrumentLocations = async () => {
      setIsLoading(true);
      const { data, error } = await fetchInstrumentLocations(language);
      const transformOptions = {
        oldInstrument: 'piano',
        newInstrument: 'drums',
        oldLesson: 'Piano',
        newLesson: 'Drums',
        oldUrl: 'piano',
        newUrl: 'drums',
      };

      const transformedData = transformInstrumentLocations(data, transformOptions);
      if (data) setInstrumentLocations(transformedData);
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
          'ch-en/music-lessons/drums-lessons',
          'ch-de/musikunterricht/schlagzeugunterricht'
        ))
      }
    >
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
          mainTitle: `Drums lessons in Switzerland`,
          teacherTitle: 'Our qualified drums teachers',
          recommendationsTitle: 'Recommendations from our drum students',
        }}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I know that the drums teachers are qualified?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'All Matchspace Music drum teachers are checked by a qualified music teacher and activated on our platform.',
              },
            },
            {
              '@type': 'Question',
              name: 'How much do drum lessons cost?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The cost of a lesson varies from canton to canton and starts at around CHF 85 to CHF 115 per hour. A subscription with 5 lessons costs around CHF 340 for children and around CHF 425 for adults.',
              },
            },
            {
              '@type': 'Question',
              name: 'From what age can you learn to play the drums?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Children can learn to play the drums from around 5 - 7 years old, depending on their stage of development. Drum lessons are also excellent for teenagers, adults and even seniors up to an advanced age.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where do the drum lessons take place?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Our drum teachers offer their lessons in their studio, as a home visit, i.e. at students' homes, or online lessons if required.",
              },
            },
            {
              '@type': 'Question',
              name: 'How do I find the right drum teacher?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Hundreds of qualified drum teachers teach at Matchspace Music. Search for the instrument in your area and choose the teacher that suits your needs. Get in touch and arrange your first lesson.',
              },
            },
          ],
        }}
      />
    </Layout>
  );
}
export default DrumsLessonsPage;
