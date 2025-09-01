import { getStaticProps } from './page/[page_index]';
import JobPage from './page/[page_index]';

export default JobPage;

export async function getStaticPaths({ params }) {
  
  return {
    paths: [
      {
        params: {
          language: 'ch-en',
        },
      },
      {
        params: {
          language: 'ch-de',
        },
      },
    ],

    fallback: 'blocking',
  };
}
export { getStaticProps };
