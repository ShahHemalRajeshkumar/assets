import React from 'react';
import Layout from '../../../components/Layout';
import StoryblokService from '../../../utils/storyblok-service';
import dynamic from 'next/dynamic';

const Page = dynamic(() => import('../../../components/Page'));
const BlogLanding = dynamic(() => import('../../../components/BlogLandingPage'));

export async function getStaticProps({ params }) {
  let res = null;
  let articles = null;
  let language = 'ch-en';

  try {
    StoryblokService.setQuery(params);
    res = await StoryblokService.get(`cdn/stories/ch-en/music-lessons`, {
      resolve_relations: 'global_reference.reference',
    });
  } catch (error) {
    console.error('Error fetching story:', error);
  }

  try {
    articles = await StoryblokService.get(`cdn/stories/`, {
      starts_with: `ch-de/dev`,
      sort_by: 'content.date:desc',
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return {
    props: {
      res,
      language,
      articles,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { language: 'ch-en' } }],
    fallback: false,
  };
}

class MusicLessonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: props.res?.data?.story,
      language: props.language,
      articles: props.articles,
    };
  }

  componentDidMount() {
    StoryblokService.initEditor(this);
  }

  changeLanguage = (event) => {
    this.setState({ language: event }, () => {
      location.href = location.href.replace(this.state.story?.full_slug, this.state.story?.alternates[0]?.full_slug);
    });
  };

  render() {
    const contentOfStory = this.state.story?.content;

    return contentOfStory ? (
      <Layout
        language={this.state.language}
        meta={contentOfStory.meta}
        keywords={contentOfStory?.keywords}
        alternateSlug={this.state?.story?.alternates[0]?.full_slug}
        story={contentOfStory}
        languageChange={() => (location.href = location.href.replace('ch-en/music-lessons', 'ch-de/musikunterricht'))}>
        <Page className='ms-page-scroll' content={contentOfStory} />
      </Layout>
    ) : (
      <div />
    );
  }
}

export default MusicLessonsPage;
