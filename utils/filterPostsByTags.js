/**
 * Filters a list of posts by specific tags.
 *
 * This function takes an array of post objects and filters them based on a set of target tags.
 * Each post is expected to have a 'tags' property which is an array of tag objects, and each tag object should have a 'label' property.
 * The function returns a new array containing only the posts that have at least one tag matching the target tags.
 *
 * @param {Object[]} posts - An array of post objects to be filtered.
 * @returns {Object[]|undefined} An array of filtered post objects, or undefined if the input is falsy.
 */
export const filterPostsByTags = (posts, language = 'de') => {
    if (!posts) return;

    const targetLabelsDe = new Set([
        'Ukulele',
        'Akustische Gitarre',
        'Gitarre',
        'Gitarrenunterricht'
    ]);

    const targetLabelsEn = new Set([
        'Ukulele',
        'Guitar',
        'Ukulele Lessons',
        'E-bass'
    ]);

    const targetLabels = language === 'de' ? targetLabelsDe : targetLabelsEn;

    return posts.items.filter((post) => post?.tags && post?.tags?.some((tag) => targetLabels.has(tag.label)));
};
