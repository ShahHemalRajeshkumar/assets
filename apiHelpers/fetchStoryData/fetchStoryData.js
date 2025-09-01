export const fetchStoryData = async (StoryblokService, language, path) => {
    try {
        const result = await StoryblokService.get(`cdn/stories/${language}/${path}`, {
            resolve_relations: 'global_reference.reference',
        });
        return { result, status: 200 };
    } catch (err) {
        const status = err.response?.status;
        const result = await StoryblokService.get(`cdn/stories/${language}/page-not-found`, {
            resolve_relations: 'global_reference.reference',
        });
        return { result, status };
    }
};
