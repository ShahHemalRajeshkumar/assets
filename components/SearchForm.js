import cx from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { isEmpty } from 'ramda';

import { getValidationSchema } from '../utils/searchFormValidationSchema';
import TeachersSearchOnline from './TeachersSearch/TeachersSearchOnline';
import { getInitialLocation } from '../utils/getInitialLocation';
import MobileSearchButton from './searchPage/MobileSearchButton';
import { translateENtoDE } from '../functions/translator';
import TeacherPopup from './TeacherInfoPage/TeacherPopup';
import InstrumentTypeAhead from './InstrumentTypeAhead';
import LocationTypeAhead from './LocationTypeAhead';
import useWindowSize from '../hooks/useWindowSize';
import SearchWhite from './icons/SearchWhite.svg';
import SearchPin from './icons/SearchPin.svg';
import Note from './icons/Note.svg';

const Instrument = dynamic(() => import('./icons/Instrument'), { ssr: false });
const Location = dynamic(() => import('./icons/Location'), { ssr: false });

const SearchForm = memo(({ blok, instruments }) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const locationInputRef = useRef(null);
  const instrumentInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optionsSelectedContext, setOptionsSelectedContext] = useState([]);

  const language = router.query.language;

  const errorLabels = useMemo(() => ({
    locationError: translateENtoDE('Select your location', language),
    instrumentError: translateENtoDE('Select your instrument', language),
  }), [language]);

  const { control, getValues, handleSubmit, setValue } = useForm({
    defaultValues: {
      instrument: [],
      location: [],
    },
    resolver: yupResolver(getValidationSchema(errorLabels)),
    reValidateMode: 'onChange',
  });

  const formValues = useMemo(() => {
    const location = getValues('location');
    const instrument = getValues('instrument');
    const placeholderLabel = translateENtoDE('Find music lessons near you...', language);
    const mobileSearchLabel = !isEmpty(instrument) && !isEmpty(location) ? `${instrument} ∙ ${location}` : placeholderLabel;
    return { location, instrument, placeholderLabel, mobileSearchLabel };
  }, [getValues, language]);

  const modalShowHide = useCallback((flag, closeFlag) => {
    setShow(flag);
    if (!flag && !closeFlag) {
      close(true);
    }
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);

    const noLocationData = isEmpty(optionsSelectedContext) || !optionsSelectedContext;
    const locationData = noLocationData ? getInitialLocation(language) : optionsSelectedContext;

    if (noLocationData) {
      setValue('location', [language === 'ch-de' ? 'Schweiz' : 'Switzerland']);
    }

    if (!isEmpty(data.instrument) && !isEmpty(locationData)) {
      let path;
      if (Array.isArray(locationData?.place_type) && !isEmpty(locationData?.place_type)) {
        if (locationData?.place_type[0] === 'address') {
          path = locationData.context
            .filter((item) => !item.id.startsWith('postcode'))
            .map((item) => `${item.text.toLowerCase()}`)
            .join('-');
        }
        if (locationData?.place_type[0] === 'postcode') {
          path = locationData.context.map((item) => `${item.text.toLowerCase()}`).join('-');
        }
        if (locationData?.place_type[0] === 'locality') {
          const localityPath = locationData.place_name.split(',');
          path = localityPath.map((item) => `${item.trim().toLowerCase()}`).join('-');
        }
        if (locationData?.place_type[0] === 'place') {
          const placePath =
            language === 'ch-en' ? locationData.place_name.split(',') : locationData.place_name_de.split(',');
          path = placePath.map((item) => item.trim().toLowerCase()).join('-');
        }
        if (locationData?.place_type[0] === 'region') {
          const regionPath = locationData.place_name.split(',');
          path = regionPath.map((item) => item.trim().toLowerCase()).join('-');
        }
        if (locationData?.place_type[0] === 'country') {
          const regionPath = locationData.place_name.split(',');
          path = regionPath.map((item) => item.trim().replace(/-/g, '%20').toLowerCase()).join('-');
        }
      } else {
        const queryPath = locationData.split(',');
        path = queryPath.map((item) => `${item.trim().toLowerCase()}`).join('-');
      }
      const lessonLabel = language === 'ch-en' ? 'lessons' : 'unterricht';

      const safePath = path?.replaceAll('/', '+');
      const onlineQuery = isOnline ? '?online=true' : '';


      router.push(
        `/${language}/${data.instrument[0].toLowerCase()}-${lessonLabel}/${safePath}${onlineQuery}`,
        undefined,
        { shallow: false }
      );

    
    }
  };

  const handleLoadingEnd = () => setIsLoading(false);

  useEffect(() => {
    router?.events?.on('routeChangeComplete', handleLoadingEnd);
    return () => {
      router?.events?.off('routeChangeComplete', handleLoadingEnd);
    };
  }, [router]);

  useEffect(() => {
    if (show) {
      const popup = document?.getElementById('popup-seo-main-search');
      const content = document?.getElementById('popup-seo-main-search-content');
      if (popup) popup.style.height = `${window.innerHeight}px`;
      if (content) content.style.maxHeight = `${window.innerHeight - 60}px`;
    }
  }, [show]);

  useEffect(() => {
    if (width >= 960 && show) setShow(false);
  }, [width, show, setShow]);

  const [showed, setShowed] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const onClosePopup = useCallback(() => {
    setOpenPopup(false);
    window?.history?.replaceState(null, '', `/${language}`);
  }, [language]);

  useEffect(() => {
    if (!openPopup && !showed && window.location.search.includes('teachers=notfound')) {
      setOpenPopup(true);
      setShowed(true);
    }
  }, [showed, openPopup]);

  const [counter, setCounter] = useState(0);
  const [isCleared, setIsCleared] = useState(false);
  const [options, setOptions] = useState(instruments || []);

  const getInstruments = useCallback(() => {
    if (instruments?.length) {
      setOptions(instruments);
      return;
    }

    if (typeof window !== 'undefined') {
      try {
        const localInstruments = JSON.parse(localStorage.getItem('instruments') || '[]');
        setOptions(Array.isArray(localInstruments) && localInstruments.length ? localInstruments : instruments || []);
      } catch {
        setOptions(instruments || []);
      }
    }
  }, [instruments]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!options?.length && counter < 3) {
      const timeoutId = setTimeout(() => {
        setCounter(prev => prev + 1);
        getInstruments();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [counter, options?.length, getInstruments]);

  return (
    <>
      {!!openPopup && (
        <TeacherPopup
          title=''
          isSearch
          name='not-found'
          onClose={onClosePopup}
          isFullViewModal={true}
          isFullModalStyle={true}>
          <div className='max-w-[480px] m-auto min-h-[140px] flex-col justify-center'>
            <div className='tx-primary text-[22px] font-[600] leading-[26px] mb-[12px] text-center'>
              {translateENtoDE('Teacher could not be found', language)}
            </div>
            <div className='tx-secondary text-[16px] leading-[20px] text-center mb-[40px] mx-[15px]'>
              {language === 'ch-en'
                ? 'The teacher you are looking for has a new profile link or does not exist. Please search again for the instrument in your area. Many thanks!'
                : 'Die gesuchte Lehrperson hat einen neuen Profil-Link oder existiert nicht. Bitte starte deine Suche erneut. Herzlichen Dank.'}
            </div>
          </div>
        </TeacherPopup>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center justify-between md:h-16 md:space-x-2 md:flex-row'>
        <div className='hidden md:flex md:flex-1 items-center md:space-x-3'>
          <div className='relative w-full my-4 lg:my-0'>
            <Controller
              control={control}
              name='instrument'
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                const handleChange = (e) => {
                  !isEmpty(e) && locationInputRef.current?.focus();
                  onChange(e);
                };

                return (
                  <InstrumentTypeAhead
                    error={error}
                    value={value}
                    onBlur={onBlur}
                    options={options}
                    language={language}
                    onChange={handleChange}
                    ref={instrumentInputRef}
                    placeholder={blok.instrument_placeholder}
                    default_instrument_selected={blok.default_instrument_selected}
                  />
                );
              }}
            />
            <Instrument />
          </div>
          <div className='relative w-full my-4 lg:my-0'>
            <Controller
              control={control}
              name='location'
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <LocationTypeAhead
                  error={error}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  language={language}
                  ref={locationInputRef}
                  placeholder={blok.location_placeholder}
                  setOptionsSelectedContext={setOptionsSelectedContext}
                />
              )}
            />
            <Location />
          </div>
          <div className='flex items-center justify-between relative border-[1px] border-[#d1d5db] min-w-[130px] h-[53px] pl-[12px] rounded-[8px]'>
            <TeachersSearchOnline label='Online' isOnline={isOnline} language={language} setIsOnline={setIsOnline} />
          </div>
        </div>
        <button
          className='w-[180px] items-center justify-center hidden py-3 font-medium tracking-wide text-white uppercase rounded-full md:flex text-16px bg-secondary active:bg-dark-primary focus:bg-dark-primary md:hover:bg-dark-primary px-11 ml-[8px]'
          type='submit'>
          {isLoading ? (
            translateENtoDE('LOADING...', language)
          ) : (
            <>
              <i className='w-5 h-5 mr-2 material-icons-outlined'> search </i>
              {blok.submit_text}
            </>
          )}
        </button>
        <MobileSearchButton onClick={() => setShow(true)} label={formValues.mobileSearchLabel} />
        {show && width < 960 && (
          <TeacherPopup
            isSearch
            name='main-search'
            isFullViewModal={true}
            isFullModalStyle={true}
            extraClass='popup-seo-main-search-2'
            onClose={() => modalShowHide(false, true)}
            title={translateENtoDE('Search', language)}>
            <div id='popup-seo-main-search-content' className={cx('modal_search_form_content justify-start')}>
              <div>
                <div className='relative w-full mb-[12px]'>
                  <Controller
                    control={control}
                    name='instrument'
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                      const handleChange = (e) => {
                        !isEmpty(e) && locationInputRef.current?.focus();
                        onChange(e);
                      };
                      return (
                        <InstrumentTypeAhead
                          error={error}
                          value={value}
                          onBlur={onBlur}
                          options={options}
                          language={language}
                          onChange={handleChange}
                          ref={instrumentInputRef}
                          placeholder={blok.instrument_placeholder}
                        />
                      );
                    }}
                  />
                  <div className='absolute top-[11px] left-[11px]'>
                    <Note />
                  </div>
                </div>
                <div className='relative w-full'>
                  <Controller
                    control={control}
                    name='location'
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                      <LocationTypeAhead
                        error={error}
                        value={value}
                        onBlur={onBlur}
                        language={language}
                        onChange={onChange}
                        ref={locationInputRef}
                        placeholder={blok.location_placeholder}
                        setOptionsSelectedContext={setOptionsSelectedContext}
                      />
                    )}
                  />
                  <div className='absolute top-[11px] left-[11px]'>
                    <SearchPin />
                  </div>
                </div>
                <div className='h-[1px] w-full bg-[#E4E7EC] my-[20px]' />
                <div className='relative w-full px-[3px]'>
                  <TeachersSearchOnline isOnline={isOnline} language={language} setIsOnline={setIsOnline} />
                </div>
              </div>
              <button type='submit' className='modal_search_form_submit mt-[24px]'>
                {isLoading ? (
                  translateENtoDE('LOADING...', language)
                ) : (
                  <>
                    <div>
                      <SearchWhite />
                    </div>
                    {blok.submit_text}
                  </>
                )}
              </button>
            </div>
          </TeacherPopup>
        )}
      </form>
    </>
  );
});

SearchForm.displayName = 'SearchForm';
export default SearchForm;
