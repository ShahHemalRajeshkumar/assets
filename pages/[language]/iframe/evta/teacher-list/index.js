import React from 'react';
import { attributesToRetrieve } from '../../../../../constants/algoliaAttributes';
import EvtaTeachers from '../../../../../components/evta/EvtaTeachers';
import { searchClient } from '../../../../../config';

const EVTA_QUERY = 'EVTA';
const EVTA_INSTRUMENT = 'singing';
const instruments = searchClient.initIndex(process.env.ALGOLIA_INSTRUMENTS);
const teachers = searchClient.initIndex(process.env.ALGOLIA_TEACHERINDEX_EVTA);
const defaultInstrument = {
  id: 77,
  de: 'Gesang',
  en: 'Singing',
  key: 'singing',
  popular_index: 3,
  sub_category: 'voice',
  delimiter_teacher: 'slehrer*in',
  delimiter_lessons: 'sunterricht',
};
export async function getStaticProps({ params }) {
  const allInstruments = await instruments.search(EVTA_INSTRUMENT);

  const teachersData = await teachers.search(EVTA_QUERY, {
    hitsPerPage: 300,
    attributesToRetrieve,
  });

  return {
    props: {
      teachers: teachersData?.hits || [],
      language: params?.language || 'ch-en',
      instrument:
        allInstruments?.hits?.find((item) => item?.key === EVTA_INSTRUMENT) ||
        defaultInstrument,
    },
    revalidate: 86400, 
  };
}
export async function getStaticPaths() {
  const paths = ['ch-en', 'ch-de'].map((lang) => ({
    params: { language: lang },
  }));

  return { paths, fallback: 'blocking' };
}

class TeachersEvtaPage extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    return <EvtaTeachers {...this.props} />;
  }
}
export default TeachersEvtaPage;
