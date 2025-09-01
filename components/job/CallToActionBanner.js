import React from 'react';
import Image from 'next/image';
import Styles from '@/styles/job-adpage-components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CallToActionBanner = ({ wrapperClasses, language_id }) => {
  const router = useRouter();
  const isEnglish = language_id === 'en';

  const onHandleClick = () =>
    router.push(`${process.env.MATCHSPACE_PROD}/auth/signup?role=teacher&language=${isEnglish ? 'en' : 'de'}`);

  return (
    <section className={wrapperClasses}>
      <div className={`${Styles['banner']} relative h-44 md:h-64`}>
        <Image
          className='rounded-lg'
          layout='fill'
          objectFit='cover'
          src='https://a.storyblok.com/f/121094/612x408/74eba1ec93/home-cross-selling.webp/m/filters:quality(65)'
          alt={isEnglish ? 'boy playing guitar' : 'Junge, der Gitarre spielt'}
        />
        <div className={`${Styles['text-wrapper']} p-8`}>
          <header className='pb-4'>
            <h2 className='font-bold text-24px leading-32px md:text-48px md:leading-52px text-white'>
              {language_id === 'de' ? 'Bist du bereit zu unterrichten?' : 'Are you ready to teach?'}
            </h2>
          </header>
          <button onClick={onHandleClick}>
            <a className='flex justify-center mt-4 sm:justify-start '>
              <span className='px-11 py-3 rounded-full bg-white  text-primary hover:bg-primary hover:text-white focus:outline-none uppercase font-medium text-16px  md:text-16px'>
                {isEnglish ? 'register now' : 'jetzt registrieren'}
              </span>
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
