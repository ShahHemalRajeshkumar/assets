import React from 'react';

import dynamic from 'next/dynamic';
import Styles from '@/styles/job-adpage-components.module.scss';

const Location = dynamic(() => import('../icons/Location.svg'));
const Contract = dynamic(() => import('../icons/Contract.svg'));
const Education = dynamic(() => import('../icons/Education.svg'));
const HeartIcon = dynamic(() => import('../icons/HeartIcon.svg'));
const Music = dynamic(() => import('../icons/Music.svg'));
const Document = dynamic(() => import('../icons/Document.svg'));

const generateItem = (Icon, description) => (
  <div className='flex items-center'>
    <div className={`${Styles['label-icon']} relative`}>
      <Icon />
    </div>
    <div className='ml-2 md:ml-4'>{description}</div>
  </div>
);

const JobIconsSection = (props) => {
  const {
    wrapperClasses,
    location_locality,
    subcategory_name,
    employment_type_name,
    education_name,
    coursetype_name,
    callout_01_name,
    language_id,
  } = props;
  return (
    <section className={wrapperClasses}>
      <div className={`${Styles['grid-wrapper']} contain lg:w-2/3`}>
        <div className={`${Styles['grid']}`}>
          {generateItem(Location, location_locality)}
          {generateItem(Document, subcategory_name)}
          {generateItem(Contract, employment_type_name)}
          {generateItem(Education, education_name)}
          {generateItem(Music, coursetype_name)}
          {generateItem(HeartIcon, callout_01_name)}
        </div>
      </div>
    </section>
  );
};

export default JobIconsSection;
