import cx from 'classnames';
import { isEmpty } from 'ramda';
import { Controller } from 'react-hook-form';
import React, { useRef, useEffect } from 'react';
import TeachersSearchOnline from './TeachersSearch/TeachersSearchOnline';
import { translateENtoDE } from '../functions/translator';
import InstrumentTypeAhead from './InstrumentTypeAhead';
import LocationTypeAhead from './LocationTypeAhead';
import useWindowSize from '../hooks/useWindowSize';
import SearchWhite from './icons/SearchWhite.svg';
import SearchPin from './icons/SearchPin.svg';
import Note from './icons/Note.svg';

const SearchMobile = ({
  blok,
  show,
  control,
  options,
  language,
  onSubmit,
  isOnline,
  isLoading,
  errorLabels,
  setIsOnline,
  handleSubmit,
  setOptionsSelectedContext,
}) => {
  const { width } = useWindowSize();
  const locationInputRef = useRef(null);
  const instrumentInputRef = useRef(null);

  useEffect(() => {
    if (show && width < 768) {
      const popup = document?.getElementById('popup-seo-main-search');
      const content = document?.getElementById('popup-seo-main-search-content');

      if (popup) {
        popup.style.overflow = 'hidden';
        popup.style.height = `${window.innerHeight}px`;
      }
      if (content) content.style.height = `${window.innerHeight - 60}px`;
    }
  }, [show, width]);

  return (
    <form
      id='popup-seo-main-search-content'
      onSubmit={handleSubmit(onSubmit)}
      className={cx('modal_search_form_content justify-start')}>
      <div>
        <div className='relative w-full mb-[20px]'>
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
                  language={language}
                  onBlur={onBlur}
                  onChange={handleChange}
                  options={options}
                  placeholder={errorLabels.instrumentError}
                  ref={instrumentInputRef}
                  value={value}
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
                language={language}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={blok.location_placeholder}
                ref={locationInputRef}
                setOptionsSelectedContext={setOptionsSelectedContext}
                value={value}
              />
            )}
          />
          <div className='absolute top-[11px] left-[11px]'>
            <SearchPin />
          </div>
        </div>
        <div className='h-[1px] w-full bg-[#E4E7EC] my-[20px]' />
        <div className='px-[3px]'>
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
    </form>
  );
};

export default SearchMobile;
