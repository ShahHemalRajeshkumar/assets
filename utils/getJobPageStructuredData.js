export const getJobPageStructuredData = (jobOffer) => {
  const {
    date_posted,
    text_description,
    location_locality,
    location_postalcode,
    location_country,
    job_location_type_id,
    employment_type_id,
    organization_name,
    directapply_id,
    title_ad,
    id,
    url_organization,
    image_logo,
    date_expiry,
    salary_currency,
    salary_low,
    salary_high,
    salary_type
  } = jobOffer;


  const postedDate = date_posted ? date_posted.substring(0, date_posted.indexOf(' ')) : ''
  const expiryDate = date_expiry ? date_expiry.substring(0, date_expiry.indexOf(' ')) : ''

  return {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    "datePosted": postedDate,
    "validThrough": expiryDate,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: location_country,
    },
    description: text_description,
    hiringOrganization: {
      '@type': 'Organization',
      name: organization_name,
      sameAs: url_organization,
      logo: image_logo,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location_locality,
        postalCode: location_postalcode,
        addressCountry: location_country,
      },
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": salary_currency,
      "value": {
        "@type": "QuantitativeValue",
        "minValue": salary_low,
        "maxValue": salary_high,
        "unitText": salary_type
      }
    },
    title: title_ad,
    jobLocationType: job_location_type_id,
    directApply: directapply_id.toLowerCase(),
    employmentType: employment_type_id,
    identifier: {
      '@type': 'PropertyValue',
      name: organization_name,
      value: id,
    },
  };
};
