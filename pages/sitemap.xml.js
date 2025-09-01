import React from 'react';
import { searchClient } from '../config';

const PER_PAGE = 100;
const SITEMAP_URL = process.env.SITEMAP_URL;
const PREVIEW_TOKEN = process.env.STORYBLOK_API_TOKEN;
const teachersIndex = searchClient.initIndex(process.env.ALGOLIA_TEACHERINDEX_SITEMAP);

const generateSitemap = (slugs = [], url = '') =>
  `${slugs.map((item) => `<url><loc>https://${url}/${item}</loc></url>`).join('')}`;

const generateTeachersSitemap = (data = [], lang = 'en') => {
  const alterLang = lang === 'en' ? 'de' : 'en';

  return `${data
    ?.map(
      (item) => `<url>
          <loc>${SITEMAP_URL}/ch-${lang}/teachers/${item?.username}</loc>
          <xhtml:link rel='alternate' hreflang='x-default' href='${SITEMAP_URL}/ch-${alterLang}/teachers/${item?.username}'/>
          <xhtml:link rel='alternate' hreflang='en' href='${SITEMAP_URL}/ch-en/teachers/${item?.username}'/>
          <xhtml:link rel='alternate' hreflang='de' href='${SITEMAP_URL}/ch-de/teachers/${item?.username}'/>
        </url>`
    )
    .join('')}`;
};

export async function getStaticProps({ res }) {
  const cv = new Date().getTime();
  const response = await fetch(
    `https://api.storyblok.com/v1/cdn/stories?cv=${cv}&per_page=${PER_PAGE}&token=${PREVIEW_TOKEN}`
  );
  const data = await response.json();

  const [teachers1, teachers2] = await Promise.all([
    teachersIndex.search('', { page: 0, hitsPerPage: 900 }),
    teachersIndex.search('', { page: 1, hitsPerPage: 900 }),
  ]);

  const teachers = [...(teachers1?.hits || []), ...(teachers2?.hits || [])];

  const arr = Object.values(data.stories);
  const allSlugs = arr.map((story) => story?.full_slug)?.filter(Boolean);

  const slugsToRemove = [
    'ch-en/global/navigation',
    'ch-de/global/navigation',
    'ch-de/page-not-found',
    'ch-en/page-not-found',
    'ch-de/ueber/neuigkeiten',
    'ch-en/about/news',
    'ch-en/about/in-the-news',
    'ch-de/ueber/in-den-nachrichten',
  ];

  const filteredSlugs = allSlugs.filter(
    (slug) =>
      !slugsToRemove.includes(slug) &&
      slug.indexOf('ch-de/blog') &&
      slug.indexOf('ch-en/blog') &&
      slug.indexOf('ch-de/neuigkeiten') &&
      slug.indexOf('ch-en/news')
  );

  const stripTrailingSlash = (slugs) =>
    slugs.map((slug) => (slug.endsWith('/') ? slug.slice(0, -1) : slug));

  const sitemap = `<?xml version="1.0" encoding="utf-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateSitemap(stripTrailingSlash(filteredSlugs), SITEMAP_URL)}
    ${generateTeachersSitemap(teachers, 'en')}
    ${generateTeachersSitemap(teachers, 'de')}
    </urlset>`;
  return {
    props: {
      sitemap,
    },
    revalidate: 86400,
  };
}

const Sitemap = ({ sitemap }) => {
  return null; 
};

export default Sitemap;