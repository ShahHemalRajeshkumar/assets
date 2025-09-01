import React, { useRef } from 'react';
import Logotype from '../../Logotype';
import LinkRoute from '../../../utils/link-route';
import { extractClassValues } from '../../../utils/breakpoint';

const FooterBottomBar = ({ blok }) => {
  const {
    content: { copy_right, terms_and_condition, logotypes, _uid },
  } = blok;

  return (
    <div className='flex flex-col gap-4 pt-2 mb-4 border-t-2 border-disable text-light-grey-300 text-16px md:justify-between md:flex-row'>
      <p className='md:basis-1/5 order-3 md:order-1 '>
        &copy; {new Date().getFullYear()} {copy_right}
      </p>
      {logotypes && (
        <div className='order-1 md:mb-0 grid grid-cols-3 md:flex md:gap-6  md:justify-center items-center md:basis-3/5'>
          {blok?.content?.logotypes?.[0].components.map((el) => (
            <div className='inline-block' key={el._uid}>
              <Logotype className='w-14 h-14' key={_uid} blok={el} />
            </div>
          ))}
        </div>
      )}
      <a href={LinkRoute(terms_and_condition[0])} className='order-2 md:basis-1/5 cursor-pointer md:text-right'>
        {terms_and_condition[0].name}
      </a>
    </div>
  );
};

export default FooterBottomBar
