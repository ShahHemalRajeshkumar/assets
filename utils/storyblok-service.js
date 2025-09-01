import StoryblokClient from 'storyblok-js-client';

class StoryblokService {
  constructor() {
    this.devMode = process.env.STORYBLOK_VERSION || false;
    this.token = process.env.STORYBLOK_API_TOKEN;
    //added for workflow filteration
    this.environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'staging';
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    });

    this.query = {};
  }

  getCacheVersion() {
    return this.client.cacheVersion;
  }

  async get(slug, params) {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'staging';
    params = params || {};

    params.version = process.env.STORYBLOK_VERSION; //'published'

    if (this.getQuery('_storyblok') || (typeof window !== 'undefined' && window.storyblok)) {
      params.version = 'draft';
    }

    if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
      params.cv = window.StoryblokCacheVersion;
    }

    // Add cache busting for local development environment
    if (process.env.NODE_ENV === 'development') {
      params.cv = Date.now(); // Force cache invalidation on each request
    }

    // Special case for 404 page - don't apply filtering
    const is404Page = slug.includes('page-not-found');

    // Add production tag filter for collection requests in production environment
    if (environment === 'production' && params.version === 'published' && slug === 'cdn/stories' && !is404Page) {
      params.with_tag = 'Production';
    }

    try {
      // Make the request
      const response = await this.client.get(slug, params);
      // For individual story requests in production, check if it has the production tag
      if (environment === 'production' && params.version === 'published' && !is404Page && response.data.story) {
        const tag_list = response.data.story.tag_list || [];

        // Check if the production tag exists in the tag_list
        const hasProductionTag =
          (Array.isArray(tag_list) && tag_list.includes('Production')) ||
          (typeof tag_list === 'string' &&
            tag_list
              .split(',')
              .map((t) => t.trim())
              .includes('Production'));

        if (!hasProductionTag) {
          console.log(`Story doesn't have the "production" tag, returning 404`);
          throw { response: { status: 404 } };
        } else {
          console.log(`Story has "production" tag, showing in production`);
        }
      }

      return response;
    } catch (error) {
      console.error(`Error fetching from Storyblok:`, error);
      throw error;
    }
  }

  // Also update getStories to use tag filtering
  getStories(params = {}) {
    if (this.environment === 'production' && params.version !== 'draft') {
      params.with_tag = 'production';
    }

    return this.client.get('cdn/stories', params);
  }

  // initialize the connection between Storyblok & Next.js in Visual Editor
  initEditor(reactComponent) {
    if (window.storyblok) {
      window.storyblok.init();

      // reload on Next.js page on save or publish event in Storyblok Visual Editor
      window.storyblok.on(['change', 'published'], () => location.reload(true));

      // Update state.story on input in Visual Editor
      // this will alter the state and replaces the current story with a current raw story object and resolve relations
      window.storyblok.on('input', (event) => {
        if (
          event.story.content._uid ===
          (reactComponent?.state.story
            ? reactComponent?.state.story.content._uid
            : reactComponent?.state.stories.story.content._uid)
        ) {
          event.story.content = window.storyblok.addComments(event.story.content, event.story.id);
          window.storyblok.resolveRelations(event.story, ['global_reference.reference'], () => {
            reactComponent.setState({
              story: event.story,
            });
          });
        }
      });
    }
  }

  setQuery(query) {
    this.query = query;
  }

  getQuery(param) {
    return this.query[param];
  }

  bridge() {
    if (!this.getQuery('_storyblok') && !this.devMode) {
      return '';
    }
    return <script async src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}></script>;
  }
}

const storyblokInstance = new StoryblokService();

export default storyblokInstance;
