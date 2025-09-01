import React from 'react';
import { attributesToRetrieve } from '../../../../../constants/algoliaAttributes';
import EvtaMap from '../../../../../components/evta/EvtaMap';
import { searchClient } from '../../../../../config';

const EVTA_QUERY = 'EVTA';
const teachers = searchClient.initIndex(process.env.ALGOLIA_TEACHERINDEX_EVTA);
export async function getStaticProps({ params }) {
  const [teachersData1, teachersData2] = await Promise.all([
    teachers.search(EVTA_QUERY, {
      page: 0,
      hitsPerPage: 250,
      attributesToRetrieve,
    }),
    teachers.search(EVTA_QUERY, {
      page: 1,
      hitsPerPage: 250,
      attributesToRetrieve,
    }),
  ]);

  const data = [
    ...(teachersData1?.hits || []),
    ...(teachersData2?.hits || []),
  ];

  return {
    props: {
      teachers: data || [],
      language: params?.language || 'ch-en',
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
class TeachersEvtaMapPage extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    return <EvtaMap {...this.props} />;
  }
}
export default TeachersEvtaMapPage;
