import { CarouselJsonLd } from 'next-seo';

const JsonLd = ({ hits }) => (
  <CarouselJsonLd
    type='course'
    data={hits.map((hit) => ({
      courseName: hit.name.replace(/['"]+/g, ''),
      description: hit?.instructor?.teaching_philosophy
        ? JSON.parse(JSON.stringify(hit.instructor.teaching_philosophy.replace(/['"]+/g, '')))
        : '',
      providerName: 'Matchspace Music',
      providerUrl: 'https://matchspace-music.ch',
      url: `https://app.matchspace-music.ch/course/${hit.id}`,
    }))}
  />
);

export default JsonLd;
