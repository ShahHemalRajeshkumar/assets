import { PAGE_TYPES_EN, PAGE_TYPES_DE } from '../constants/page-types';
import { CATEGORIES_TYPE_EN, CATEGORIES_TYPE_DE } from '../constants/blog-categories';

const DEFAULT_LANGUAGE = 'en';
const STUDENTS_CATEGORY_EN = CATEGORIES_TYPE_EN.STUDENTS;
const STUDENTS_CATEGORY_DE = CATEGORIES_TYPE_DE.STUDENTS;

const categoryMap = {
    en: {
        [PAGE_TYPES_EN.ABOUT_US]: CATEGORIES_TYPE_EN.NEWS,
        [PAGE_TYPES_EN.MUSIC_SCHOOLS_AND_LESSONS]: CATEGORIES_TYPE_EN.STUDENTS,
        [PAGE_TYPES_EN.CHILDREN_AND_PARENTS]: CATEGORIES_TYPE_EN.CHILDREN_AND_PARENTS,
        [PAGE_TYPES_EN.MUSIC_STUDENTS]: CATEGORIES_TYPE_EN.STUDENTS,
        [PAGE_TYPES_EN.MUSIC_TEACHERS]: CATEGORIES_TYPE_EN.TEACHERS,
        [PAGE_TYPES_EN.LESSONS_FOR_COMPANIES]: CATEGORIES_TYPE_EN.COMPANIES,
        [PAGE_TYPES_EN.HEALTH_INSURANCES]: CATEGORIES_TYPE_EN.HEALTH_INSURANCES,
        [PAGE_TYPES_EN.FOR_SENIORS]: CATEGORIES_TYPE_EN.STUDENTS,
        [PAGE_TYPES_EN.HOEHLE_DER_LOEVEN_EN]: CATEGORIES_TYPE_EN.STUDENTS,
        [PAGE_TYPES_EN.MUSIC_LESSONS_SWITZERLAND_EN]: CATEGORIES_TYPE_EN.STUDENTS,
        [PAGE_TYPES_EN.MUSIC_TEACHERS_2025]: CATEGORIES_TYPE_EN.NEWS,
    },
    de: {
        [PAGE_TYPES_DE.ABOUT_US]: CATEGORIES_TYPE_DE.NEWS,
        [PAGE_TYPES_DE.MUSIC_SCHOOLS_AND_LESSONS]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.CHILDREN_AND_PARENTS]: CATEGORIES_TYPE_DE.CHILDREN_AND_PARENTS,
        [PAGE_TYPES_DE.MUSIC_STUDENTS]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.MUSIC_TEACHERS]: CATEGORIES_TYPE_DE.TEACHERS,
        [PAGE_TYPES_DE.LESSONS_FOR_COMPANIES]: CATEGORIES_TYPE_DE.COMPANIES,
        [PAGE_TYPES_DE.HEALTH_INSURANCES]: CATEGORIES_TYPE_DE.HEALTH_INSURANCES,
        [PAGE_TYPES_DE.FOR_SENIORS]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.HOEHLE_DER_LOEVEN]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.MUSIC_LESSONS_SWITZERLAND_DE]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.KLAVIERUNTERRICHT]: CATEGORIES_TYPE_DE.STUDENTS,
        [PAGE_TYPES_DE.MUSIKLEHRER_2025]: CATEGORIES_TYPE_DE.NEWS,
    },
};

/**
 * Retrieves the category name based on the provided slug and language.
 *
 * @param {string} slug - The slug representing the page type.
 * @param {string} [language=DEFAULT_LANGUAGE] - The language code (e.g., 'en', 'de').
 * @returns {string|null} The category name corresponding to the slug and language if found,
 *                        otherwise returns null. If the slug is not provided, returns the default
 *                        category for students in the specified language.
 * @throws {Error} Throws an error if the provided language is not supported.
 */
export const getCategoryName = (slug, language = DEFAULT_LANGUAGE) => {
    const isLanguageSupported = language === 'en' || language === 'de';
    if (!isLanguageSupported) {
        throw new Error(`Unsupported language: ${language}`);
    }

    if (!slug) {
        return language === 'en' ? STUDENTS_CATEGORY_EN : STUDENTS_CATEGORY_DE;
    }

    const category = categoryMap[language][slug];
    if (category === undefined) {
        console.warn(`Category not found for slug: ${slug}`);
        return null;
    }

    return category;
};
