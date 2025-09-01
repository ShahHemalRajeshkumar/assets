import cx from 'classnames';
import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import useWindowSize from '../../hooks/useWindowSize';
import CourseLinkIcon from '../icons/CourseLink.svg';
import { getScrollbarWidth } from '../../utils';
import CloseIcon from '../icons/close.svg';

const TeacherPopup = ({
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
}) => {
  const popup = useRef();
  const { width } = useWindowSize();
  const [topOffset, setTopOffset] = useState(0);

  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);

  const closePopup = useCallback(() => {
    onClose();
    document.body.style.overflowY = 'auto';
    document.body.classList.remove('show-popup');
    document.body.classList.remove('session-view');
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
        document.body.style.overflowY = 'auto';
        document.body.classList.remove('show-popup');
        if (isWindows) document.body.classList.remove('show-popup-window');
      }
    };
  }, [name, isWindows]);

  const popupContent = useMemo(() => {
    return (
      <>
        <div
          className={cx('teacher-page-popup-head', {
            'pt-[32px]': !!/iPhone|iPad|iPod/i.test(navigator.userAgent),
          })}>
          {!!title ? <p className='text-[19px] font-bold'>{title}</p> : <div />}
          <div className='flex items-center'>
            {!!onCopyLink && isCopyLink && (
              <div className='cursor-pointer' onClick={onCopyLink}>
                <CourseLinkIcon color='#424953' />
              </div>
            )}
            <div className='ml-5 cursor-pointer transform scale-[1.2]' onClick={closePopup}>
              <CloseIcon color='#424953' />
            </div>
          </div>
        </div>
        <div className='teacher-page-popup-content'>{children}</div>
      </>
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
        style={isSearch ? {} : { top: `${topOffset}px` }}
        className={cx('teacher-page-popup-screen', {
          [extraClass]: !!extraClass,
          'teacher-page-popup-screen-mobile': isFullModalStyle && width <= 768,
        })}>
        <div ref={popup} className={cx('teacher-page-popup', { 'mb-[30vh]': name === 'links' })}>
          {popupContent}
          {buttonsBlock}
        </div>
      </div>
    );
  }

  return (
    <div id={`popup-seo-${name}`} ref={popup} className='teacher-page-popup'>
      {popupContent}
    </div>
  );
};

export default TeacherPopup;
