import React from 'react';
import NextHead from 'next/head';

const Head = ({ meta, keywords, location, language, alternateSlug, noIndex }) => (
  <NextHead>
    <meta charset='UTF-8' />
    <title>{meta?.title || ''}</title>
    {noIndex && (
      <>
        <meta key='robots' name='robots' content='noindex, nofollow' />
        <meta key='googlebot' name='googlebot' content='noindex, nofollow' />
      </>
    )}
    <meta name='description' content={meta?.description || ''} />
    <meta property='og:title' content={meta?.title} key='title' />
    <meta name='description' content={meta?.description || ''} />
    <meta property='og:description' content={meta?.description || ''} key='description' />
    <meta property='og:image' content={meta?.og_image} />
    <meta property='og:url' content={meta?.og_url || 'https://matchspace-music.ch' + `${location}`} />
    <meta property='og:type' content='website' />
    <meta property='og:locale' content={language} />
    <meta property='og:site_name' content={meta?.og_site_name} />
    <meta name='keywords' content={keywords} />
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0' />
    <link rel='canonical' href={'https://matchspace-music.ch' + `${location}`} />
    <link rel='alternate' href={'https://matchspace-music.ch' + `${location}`} hrefLang={language} />
    <link
      rel='alternate'
      href={'https://matchspace-music.ch' + `/${alternateSlug}`}
      hrefLang={language === 'de' ? 'en' : 'de'}
    />
  </NextHead>
);

export default Head;
