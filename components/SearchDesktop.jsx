import { isEmpty } from 'ramda';
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import TeachersSearchOnline from './TeachersSearch/TeachersSearchOnline';
import { translateENtoDE } from '../functions/translator';
import InstrumentTypeAhead from './InstrumentTypeAhead';
import LocationTypeAhead from './LocationTypeAhead';
import SearchWhite from './icons/SearchWhite.svg';
import SearchPin from './icons/SearchPin.svg';
import Note from './icons/Note.svg';

const SearchDesktop = ({
  blok,
  control,
  isOnline,
  setIsOnline,
  options,
  language,
  onSubmit,
  isLoading,
  errorLabels,
  handleSubmit,
  setOptionsSelectedContext,
}) => {
  const locationInputRef = useRef(null);
  const instrumentInputRef = useRef(null);

  const handleInstrumentRender = ({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
    function handleChange(e) {
      !isEmpty(e) && locationInputRef.current?.focus();
      onChange(e);
    }
    return (
      <InstrumentTypeAhead
        error={error}
        language={language}
        name={name}
        onBlur={onBlur}
        onChange={handleChange}
        options={options}
        placeholder={errorLabels.instrumentError}
        ref={instrumentInputRef}
        value={value}
      />
    );
  };

  function handleLocationRender({ field: { onChange, onBlur, value }, fieldState: { error } }) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='sticky-search-form-desktop'>
      <div className='sticky-search-form-desktop-content'>
        <div className='relative'>
          <Controller name='instrument' control={control} render={handleInstrumentRender} />
          <div className='absolute top-[11px] left-[11px]'>
            <Note />
          </div>
        </div>
        <div className='relative'>
          <Controller name='location' control={control} render={handleLocationRender} />
          <div className='absolute top-[11px] left-[11px]'>
            <SearchPin />
          </div>
        </div>
        <div className='sticky-search-form-online'>
          <TeachersSearchOnline isOnline={isOnline} language={language} setIsOnline={setIsOnline} />
        </div>
      </div>
      <button type='submit' className='sticky-search-form-submit'>
        {isLoading ? (
          translateENtoDE('LOADING...', language)
        ) : (
          <>
            <div className='mr-[9px]'>
              <SearchWhite />
            </div>
            {language === 'ch-en' ? 'Search' : 'Suchen'}
          </>
        )}
      </button>
    </form>
  );
};

export default SearchDesktop;
