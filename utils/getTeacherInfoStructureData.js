const getRandomRating = () => {
  const random = Math.random() / 3;

  if (random > 0.4) return 4.9;

  return +(4.5 + random).toFixed(1);
};

const getMinMaxPricing = (courses = []) => {
  const pricing = courses.map((item) => ({
    min: +item?.min_price,
    max: Math.max.apply(
      0,
      item?.prices?.map((price) => price?.raw_amount)
    ),
  }));

  return {
    min: Math.min.apply(
      0,
      pricing.map((item) => item.min).filter((item) => !!item)
    ),
    max: Math.max.apply(
      0,
      pricing.map((item) => item.max)
    ),
  };
};

const getOffers = (courses = [], url) => {
  return courses.map((item) => ({
    '@type': 'Offer',
    url: `${url}?course=${item?.id}&price=true`,
    sku: item?.id,
    availability: !item?.is_full,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: item?.min_price,
      priceCurrency: item?.currency || 'CHF',
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
  }));
};

export const getTeacherInfoStructureData = ({ teacher, meta, seoParams }) => {
  const pricing = getMinMaxPricing(teacher?.courses || []);

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    additionalType: 'Course',
    name: meta?.title,
    image: seoParams?.imageUrl,
    description: meta?.description,
    brand: {
      '@type': 'Brand',
      name: 'Matchspace Music',
    },
    ...(teacher?.recommendations.length
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8', // getRandomRating(),
            bestRating: '5',
            reviewCount: teacher?.recommendations.length || 0,
          },
        }
      : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CHF',
      '@type': 'AggregateOffer',
      lowPrice: pricing?.min || 0,
      highPrice: pricing?.max || 0,
      offerCount: teacher?.courses?.length || 0,
      offers: getOffers(teacher?.courses || [], seoParams?.pageUrl),
    },
  };
};
