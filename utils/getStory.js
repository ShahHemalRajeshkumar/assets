import StoryblokService from './storyblok-service';

export const getStory = async (language) => {
  StoryblokService.setQuery({ language });
  let res;
  let status = 200;

  try {
    res = await StoryblokService.get(`cdn/stories/${language}`, {
      resolve_relations: 'global_reference.reference',
    });
  } catch (err) {
    console.log("ERROR HERE,", err)
    status = err.response.status;
    res = await StoryblokService.get(`cdn/stories/${language}/page-not-found`, {
      resolve_relations: 'global_reference.reference',
    });
  }

  return res.data.story.content;
};
