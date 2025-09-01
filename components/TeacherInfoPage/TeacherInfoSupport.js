import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import EmailIcon from '../icons/Email.svg';
import { translateENtoDE } from '../../functions/translator';

const TeacherInfoSupport = ({ language }) => {
  const helpLink = useMemo(() => {
    if (language === 'ch-en') {
      return 'https://matchspace-music.ch/ch-en/help';
    }
    return 'https://matchspace-music.ch/ch-de/hilfe';
  }, [language]);

  return (
    <div className='teacher-info-support'>
      <div className='teacher-info-support-content'>
        <p className='font-bold text-24px mb-4'>{translateENtoDE('Have questions or need support?', language)}</p>
        <p className='text-14px mb-5'>
          {translateENtoDE(
            'We’re happy to support you personally. Write us an email or find answers to your questions in our Help Centre.',
            language
          )}
        </p>
        <Link href={helpLink} passHref>
          <a className='tracking-widest btn-primary uppercase bg-primary cursor-pointer text-center'>
            {translateENtoDE('Help centre', language)}
          </a>
        </Link>
      </div>
      <div className='teacher-info-support-manager'>
        <Image
          width={56}
          height={56}
          layout='fixed'
          alt='Cláudia Carneiro'
          className='rounded-full'
          src='https://a.storyblok.com/f/121094/500x500/e8b5572fbb/profile-image-claudia-carneiro.png'
        />
        <p className='mb-1 mt-2 font-bold text-18px'>Cláudia Carneiro</p>
        <p className='mb-2 text-14px'>{translateENtoDE('Customer Success', language)}</p>

        {/* <a target='_blank' rel='noreferrer' href='tel:+41442039551' className='mb-2 text-14px text-primary font-medium'>
          {translateENtoDE('+41 44 203 95 51', language)}
        </a> */}
        <a
          target='_blank'
          rel='noreferrer'
          className='flex items-center mb-2 text-14px uppercase text-primary font-medium'
          href={`mailto:lessons@matchspace.com?subject=${translateENtoDE('I need help finding a teacher', language)}`}>
          <EmailIcon className='mr-1' />
          {translateENtoDE('SEND US AN E-MAIL', language)}
        </a>
      </div>
    </div>
  );
};

export default TeacherInfoSupport;
