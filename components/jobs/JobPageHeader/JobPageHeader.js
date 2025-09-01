import React from 'react';
import styles from '../../../styles/jobs-page-components.module.scss';

import Image from 'next/image';

const JobPageHeader = ({ language }) => {
  const isEnglish = language === 'ch-en';
  return (
    <header className={`${styles['header-section']} relative `}>
      <section
        className={`${styles['header-wrapper']} w-full h-full md:h-auto md:py-12  flex items-center justify-center z-10`}
      >
        <div className={`${styles['header-content']} md:mt-0 contain`}>
          <h1 className="pb-5 font-bold text-center text-white text-24px md:text-48px">
            {isEnglish
              ? 'Music Teacher Jobs in Switzerland'
              : 'Musiklehrer Stellenangebote - Musiklehrer*innen gesucht'}
          </h1>
          <h2 className="text-center text-white text-16px md:text-24px">
            {isEnglish
              ? 'We are looking for qualified music teachers for private lessons near you'
              : 'Finde einen Job als freiarbeitende Musiklehrer*in und unterrichte flexibel Musikschüler*innen in deiner Nähe'}
          </h2>
        </div>
      </section>
    </header>
  );
};

export default JobPageHeader;
