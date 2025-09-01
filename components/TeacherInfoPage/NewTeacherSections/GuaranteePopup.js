import Mastercard from '../../../components/icons/Mastercard.svg';
import Americanexpress from '../../../components/icons/Americanexpress.svg';
import Applepay from '../../../components/icons/Applepay.svg';
import Googlepay from '../../../components/icons/Googlepay.svg';
import Visa from '../../../components/icons/Visa.svg';
import Ebank from '../../../components/icons/Ebank.svg';
import ExternalLink from '../../../components/icons/ExternalLink.svg';
import { translateENtoDE } from 'functions/translator';
import Image from 'next/image';
import React from 'react';

const GuaranteePopup = ({ language }) => {
  const guaranteeData = {
    sections: [
      {
        heading: 'Book now, pay later',
        content: (language) =>
          language === 'ch-en' ? (
            <>
              Do you want to benefit now but pay later? Book your subscription of choice with{' '}
              <a
                href='https://www.twint.ch/en/faq/how-pay-for-purchase-later/?lang=en'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]  '>
                TWINT<ExternalLink className='inline-block w-[15px] text-[#21697c] h-[19px] ml-1' />
              </a>{' '}
              or{' '}
              <a
                href='https://www.klarna.com/ch/en/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]   '>
                Klarna<ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>{' '}
              and get charged after 30 days. Eligibility terms of the supplier apply.
            </>
          ) : (
            <>
              Möchtest du heute profitieren und später bezahlen? Buche jetzt dein Abo der Wahl mit{' '}
              <a
                href='https://www.twint.ch/faq/wie-einkauf-spaeter-bezahlen/'
                target='_blank'
                rel='noopener noreferrer'
             className='text-[#21697c] border-b-[1px] border-[#21697c]  '>
                TWINT<ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>{' '}
              oder{' '}
              <a
                href='https://www.klarna.com/ch/sicher-bezahlen/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]  '>
                Klarna<ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>{' '}
              und bezahle erst in 30 Tagen. Es gelten die Bedingungen des Anbieters.
            </>
          ),
      },
      {
        heading: 'Trial lesson with satisfaction guarantee',
        content: (language) =>
          language === 'ch-en' ? (
            <>
              The first lesson of your subscription serves as a trial lesson. If you are not satisfied with the lessons,
              we will find a new teacher or refund your money.{' '}
              <a
                href='https://www.blog.matchspace-music.ch/en/post/terms-and-conditions-of-matchspace-music'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]'>
                Read our terms and conditions<ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>
            </>
          ) : (
            <>
              Die erste Lektion deines Abos gilt als Probelektion. Falls du nicht zufrieden bist mit dem Unterricht,
              finden wir eine neue Lehrperson oder erstatten dir das Geld zurück.{' '}
              <a
                href='https://www.blog.matchspace-music.ch/post/unterrichtsbedingungen-von-matchspace-music'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]  '>
                Unterrichtsbedingungen lesen<ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>
            </>
          ),
      },
      {
        heading: 'Pay in rates',
        content: (language) =>
          language === 'ch-en' ? (
            <>
              Don&apos;t have the full amount available in your account? Book your subscription today and pay in three
              interest-free rates with{' '}
              <a
                href='https://www.klarna.com/ch/en/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]  '>
                <span >Klarna</span><ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>
              . Eligibility terms of the supplier apply.
            </>
          ) : (
            <>
              Du kannst nicht alles auf einmal bezahlen? Kein Problem! Buche dein Abo heute und bezahle in drei
              Zinsfreien Raten mit{' '}
              <a
                href='https://www.klarna.com/ch/sicher-bezahlen/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#21697c] border-b-[1px] border-[#21697c]   '>
                <span className=''>Klarna</span><ExternalLink className='inline-block w-[15px] h-[19px] ml-1' />
              </a>
              . Es gelten die Bedingungen des Anbieters.
            </>
          ),
      },
    ],
    logos: [
      {
        src: '/assets/images/paymentmethod.png',
        alt: 'Twint',
      },
      {
        src: '/assets/images/klarna.png',
        alt: 'Klarna',
      },
    ],
  };
  return (
    <div className=' smd:rounded-xl smd:max-w-[530px] w-full  smd:my-auto  pr-[14px] pl-[4px] py-[4px]'>
      <div className=''>
        <div className='flex flex-col gap-[24px]'>
          {guaranteeData.sections.map((section, index) => (
            <div key={index} className='flex flex-col gap-[12px]'>
              <h3 className='font-bold text-[17px] text-[#000000]/[87%] leading-[129%]'>
                {translateENtoDE(section.heading, language)}
              </h3>
              <p className='text-[15px] text-[#000000]/[87%] leading-[160%]'>{section.content(language)}</p>
            </div>
          ))}
        </div>

        <div className='flex smd:flex-nowrap flex-wrap items-center gap-[16px] mt-[12px]'>
          <Mastercard className='w-[60px] h-[38px] object-cover' />
          {guaranteeData.logos.map((logo, index) => (
            <div key={index} className=' w-full max-w-[60px] h-full aspect-[60/38]'>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={60}
                height={38}
                className='object-cover w-full h-auto'
              />
            </div>
          ))}
          <Ebank className='w-[55px] h-[40px]  object-cover [&>image]:w-[50px] [&>image]:h-[35px]' />
          <Visa className='w-[60px] h-[38px]  object-cover' />
          <Applepay className='w-[60px] h-[38px]  object-cover' />
          <Googlepay className='w-[60px] h-[38px]  object-cover' />
          <Americanexpress className='w-[60px] h-[45px]  object-cover' />
        </div>
      </div>
    </div>
  );
};

export default GuaranteePopup;
