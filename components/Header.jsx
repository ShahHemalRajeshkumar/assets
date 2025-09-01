import React, { useCallback, useEffect, useState } from 'react';
import { instrumentNameDe } from '../utils/translationExceptionsDe';
import { instrumentStundenDe } from '../utils/translationExceptionsDe';

const Header = React.forwardRef(({ instrument, isCountry, language, locationItems }, ref) => {
  const isEnglish = language === 'ch-en';
  const instrumentName = (isEnglish ? instrument?.en : instrument?.de) || '';
  const instrumentDe = `${instrument?.de || ''}${instrument?.delimiters?.teacher || ''}`;
  const instrumentDeLesson = `${instrument?.de || ''}${instrument?.delimiters?.lessons || ''}`;
  const location = locationItems?.split(',')[0];

  const h1en = (
    <h1 className='teacher-search-header-h1'>
      <span className='capitalize'>{instrumentName}</span> lessons in {location}
    </h1>
  );

  const h1de = (
    <h1 className='teacher-search-header-h1'>
      {instrumentDeLesson} in {isCountry && 'der '}
      {location}
    </h1>
  );

  const h2en = (
    <h2 className='teacher-search-header-h2'>
      Learn {instrument.key === 'singing' ? 'to' : 'to play the'}{' '}
      <span className='lowercase'>{instrument.key === 'singing' ? 'sing' : instrumentName}</span>! Find your perfect{' '}
      <span className='lowercase'>{instrument.key === 'singing' ? 'sing' : instrumentName}</span> teacher for private
      classes in {location}
      {'.'}
    </h2>
  );

  const h2de = (
    <h2 className='teacher-search-header-h2'>
      Lerne <span className='capitalize'>{instrumentName}</span> spielen! Finde deine*n perfekte*n {instrumentDe} für{' '}
      {instrumentStundenDe(instrumentName)} in {isCountry && 'der '}
      {location}
      {'.'}
    </h2>
  );

  const signingDE = (
    <h2 className='teacher-search-header-h2'>
      {'Lerne singen und finde deine*n perfekte*n Musiklehrer*in für Gesangsstunden in '}
      {isCountry && 'der '}
      {location}
    </h2>
  );

  const h1 = isEnglish ? h1en : h1de;
  const h2 = isEnglish ? h2en : instrument.key === 'singing' ? signingDE : h2de;

  const [counter, setCounter] = useState(0);

  const heightHandle = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window?.innerWidth && window?.innerWidth <= 1024 && window?.innerHeight) {
        const innerHeight = window?.innerHeight;
        const height = innerHeight < 200 ? '100vh' : `${innerHeight}px`;

        document.body.style.setProperty('--inner-height', height);
      }
    }
  }, []);

  useEffect(() => {
    if (counter < 10) {
      const interval = setInterval(() => {
        heightHandle();
        setCounter((prevCount) => prevCount + 1);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [counter, heightHandle]);

  useEffect(() => {
    window.addEventListener('resize', heightHandle);
    screen.orientation.addEventListener('change', heightHandle);
    return () => {
      window.removeEventListener('resize', heightHandle);
      screen.orientation.addEventListener('change', heightHandle);
    };
  }, [heightHandle]);

  return (
    <header className='teacher-search-header'>
      <div className='mx-auto contain overlay transition-opacity'>
        <div className='flex items-center justify-center'>
          <div className='ms_instruments text-6xl text-white mr-6 md:block hidden'>
            <div className={`ms_instruments-${String(instrument?.key).toLowerCase().replace(' ', '_')}`} />
          </div>
          <div className='text-center text-white'>
            {h1}
            {h2}
          </div>
        </div>
        <div ref={ref} />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
