import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Styles from '../styles/mobileMenu.module.scss';
import LangToggle from './NewDesigns/LangToggle';
import LinkRoute from '../utils/link-route';

const MobileMenu = ({ language, blok, close, changeLanguage }) => {
  let [open, setOpen] = useState(false);
  const router = useRouter();

  const openInnerMenu = (value) => {
    setOpen((open = !open));
    value.open = open;
    setHidden(open);
  };

  const onClose = () => {
    close(true);
    blok.content.header.map((head) => (head.open = false));
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  const loginSignup = (value) => {
    const route =
      value === 'login'
        ? `auth/login?language=${language.includes('en') ? 'en' : 'de'}`
        : `auth/signup?language=${language.includes('en') ? 'en' : 'de'}`;
    router.push(`${process.env.MATCHSPACE_PROD}/${route}`);
  };
  const setHidden = (val) => {
    if (val) {
      document.getElementById('menu').style.overflow = 'hidden';
    } else {
      document.getElementById('menu').scrollIntoView();
    }
  };

  return (
    <div className='fixed inset-x-0 top-0 z-20 flex justify-end h-screen lg:hidden animate-raise'>
      <nav className='absolute top-0 z-50 w-full h-full bg-white shadow-lg overflow-scroll'>
        <div className='flex items-center justify-between px-6 py-6 bg-primary'>
          <LangToggle isMobile={true} language={language} setLanguage={changeLanguage} />
          {/* <div className='flex text-18px'>
            <p
              className={language === 'ch-en' ? 'text-white cursor-pointer' : 'text-disable cursor-pointer'}
              onClick={() => changeLanguage('ch-en')}>
              EN
            </p>
            <p className='mx-2 text-disable'>|</p>
            <p
              className={language === 'ch-de' ? 'text-white cursor-pointer' : 'text-disable cursor-pointer'}
              onClick={() => changeLanguage('ch-de')}>
              DE
            </p>
          </div> */}
          <button type='button' onClick={onClose}>
            <i className='text-white material-icons-outlined text-20px'> clear </i>
          </button>
        </div>
        <div className={`${Styles['ms-nav--highlight']} ${Styles['ms-nav-scroll']}`}>
          {!open && (
            <div className='flex items-center pl-6 mt-6 mb-4 space-x-4 font-medium'>
              <i className='material-icons-outlined text-20px text-light-grey-600'>home</i>
              <a href={LinkRoute(language)} className='cursor-pointer'>
                {blok.content.mobile_home}
              </a>
            </div>
          )}
          <ul className='relative block w-full'>
            {blok.content.header.map(
              (header, index) =>
                index > 0 && (
                  <li className='cursor-pointer' key={header._uid}>
                    <div id='menu'>
                      {!open && (
                        <div
                          className='flex items-center justify-between pl-6 pr-5 mb-4 font-medium'
                          onClick={() => openInnerMenu(header)}>
                          <div className='flex space-x-4'>
                            <i className='material-icons-outlined text-20px text-light-grey-600'>{header.icon_name}</i>
                            {header?.internal_link?.length ? (
                              <p>{header.name}</p>
                            ) : (
                              <a href={LinkRoute(header)}>{header.name}</a>
                            )}
                          </div>
                          {header?.internal_link?.length ? (
                            <i className='material-icons-outlined text-light-grey-600 text-20px'>arrow_forward_ios</i>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                    {header.internal_link?.length && header.open && open ? (
                      <>
                        <p className='absolute sticky inset-x-0 top-0 flex items-center px-4 py-4 bg-light-grey-200'>
                          <i
                            onClick={() => openInnerMenu(header)}
                            className='material-icons-outlined text-light-grey-600 text-20px'>
                            {' '}
                            arrow_back_ios{' '}
                          </i>
                          <span className='ml-2 font-medium'>{header.name}</span>
                        </p>
                        <ul
                          id={Styles['internal-links-list']}
                          className={`${Styles['internal-links-list']} mobile-menu-wrapper block w-full h-full  pl-12 my-4 space-y-4 overflow-y-auto`}>
                          {header.internal_link.map((link, ind) => (
                            <li className='block cursor-pointer' key={link._uid}>
                              <a href={LinkRoute(link)}>{link.name}</a>
                              {ind === header.internal_link.length - 3 && header.name === 'Music lessons' ? (
                                <div className='my-4 mr-16 border border-disable'></div>
                              ) : (
                                <></>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                )
            )}
          </ul>
          {!open && (
            <>
              <div className='mx-6 my-4 border border-disable'></div>
              <ul className='pl-6 space-y-4'>
                {blok.content.mobile_help_section.map((section, index) => (
                  <li key={section._uid}>
                    <a href={LinkRoute(section)} className='flex items-center cursor-pointer'>
                      <i className='mr-4 material-icons-outlined text-20px text-light-grey-600'>{section.icon_name}</i>
                      {section.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className='mx-6 my-4 border border-disable'></div>
              <div className='pl-6 space-y-4'>
                {blok.content.header_support.map(
                  (support, index) =>
                    index > 0 && (
                      <a
                        href={support.link.url}
                        key={support.link.url}
                        className='flex tracking-wider cursor-pointer text-primary'>
                        <i className='mr-4 material-icons-outlined text-20px'>{support.icon_name}</i>
                        {support.name}
                      </a>
                    )
                )}
              </div>
              <div className='px-6 my-10 sm:mt-20 pb-[30px]'>
                <button
                  type='button'
                  onClick={() => loginSignup('signup')}
                  className='flex items-center justify-center w-full py-3 mb-4 font-medium tracking-widest text-white rounded-full bg-primary hover:bg-dark-primary sm:mb-8'>
                  {blok.content.registers}
                </button>
                <button
                  onClick={() => loginSignup('login')}
                  type='button'
                  className='flex items-center justify-center w-full py-3 font-medium tracking-widest border border-solid rounded-full border-primary text-primary'>
                  {blok.content.log_in}
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
