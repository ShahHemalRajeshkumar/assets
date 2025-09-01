import cx from 'classnames';
import React, { useState, useCallback } from 'react';
import { translateENtoDE } from '../../functions/translator';

const SearchInArea = ({ mapRef, language, seoActions, onSearchInArea }) => {
  const [isLoading, setIsLoading] = useState(false);

  const searchHandle = useCallback(async () => {
    if (mapRef?.current) {
      const { lng, lat } = mapRef?.current?.getCenter();
      seoActions?.mapSearchArea(`${lat};${lng}`);

      setIsLoading(true);
      onSearchInArea(lat, lng, () => setIsLoading(false));
    }
  }, [mapRef, seoActions, onSearchInArea]);

  return (
    <div
      onClick={searchHandle}
      className={cx('map-search-area select-none', {
        'map-search-area-de': language !== 'ch-en',
      })}>
      <div className={cx({ 'opacity-0': isLoading })}>{translateENtoDE('Search in this area', language)}</div>
      {isLoading && <div className='absolute'>{translateENtoDE('LOADING...', language)}</div>}
    </div>
  );
};

export default SearchInArea;
