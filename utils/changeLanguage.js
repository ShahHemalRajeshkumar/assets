export const changeLanguage = (location, story) => {
    location.href = location.href.replace(story.full_slug, story.alternates[0]?.full_slug);
};