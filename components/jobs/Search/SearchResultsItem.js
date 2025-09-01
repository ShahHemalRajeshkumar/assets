import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/jobs-page-components.module.scss';

const JobListItem = ({ jobOffer }) => {
  const {
    language_id,
    image_instrument,
    date_posted,
    instrument_name,
    location_locality,
    title_ad,
    url_jobdetail,
    image_instrument_alt,
  } = jobOffer;

  const decodedURI = decodeURI(url_jobdetail);
  const lastSlash = decodedURI.lastIndexOf('/');
  const result = decodedURI.substring(lastSlash + 1);

  return (
    <Link href={`/ch-${language_id}/jobs/${result}`}>
      <a className={`${styles['card']} flex flex-col border rounded-lg`}>
        <div className={`${styles['image-wrapper']} relative w-full}`}>
          <Image
            quality={55}
            className="rounded-t"
            alt={image_instrument_alt || ''}
            layout="fill"
            objectFit="cover"
            src={image_instrument}
          />
        </div>
        <section
          className={`${styles['content-wrapper']}  flex flex-col gap-y-4`}
        >
          <h3
            className={`${styles['header']} text-20px md:text-22px leading-28px font-bold`}
          >
            {title_ad}
          </h3>
          <ul className="flex flex-col ml-4 list-disc gap-y-3">
            <li>
              {date_posted && date_posted.split(' ')[0]}
            </li>
            <li>{instrument_name}</li>
            <li>{location_locality}</li>
          </ul>
        </section>
      </a>
    </Link>
  );
};

export default JobListItem;
