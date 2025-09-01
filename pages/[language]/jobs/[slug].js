/* eslint-disable react/jsx-key */
import { getAllChannableData } from '@/utils/getAllChannableData';
import StoryblokService from '@/utils/storyblok-service';
import { extractSlugFromURL } from '@/components/job/util';
import Layout from '@/components/Layout';
import IconsSection from '@/components/job/IconsSection';
import AdPageHeader from '@/components/job/AdPageHeader';
import HighlightedSection from '@/components/job/HighlightedSection';
import InformativeSection from '@/components/job/InformativeSection';
import InformativeImageSection from '@/components/job/InformativeImageSection';
import CallToActionBanner from '@/components/job/CallToActionBanner';
import StructuredData from '@/components/StructuredData';
import { getJobPageStructuredData } from '@/utils/getJobPageStructuredData';
import { useRouter } from 'next/router';
import FormSection from '@/components/jobs/FormSection/FormSection';
import SignupFormComponent from '@/components/SignupFormComponent';
import JobStory from '@/components/jobs/JobStory/JobStory';
import { getInitialWordFromString } from '@/utils/getInitialWordFromString';

const metaDataMapper = ({ meta_title, og_title, meta_description, og_description, og_image, og_type, og_locale }) => {
  return {
    title: meta_title,
    og_title,
    description: meta_description,
    og_description,
    og_image,
    og_type,
    og_locale,
  };
};

function Jobs({ jobOffer, storyblokData, language }) {

  const isFrenchKeyword = getInitialWordFromString(jobOffer?.subcategory_name)

  const router = useRouter();
  const changeLanguage = (language, alternateURL) => {
    const slug = extractSlugFromURL(alternateURL).replace(/\s+/g, '-');
    router.push({
      pathname: slug,
      query: {
        language: language === 'ch-de' ? 'ch-en' : 'ch-de',
      },
    });
  };


  return (
    <>
      <StructuredData data={getJobPageStructuredData(jobOffer)} />
      <Layout
        meta={metaDataMapper(jobOffer)}
        language={language}
        alternateSlug={storyblokData.alternates[0].full_slug}
        story={storyblokData.content}
        languageChange={() => changeLanguage(language, jobOffer.url_jobdetail_alternate)}>
        <AdPageHeader
          isFrenchKeyword={isFrenchKeyword}
          title={jobOffer.title_h1}
          instrument_name={jobOffer.instrument_name}
          location_locality={jobOffer.location_locality}
          language_id={jobOffer.language_id}
        />
        <IconsSection
          location_locality={jobOffer.location_locality}
          subcategory_name={jobOffer.subcategory_name}
          employment_type_name={jobOffer.employment_type_name}
          education_name={jobOffer.education_name}
          coursetype_name={jobOffer.coursetype_name}
          callout_01_name={jobOffer.callout_01_name}
          language_id={jobOffer.language_id}
          wrapperClasses='bg-light-grey-200 py-12 md:py-16 flex md:justify-center'
        />
        <InformativeSection
          wrapperClasses='contain mx-auto py-12 md:py-16 md:w-2/3 lg:max-w-4xl'
          title={jobOffer.text_aboutus_title}
          description={jobOffer.text_aboutus_body}
        />
        <HighlightedSection wrapperClasses='w-full relative' title={jobOffer.title_ad} />
        <InformativeSection
          wrapperClasses='contain mx-auto py-12 md:py-16 md:w-2/3 lg:max-w-4xl'
          title={jobOffer.text_benefits_title}
          description={jobOffer.text_benefits_body}
        />
        <InformativeSection
          wrapperClasses='contain mx-auto md:w-2/3 lg:max-w-4xl'
          title={jobOffer.text_skills_title}
          description={jobOffer.text_skills_body}
        />
        <InformativeSection
          wrapperClasses='contain mx-auto py-12 md:py-16 md:w-2/3 lg:max-w-4xl'
          title={jobOffer.text_apply_title}
          description={jobOffer.text_apply_body}
        />
        <InformativeImageSection
          isFrenchKeyword={isFrenchKeyword}
          wrapperClasses='contain'
          title={jobOffer.text_contact_title}
          description={jobOffer.text_contact_body}
          language={language}
          img="https://a.storyblok.com/f/121094/4000x6000/fff054585c/orange_team-min.JPG"
        />
        {/* <CallToActionBanner
          wrapperClasses="contain pt-12 md:pt-16"
          language_id={jobOffer.language_id}
        /> */}

        {/*  
        TODO: to be uncommented when the stories are published
        <section className='contain mt-12 md:my-16'>
          <JobStory language={language} />
        </section> */}
        <section className='bg-[#F3F5F6] my-12 md:my-16'>
          <FormSection isFrenchKeyword={isFrenchKeyword} path={router?.asPath} language={language} />
        </section>
      </Layout>
    </>
  );
}
export async function getStaticPaths() {
 
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {

  const { slug, language } = params;

  const firstSlash = slug.indexOf('-');
  const paramId = slug.slice(0, firstSlash);

  let sbData;

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

  const jobOffer = channableData.filter((jobOffer) => jobOffer.url_jobdetail_id === paramId)[0];

  return {
    props: {
      slug: params.slug,
      storyblokData,
      jobOffer,
      language,
    },
    revalidate: 60,
  };
}

export default Jobs;
