import React from 'react';
import { NextSeo } from 'next-seo';

const Seo = ({ meta, params }) => (
  <NextSeo
    title={meta?.title || ''}
    description={meta?.description || ''}
    robotsProps={{ 
      noarchive: true,
      nosnippet: false,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    }}
    canonical={params.pageUrl}
    openGraph={{
      url: params?.pageUrl,
      images: [{ url: params?.imageUrl }],
    }}
    additionalLinkTags={params?.links || []}
    additionalMetaTags={[
      {
        property: 'og:site_name',
        content: 'Matchspace Music',
      },
      {
        property: 'og:type',
        content: `product`,
      },
      {
        property: 'og:locale',
        content: `${params.language.split('-')[1]}`,
      },
      {
        name: 'robots',
        content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
    ]}
  />
);

export default Seo;
