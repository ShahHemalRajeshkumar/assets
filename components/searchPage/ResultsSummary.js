import { useRef, useCallback } from 'react';
import NotifyMeForm from './NotifyMeForm';
import NotifyMeButton from './NotifyMeButton';
import DialogComponent from '../DialogComponent';
import NotifyNoteIcon from '../icons/NotifyNote.svg';
import { translateENtoDE } from '../../functions/translator';

const ResultsSummary = ({ language, instrument, instruments, location, seoActions }) => {
  const ref = useRef();

  const modalShowHide = (flag) => {
    flag ? ref.current?.showModal() : ref.current?.close();
  };

  const notifyMeHandle = useCallback(() => {
    modalShowHide(true);
    if (seoActions?.searchNotifyMe) seoActions?.searchNotifyMe();
  }, [seoActions]);

  const noResultsHeading =
    language === 'ch-de'
      ? `Kein*e passende*r ${instrument?.de?.charAt(0)?.toUpperCase() + instrument?.de?.slice(1)}${
          instrument?.delimiters?.teacher
        } gefunden?`
      : `No suitable ${instrument?.en.toLowerCase()} teacher found?`;
  const noResultsContent2 = translateENtoDE('Then let us know right away.', language);
  const noResultsContent1 =
    language === 'ch-de'
      ? `Wir unterstützen dich bei der Suche nach einer passenden ${instrument?.de}${instrument?.delimiters?.teacher} in deiner Nähe.`
      : `We support you in your search for a suitable ${instrument?.en?.toLowerCase()} teacher in your area.`;

  return (
    <div id='results-summary-seo'>
      <section className='grid col-span-3 p-4 mt-[50px]'>
        <h2 className='text-22px leading-[28px] font-[600] text-center mb-[16px] sm:mb-[32px]'>{noResultsHeading}</h2>
        <NotifyNoteIcon className='m-auto mb-[16px] hidden sm:block' />
        <div className='mb-[16px] text-[15px] leading-[22px] tx-secondary text-center block'>
          <div>{noResultsContent1}</div>
        </div>
        <div className='flex justify-center pb-8'>
          <NotifyMeButton
            language={language}
            onClick={notifyMeHandle}
            sbText={translateENtoDE('START SEARCH', language)}
          />
        </div>
      </section>
      <DialogComponent ref={ref}>
        <NotifyMeForm
          ref={ref}
          location={location}
          language={language}
          seoActions={seoActions}
          instrument={instrument}
          instruments={instruments}
        />
      </DialogComponent>
    </div>
  );
};

export default ResultsSummary;
