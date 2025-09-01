import cx from 'classnames';
import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import useWindowSize from '../../hooks/useWindowSize';
import CourseLinkIcon from '../icons/CourseLink.svg';
import { getScrollbarWidth } from '../../utils';
import CloseIcon from '../icons/close.svg';

const OrganizationContentPopup = ({
  name,
  title,
  onClose,
  isSearch,
  children,
  isCopyLink,
  extraClass,
  onCopyLink,
  extraOnClose,
  isOnlyWrapper,
  mobileOnClose,
  isMobileOnClose, 
  isFullViewModal,
  isFullModalStyle,
  buttonsBlock = null,
  isContactForm = false
}) => {
  const popup = useRef();
  const { width } = useWindowSize();
  const [topOffset, setTopOffset] = useState(0);

  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);
  const closePopup = useCallback(() => {
    onClose();
    document.body.style.overflow = 'hidden';
    document.body.classList.remove('show-popup');
    document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);
    if (isWindows) document.body.classList.remove('show-popup-window');

    if ((mobileOnClose && width < 1100) || (mobileOnClose && isMobileOnClose)) {
      mobileOnClose();
    }
    if (extraOnClose) extraOnClose();
  }, [width, isWindows, onClose, extraOnClose, mobileOnClose, isMobileOnClose]);

  const closeHandle = useCallback(() => {
    if (!name) closePopup();
  }, [name, closePopup]);

  useOutsideClick(popup, closeHandle);

  useEffect(() => {
    if (width < 768) window.scrollTo({ top: 0 });
    if (isFullViewModal) {
      const newOffset = width < 768 ? (buttonsBlock ? 0 : -56) : window.pageYOffset - 160 || 0;
      setTopOffset(newOffset);
    }
  }, [isFullViewModal, width, name, buttonsBlock]);

  useEffect(() => {
    if (name) {
      document.body.style.overflowY = 'hidden';
      document.body.classList.add('show-popup');
      if (isWindows) document.body.classList.add('show-popup-window');
    }

    const handleTouch = (event) => {
      if (event.touches.length > 1) event.preventDefault();
    };

    document.addEventListener('touchmove', handleTouch, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouch);

      if (name) {
        document.body.classList.remove('show-popup');
        if (isWindows) document.body.classList.remove('show-popup-window');
      }
    };
  }, [name, isWindows]);

  const popupContent = useMemo(() => {
    return (
      <div className={cx("bg-white " ,   name === 'contectUs' ? "rounded-none smd:rounded-2xl h-screen smd:h-auto scrollbarHidden overflow-y-auto smd:overflow-visible fixed inset-0 smd:static  pb-4 smd:pb-0" : "rounded-2xl" )}>
        <div
          className={cx( 
            'flex items-center justify-between p-[20px]',
            {
              'pt-[32px]': !!/iPhone|iPad|iPod/i.test(navigator.userAgent),
            },
            name == 'links' ? '!py-4 !px-5 !pr-3' : '',
            name == 'success' ? '' : 'border-b-[1px] border-[#E4E7EC]'
          )}
        >
          {!!title ? (
            <p className="text-[19px] leading-[125%] font-bold font-Roboto text-[#000000DE]">
              {title}
            </p>
          ) : (
            <div />
          )}
          <div className="flex items-center">
            {!!onCopyLink && isCopyLink && (
              <div className="cursor-pointer" onClick={onCopyLink}>
                <CourseLinkIcon color="#424953" />
              </div>
            )}
            <div
              className="ml-5 cursor-pointer transform scale-[1.2] w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 rounded-full"
              onClick={closePopup}
            >
              <CloseIcon color="#424953" />
            </div>
          </div>
        </div>
        <div
          className={cx(
            'teacher-page-popup-content',
            name == 'links' ? '!p-4 !pr-2.5' : ''
          )}
        >
          {children}
        </div>
      </div>
    );
  }, [title, children, closePopup, onCopyLink, isCopyLink]);

  if (isOnlyWrapper) {
    return (
      <div id={`popup-seo-${name}`} ref={popup}>
        {children}
      </div>
    );
  }

  if (isFullViewModal) {
    return (
      <div  
        id={`popup-seo-${name}`}
        className={cx( 
          'fixed bg-[#000000AD]  top-0 left-0 w-full flex items-center justify-center z-[99] ' ,  name === 'contectUs' ?"py-0 smd:py-8 px-0 smd:px-4 h-screen":"py-8 px-4 h-full",
          {
            [extraClass]: !!extraClass,
            '': isFullModalStyle && width <= 768,
          }
        )}
      >
        <div
          ref={popup}
          className={cx(
            '  flex flex-col overflow-y-auto scrollbarHidden',
            name == 'links'
              ? 'h-[48vh] items-center justify-center mx-auto w-fit' :
              name === 'contectUs' ? "pb-0 smd:pb-12 pt-0 smd:pt-10 m-0 smd:mx-auto w-full smd:w-fit h-screen "
              : 'justify-start lg:justify-center h-[100vh] pb-12 pt-10 mx-auto w-fit' ,
             
          )}
        >
          {popupContent}
          {buttonsBlock}
        </div>
      </div>
    );
  }

  return (
    <div id={`popup-seo-${name}`} ref={popup} className="teacher-page-popup">
      {popupContent}
    </div>
  );
};

export default OrganizationContentPopup;