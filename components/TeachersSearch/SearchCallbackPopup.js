import React from 'react';
import { translateENtoDE } from '../../functions/translator';

const SearchCallbackPopup = ({ language, isWait, isSearch }) => {
  const title = isSearch ? 'Thank you!' : isWait ? 'Thank you for your patience!' : '';
  const message = isSearch
    ? 'Many thanks for your request! We have received your call back request and will contact you shortly.'
    : isWait
    ? 'We will get back to you with an update as soon as we hear back from your teacher.'
    : '';

  return (
    <div className='max-w-[400px] min-h-[140px] flex-col justify-center'>
      <div className='tx-primary text-[22px] font-[600] leading-[26px] mt-[30px] mb-[12px] text-center'>
        {translateENtoDE(title, language)}
      </div>
      <div className='tx-secondary text-[16px] leading-[20px] text-center mx-[15px] mb-[30px]'>
        {translateENtoDE(message, language)}
      </div>
    </div>
  );
};

export default SearchCallbackPopup;
