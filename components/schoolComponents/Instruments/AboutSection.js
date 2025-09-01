import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import { translateENtoDE } from 'functions/translator';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AboutSection({ organizationData, language, instrumentsData = [], setCommonFilterQuery, commonFilterQuery }) {
  const router = useRouter();
  const location = router.query.regionSlug;
  const [isExtendedInstrument, setIsExtendedInstrument] = useState(false);
  const { isMoreCourseSidebarOpen, setIsMoreCourseSidebarOpen, setInstrumentFilterAbout, instrumentFilterAbout, savedInstrument } =
    useSchoolPage();
  const currectInstruments = instrumentsData
    ?.map((instrument) => {
      const findInstrument = organizationData?.i_keys?.find((key) => key === instrument?.key);
      return findInstrument ? instrument : null;
    })
    ?.filter(Boolean)  
    .sort((a, b) => (language == 'ch-en' ? a?.en?.localeCompare(b.en, 'en') : a?.de?.localeCompare(b.de, 'de')));

  const displayedInstruments = isExtendedInstrument ? currectInstruments : currectInstruments?.slice(0, 8);
  
  function handleSelectInstrument(id) {
    setInstrumentFilterAbout(id);
    setCommonFilterQuery((prev) => ({ ...prev, instrument: id }));
  }

  useEffect(() => {
    if (!isMoreCourseSidebarOpen) {
      setInstrumentFilterAbout('');
      setCommonFilterQuery((prev) => ({ ...prev, instrument: savedInstrument }));
    }
  }, [isMoreCourseSidebarOpen]);

  return (
    <div className=''>
      <div className='pb-[24px] mb-[12px] border-b-[1px] border-[#E4E7EC]'>
        {organizationData && organizationData?.about ? (
          <ShowMoreTextNext
            maxLength={285}
            language={language}
            showButtonLabel={translateENtoDE('Show more', language)}>
            {language === 'ch-en' ? organizationData?.about?.en : organizationData?.about?.de}
          </ShowMoreTextNext>
        ) : (
          <span className='text-[14px] text-[#000000ae] leading-[115%] font-Roboto font-medium'>
            {translateENtoDE('Description not found', language)}
          </span>
        )}
      </div>
      <h3 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto'>
        {translateENtoDE('Instruments', language)}
      </h3>
      <p className='text-[14px] text-[#000000AD] leading-[150%] font-Roboto line-clamp-5 my-[8px]'>
        {language === 'ch-de'
          ? `Entdecke jetzt alle Musikinstrumente und Kurse, die am Standort ${organizationData?.full_name?.de} unterrichtet werden.`
          : `Discover all the musical instruments and courses that are taught at the ${organizationData?.full_name?.en} location.`}
      </p>
      {currectInstruments && currectInstruments?.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {displayedInstruments ? (
            displayedInstruments?.map((instrument, idx) => (
              <div
                onClick={() => {
                  setIsMoreCourseSidebarOpen(true), handleSelectInstrument(instrument?.id);
                }}
                key={instrument?.key ?? idx}
                className={`flex items-center justify-center gap-2 border-[1px] rounded-xl py-[8px] w-fit px-[12px] cursor-pointer border-[#21697C]`}>
                <div
                  className={`ms_instruments ms_instruments-${String(instrument.key)
                    .toLowerCase()
                    .replace(' ', '_')} text-[24px]  text-[#21697C]`}
                />
                <div className={`text-[14px]  leading-[115%] font-Roboto font-medium text-[#21697C]`}>
                  {language === 'ch-de' ? instrument.de : instrument.en}
                </div>
              </div>
            ))
          ) : (
            <span className='text-[14px] text-[#000000ae] leading-[115%] font-Roboto font-medium pt-2'>
              {translateENtoDE('Music lessons are currently not available.', language)}
            </span>
          )}
          {currectInstruments?.length > 8 ? (
            !isExtendedInstrument ? (
              <button
                onClick={() => setIsExtendedInstrument(true)}
                className='flex items-center justify-center gap-1 bg-[#EDF3F5] rounded-xl py-2  w-fit px-3 text-[14px] text-[#21697C] leading-[115%] font-Roboto font-medium'>
                {translateENtoDE('All', language)}
                <span>({currectInstruments?.length})</span>
              </button>
            ) : (
              <div
                className='flex items-center justify-center gap-1 bg-[#EDF3F5] rounded-xl py-2 w-fit px-3 text-[14px] text-[#21697C] leading-[115%] font-Roboto font-medium cursor-pointer'
                onClick={(e) => {
                  setIsExtendedInstrument(false);
                }}>
                {translateENtoDE('Less', language)}
              </div>
            )
          ) : null}
        </div>
      ) : (
        <span className='text-sm text-gray-500'>
          {translateENtoDE(`Music lessons are currently not available.`, language)}
        </span>
      )}
    </div>
  );
}

export default AboutSection;
