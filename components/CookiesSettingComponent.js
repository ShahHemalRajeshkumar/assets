import React, { useState } from 'react';

import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';

const ModalComponent = dynamic(() => import('./ModalComponent'));
const CookiesSettingModalComponent = dynamic(() => import('./CookiesSettingModalComponent'));

const CookiesSettingComponent = ({ close }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['allCookie']);

  const [show, setShow] = useState(false);
  const modalShowHide = (flag, closeFlag) => {
    setShow(flag);
    if (!flag && !closeFlag) {
      close(true);
    }
  };

  const setAllCookie = () => {
    setCookie('cookieConsent', true);
    close(true);
  };

  return (
    <div className='fixed bottom-0 z-40 w-full mb-6 bg-primary-blue md:bottom-6'>
      <div className='flex flex-col items-center py-4 text-white contain md:flex-row md:justify-between'>
        <p className='text-center md:w-3/5 md:text-left'>
          This website uses cookies. By navigating around this site you consent to cookies being stored on your machine.
        </p>
        <div className='flex flex-col items-center mt-4 sm:flex-row md:mt-0'>
          <button
            className='pb-1 border-b-2 border-white sm:mr-8 text-16px md:text-18px'
            onClick={() => modalShowHide(true)}
            type='button'>
            Cookie Settings
          </button>
          <button
            className='px-4 py-1 mt-4 rounded-full bg-red text-16px md:text-18px sm:mt-0'
            onClick={setAllCookie}
            type='button'>
            Accept All Cookies
          </button>
        </div>
      </div>
      <ModalComponent show={show} handleClose={() => modalShowHide(false, true)}>
        <CookiesSettingModalComponent close={modalShowHide} />
      </ModalComponent>
    </div>
  );
};

export default CookiesSettingComponent;
