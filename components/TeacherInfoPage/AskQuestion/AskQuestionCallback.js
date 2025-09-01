import React from 'react';
import { translateENtoDE } from '../../../functions/translator';

const AskQuestionCallback = ({ language }) => {
  return (
    <div className='max-w-[400px] min-h-[140px] flex-col justify-center'>
      <div className='tx-primary text-[22px] font-[600] leading-[26px] mt-[30px] mb-[12px] text-center'>
        {translateENtoDE('Thank you!', language)}
      </div>
      <div className='tx-secondary text-[16px] leading-[20px] text-center mx-[15px] mb-[30px]'>
        {translateENtoDE(
          'Many thanks for your request! We have received your call back request and will contact you shortly.',
          language
        )}
      </div>
    </div>
  );
};

export default AskQuestionCallback;
