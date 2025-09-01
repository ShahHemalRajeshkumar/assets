import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const CookiesSettingModalComponent = ({ close }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['preferenceCookie']);
  const [preferenceCookie, setPreferenceCookie] = useState(true);
  const [analyticsCookie, setAnalyticsCookie] = useState(true);
  const [marketingCookie, setMarketingCookie] = useState(false);

  const setSpecificCookieState = (type, event) => {
    event.target.checked ? type(true) : type(false);
  };

  const onConfirm = () => {
    preferenceCookie ? setCookie('preferenceCookie', true) : removeCookie('preferenceCookie');
    analyticsCookie ? setCookie('analyticsCookie', true) : removeCookie('analyticsCookie');
    marketingCookie ? setCookie('marketingCookie', true) : removeCookie('marketingCookie');
    close(false, false);
  };

  return (
    <div className='flex flex-col'>
      <p className='mb-2 font-akkurat_bold_regular'>Privacy Preference Center</p>
      <p className='pb-8 border-b border-mine-shaft text-14px md:text-16px'>
        We use cookies to recognize visitors and improve their browsing experience. We also use them to analyze site
        traffic, personalize content, and measure ad campaign effectiveness.
      </p>
      <p className='pt-4 pb-6 font-akkurat_bold_regular'>Manage Consent Preferences</p>
      <div className='grid grid-cols-2 gap-x-4 gap-y-10'>
        <p>Strictly Necessary Cookies</p>
        <p className='justify-self-end'>Always Active</p>
        <p>Preferences Cookies</p>
        <div className='mr-8 justify-self-end'>
          <label className='relative flex items-center cursor-pointer action-toggle'>
            <input
              type='checkbox'
              checked
              className='sr-only'
              onClick={($event) => setSpecificCookieState(setPreferenceCookie, $event)}
            />
            <span className='w-10 h-4 rounded-full shadow-inner bg-silver-grey'></span>
            <span className='absolute w-6 h-6 transition bg-white rounded-full shadow action-toggle-dot -left-1'></span>
          </label>
        </div>
        <p>Analytics Cookies</p>
        <div className='mr-8 justify-self-end'>
          <label className='relative flex items-center cursor-pointer action-toggle'>
            <input
              type='checkbox'
              checked
              className='sr-only'
              onClick={($event) => setSpecificCookieState(setAnalyticsCookie, $event)}
            />
            <span className='w-10 h-4 rounded-full shadow-inner bg-silver-grey'></span>
            <span className='absolute w-6 h-6 transition bg-white rounded-full shadow action-toggle-dot -left-1'></span>
          </label>
        </div>
        <p>Marketing Cookies</p>
        <div className='mr-8 justify-self-end'>
          <label className='relative flex items-center cursor-pointer action-toggle'>
            <input
              type='checkbox'
              className='sr-only'
              onClick={($event) => setSpecificCookieState(setMarketingCookie, $event)}
            />
            <span className='w-10 h-4 rounded-full shadow-inner bg-silver-grey'></span>
            <span className='absolute w-6 h-6 transition bg-white rounded-full shadow action-toggle-dot -left-1'></span>
          </label>
        </div>
      </div>
      <div className='flex justify-end pt-16' onClick={onConfirm}>
        <button className='px-4 py-2 text-white rounded-full bg-red' type='button'>
          Confirm
        </button>
      </div>
    </div>
  );
};
export default CookiesSettingModalComponent;
