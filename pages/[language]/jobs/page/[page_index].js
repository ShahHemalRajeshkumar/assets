import StoryblokService from '@/utils/storyblok-service';
import { getAllChannableData } from '@/utils/getAllChannableData';
import Layout from '@/components/Layout';
import SearchForm from '@/components/jobs/Search/SearchForm';
import JobPageHeader from '@/components/jobs/JobPageHeader/JobPageHeader';

import { isEmpty } from 'ramda';

const JOBS_PER_PAGE = 15;


const createMetaDataByLanguage = (language) => {
  const is_english = language === 'ch-en';
  const meta = {
    title: is_english ? 'Music Teacher Jobs in Switzerland' : 'Musiklehrer Stellenangebote - Musiklehrer*innen gesucht',
    description: is_english
      ? 'We are looking for qualified music teachers for private lessons. Find freelance music teacher jobs near you. Teach when and wherever you want'
      : 'Finde einen Job als freiarbeitende Musiklehrer*in und unterrichte flexibel Musikschüler*innen in deiner Nähe',
    og_title: is_english
      ? 'Music Teacher Jobs in Switzerland'
      : 'Musiklehrer Stellenangebote - Musiklehrer*innen gesucht',
    og_image: is_english
      ? 'https://a.storyblok.com/f/121094/400x400/42cba5c7cd/musiklehrer-jobs.jpg'
      : 'https://a.storyblok.com/f/121094/400x400/42cba5c7cd/musiklehrer-jobs.jpg',
    og_description: is_english
      ? 'We are looking for qualified music teachers for private lessons. Freelance music teacher jobs near you. Teach when and wherever you want'
      : 'Finde einen Job als freiarbeitende Musiklehrer*in und unterrichte flexibel Musikschüler*innen in deiner Nähe',
    og_type: 'website',
    og_locale: is_english ? 'en' : 'de',
  };
  return meta;
};

const changeLanguage = (language, currentPage) => {
  const targetLanguage = language === 'ch-de' ? 'ch-en' : 'ch-de';

  if (currentPage > 1) {
    location.href = location.href.replace(`${language}/jobs/page/${currentPage}`, `${targetLanguage}/jobs`);
  } else {
    location.href = location.href.replace(`${language}/jobs`, `${targetLanguage}/jobs`);
  }
};

function JobsPage({ jobOffers, numPages, currentPage, storyblokData, language }) {

  return (
    <Layout
      meta={createMetaDataByLanguage(language)}
      language={language}
      alternateSlug={storyblokData.alternates[0].full_slug}
      story={storyblokData.content}
      languageChange={() => changeLanguage(language, currentPage)}>
      <JobPageHeader language={language} />
      {isEmpty(jobOffers) ? (
        <div className="mt-10 contain lg:mt-16">
          <p>
            {language === 'ch-en'
              ? 'Currently no job offers. Please check back in a while.'
              : 'Derzeit keine Stellenangebote. Bitte schauen Sie später noch einmal vorbei.'}
          </p>
        </div>
      ) : (
        <SearchForm language={language} allJobOffers={jobOffers} currentPage={currentPage} numPages={numPages} />
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  
  const { language } = params;
  let sbData;
  let status = 200;

  try {
    sbData = await StoryblokService.get(`cdn/stories/${language}`, {
      resolve_relations: 'global_reference.reference',
      sbParams: 'published',
    });
  } catch (err) {
    status = err.response.status;
    sbData = await StoryblokService.get(`cdn/stories/${language}/page-not-found`, {
      resolve_relations: 'global_reference.reference',
    });
  }

  const storyblokData = sbData?.data?.story;
  const channableData = await getAllChannableData();

  const filteredByLanguage = channableData?.filter((job) => job.language_id === language.slice(3));

  const page = parseInt((params && params.page_index) || 1);
  const numPages = Math.ceil(filteredByLanguage.length / JOBS_PER_PAGE);

  return {
    props: {
      storyblokData,
      jobOffers: filteredByLanguage,
      numPages,
      currentPage: page,
      language,
    },
    revalidate: 60,
  };
}

export default JobsPage;
