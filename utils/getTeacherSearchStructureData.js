const getRandomRating = () => {
  const random = Math.random() / 3;

  if (random > 0.4) return 4.9;

  return +(4.5 + random).toFixed(1);
};

const getMinMaxPrice = (pricing) => {
  const kids = pricing?.kids?.hour_rate || 0;
  const adults = pricing?.adults?.hour_rate || 0;

  return {
    min: kids < adults ? kids : adults,
    max: kids < adults ? adults : kids,
  };
};

export const getTeacherSearchStructureData = ({ search = [], meta, seoParams, language }) => {
  return {};

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: meta?.title,
    image: [seoParams?.imageUrl],
    description: meta?.description,
    brand: {
      '@type': 'Brand',
      name: 'Matchspace Music',
    },
    author: {
      '@type': 'Person',
      name: 'Matchspace Music',
      sameAs: seoParams?.pageUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: getRandomRating(),
      bestRating: '5',
      reviewCount: search.reduce((acc, item) => acc + +item?.recommendations, 0) || 1,
    },
    offers: {
      '@type': 'Offer',
      '@type': 'AggregateOffer',
      highPrice: Math.max.apply(
        0,
        search.map((item) => getMinMaxPrice(item?.pricing).max)
      ),
      lowPrice: Math.min.apply(
        0,
        search.map((item) => getMinMaxPrice(item?.pricing).min).filter((item) => !!item)
      ),
      offerCount: search.length,
      offers: search.slice(0, 10).map((item) => ({
        '@type': 'Offer',
        url: `${encodeURI(`https://matchspace-music.ch/`)}/${language}/teachers/${item.username}`,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: getMinMaxPrice(item?.pricing).min,
          priceCurrency: 'CHF',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: '1',
            unitCode: 'HUR',
            valueReference: {
              '@type': 'QuantitativeValue',
              value: '1',
              unitCode: 'HUR',
            },
          },
        },
      })),
    },
  };
};
