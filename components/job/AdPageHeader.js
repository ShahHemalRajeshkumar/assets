import React from 'react';
import Styles from '@/styles/job-adpage-components.module.scss';
import { useRouter } from 'next/router';
import { FrenchDictionary } from '@/utils/enum';

const AdPageHeader = ({ isFrenchKeyword, title, language_id }) => {
  const router = useRouter();

  const handleRegister = () => router.push(`${process.env.MATCHSPACE_PROD}/auth/signup?language=ch-${language_id}`);

  return (
    <header className={`${Styles['header']} py-12 md:py-16`}>
      <div className='contain h-full flex flex-col items-center justify-center'>
        <h1
          className={`${Styles['header-content']} contain mb-8 md:mb-10 font-bold text-center text-white text-24px md:text-48px leading-34px md:leading-56px`}>
          {title}
        </h1>
        <button
          type='button'
          onClick={handleRegister}
          className={`${Styles['button']} mr-4 tracking-widest border-2 btn-outline`}>
          {language_id === 'de'
            ? language_id === 'de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
              ? 'INSCRIPTION'
              : 'JETZT REGISTRIEREN'
            : 'REGISTER'}
        </button>
      </div>
    </header>
  );
};

export default AdPageHeader;
