import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import HTMLReactParser from 'html-react-parser';
import { FrenchDictionary } from '@/utils/enum';

const InformativeImageSection = ({ isFrenchKeyword, wrapperClasses, title = '', description = '', img, language }) => {
  const isEnglish = language === 'ch-en';
  return (
    <section className={wrapperClasses}>
      <div className='flex flex-col md:flex-row'>
        <div className='sm:px-40 md:w-1/2 md:mx-auto md:mr-16 md:px-0'>
          <div className='relative h-96 md:h-136 w-full '>
            <Image className='rounded-lg' layout='fill' objectFit='cover' alt='' src={img} />
          </div>
        </div>
        <div className='md:w-1/2 flex flex-col md:justify-center'>
          <header>
            <h2 className='leading-32px text-26px md:text-40px mt-8 md:pb-4 md:leading-56px'>{title}</h2>
          </header>
          <p className='mt-4'>{HTMLReactParser(description)}</p>
          <footer>
            <Link href={isEnglish ? '/ch-en/about/about-us' : '/ch-de/ueber/ueber-uns'}>
              <a className='mt-8 btn-primary inline-block'>
                <span className='uppercase font-medium text-white text-16px md:text-16px px-6'>
                  {isEnglish
                    ? 'about us'
                    : !isEnglish && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                    ? 'À PROPOS DE NOUS'
                    : 'ÜBER UNS'}
                </span>
              </a>
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default InformativeImageSection;
