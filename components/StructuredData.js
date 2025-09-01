import { memo } from 'react';
import Head from 'next/head';

const StructuredData = ({ data }) => (
  <Head key='seo-data'>
    <script
      key='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
);

export default memo(StructuredData);
