import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Styles from '../../styles/navigation.module.scss';
import NavigationTopBarList from './NavigationTopBarList/NavigationTopBarList';
import { sharedService } from '../../utils/shared-service';
import LangToggle from '../NewDesigns/LangToggle';
import LinkRoute from '../../utils/link-route';

const Logo = dynamic(() => import('./../Logo'));
const MobileMenu = dynamic(() => import('./../MobileMenu'));

const Navigation = ({
  story,
  language,
  showForm,
  isVisible,
  isLocationPage,
  isOnSearchPage,
  languageContent,
  isTeacherInfoPage,
  isOrganizatioPage,
  organizationData
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedHeader, setClickedHeader] = useState('');
  const [headerContent, setHeaderContent] = useState([]);
  const [scrollTopValue, setScrollTopValue] = useState(0);
  const [openMobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const [show] = showForm;
  const blok =
    story?.body?.find((comp) => comp.component === 'global_reference')?.reference || {};
  const clickMenu = (clickedHeader) => {
    setClickedHeader(clickedHeader.name);
    headerContent.forEach((header) => {
      return (header.show = header.show ? false : header._uid === clickedHeader._uid);
    });
    setOpenMenu(!openMenu);
    setHeaderContent([...headerContent]);
  };
  const clickMobileMenu = () => {
    setMobileMenu(!openMobileMenu);
  };
  useEffect(() => {
    const normalizePath = (path) => {
      if (!path) return '';
      return '/' + path.replace(/^\/|\/$/g, '').split('?')[0];
    };
    const currentPath = normalizePath(router.asPath);
    const updatedHeaders = blok?.content?.header?.map((header) => {
      header.show = false;
      header.active = false;
      const isActive = header?.internal_link?.length
        ? header.internal_link.some((link) => {
            const targetPath = normalizePath(link.link?.cached_url);
            return targetPath === currentPath;
          })
        : normalizePath(header?.link?.cached_url) === currentPath;

      if (isActive) {
        header.active = true;
      }

      return header;
    }) || [];
    setHeaderContent(updatedHeaders);
  }, [router.asPath]);

  const setLanguage = (value) => {
    setIsLoading(true);

    if (router?.pathname.includes('/schools')) {
      const schoolName =
        value == 'ch-en'
          ? organizationData?.full_name?.en
          : organizationData?.full_name?.de;
      router.replace(
        `/${value}/schools/${router.query.organization}/${schoolName
          ?.toLowerCase()
          .split(' ')
          .join('-')}`
      );
      document.body.style.overflow = 'scroll';
      setTimeout(() => setIsLoading(false), 3000);
      return;
    }

    if (isLocationPage) {
      if (language !== value) router.push(`/${value}`);
    } else {
      if (languageContent && language !== value) languageContent(value);
      if (!languageContent && language !== value) {
        router.push(
          router.asPath.replace(value === 'ch-en' ? 'ch-de' : 'ch-en', value)
        );
      }
    }

    setTimeout(() => setIsLoading(false), 3000);
  };
  const [helpPage, SetHelpPage] = useState(false);
  useEffect(() => {
    if (router.query.slug !== undefined)
      SetHelpPage(
        [
          'agb-datenschutz-cookies-impressum',
          'hilfe',
          'help',
          'blog',
          'news-detail',
          'in-the-news',
          'news',
          'terms-and-conditions',
          'neuigkeiten',
          'in-den-nachrichten',
          'nachrichtendetails',
        ].includes(router.query.slug[0]) ||
          router.asPath.includes('blog-de' || 'blog-en')
      );
  }, [router.query.slug, router.asPath]);

  const loginSignup = (value) => {
    const route =
      value === 'login'
        ? `auth/login?language=${language.includes('en') ? 'en' : 'de'}`
        : `auth/signup?language=${language.includes('en') ? 'en' : 'de'}`;
    router.push(`${process.env.MATCHSPACE_PROD}/${route}`);
  };

  sharedService.getModalOpenData().subscribe((data) => {
    setModalOpen(data);
  });

  sharedService.getnavOpenData().subscribe((data) => {
    if (!data) {
      headerContent.map((header) => (header.show = false));
      setHeaderContent([...headerContent]);
      setOpenMenu(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => setScrollTopValue(window.scrollY);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      sharedService.clearModalData();
      sharedService.clearNavData();
    };
  }, []);
  const checkHeaderClasses = (classes) => (!isOnSearchPage ? classes : '');
  return (
    <>
      {isLoading && (
        <div className="page-loading">
          <div className="loading-balls">
            <div className="ball first-ball mr-[12px]"></div>
            <div className="ball second-ball mr-[12px]"></div>
            <div className="ball"></div>
          </div>
        </div>
      )}
      <header
        className={checkHeaderClasses(
          modalOpen ? 'sticky lg:top-0' : 'sticky lg:top-0 z-30'
        )}
      >
        <nav className="relative">
          <div
            className={`search-header ${
              show ? 'z-0' : 'z-10'
            } flex items-center justify-between ${
              isOrganizatioPage ? 'bg-white' : 'lg:bg-white'
            } flex-nowrap py-2 lg:py-0 lg:px-8 xxl:px-20 px-4 lg:shadow-lg bg-opacity-0 ${
              isTeacherInfoPage ? '' : 'fixed'
            } top-0 inset-x-0 ${Styles['ms-nav-position']} 
          ${
            !isOrganizatioPage &&
            (scrollTopValue !== 0 || helpPage) &&
            Styles[isOnSearchPage ? 'ms-nav-active-on-search' : 'ms-nav-active']
          }`}
          >
            <div
              className={`inline-flex items-center ${
                isOnSearchPage ? 'search' : 'home'
              } min-h-[48px]`}
            >
              {!show && (
                <Logo
                  href={LinkRoute(blok?.content?.header?.[0])}
                  isVisible={isVisible}
                  isOnSearchPage={isOnSearchPage}
                />
              )}
              <NavigationTopBarList
                clickedHeader={clickedHeader}
                headerContent={headerContent}
                clickMenu={clickMenu}
                language={language}
              />
            </div>
            <div className="flex items-center hidden lg:flex min-h-[48px] min-w-[280px]">
              <div className="mr-[24px]">
                <LangToggle language={language} setLanguage={setLanguage} />
              </div>
              <div className="inline-flex gap-4">
                <button
                  type="button"
                  onClick={() => loginSignup('login')}
                  className="w-[120px] tracking-widest lg:!px-3 min-[1480px]:!px-11 btn-primary bg-primary focus:outline-none"
                >
                  {blok?.content?.log_in || 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => loginSignup('signup')}
                  className="w-[120px] tracking-widest lg:!px-3 min-[1480px]:!px-11 btn-primary bg-primary focus:outline-none"
                >
                  {blok?.content?.registers || 'Register'}
                </button>
              </div>
            </div>
            <div className="lg:hidden" onClick={clickMobileMenu}>
              {!openMobileMenu && (
                <i
                  className={`${
                    isTeacherInfoPage ||
                    (scrollTopValue !== 0 && !isOnSearchPage) ||
                    helpPage
                      ? 'text-primary'
                      : 'text-white'
                  } material-icons-outlined text-40px mobile-menu-icon`}
                >
                  menu
                </i>
              )}
            </div>
          </div>
        </nav>
        {openMobileMenu && (
          <MobileMenu
            blok={blok}
            language={language}
            close={clickMobileMenu}
            changeLanguage={(value) => setLanguage(value)}
          />
        )}
      </header>
    </>
  );
};
Navigation.displayName = 'Navigation';
export default Navigation;
