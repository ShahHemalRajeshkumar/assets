import cx from 'classnames';
import React, { useMemo, useEffect, useCallback } from 'react';
import { getScrollbarWidth } from '../utils';
import CloseIcon from './icons/close.svg';

const ModalComponent = ({
  className,
  handleClose,
  show,
  children,
  isMapModal,
  isMainSearch,
  title,
  modalData,
  contentClass = '',
}) => {
  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);

  const closeForm = useCallback(
    (flag = false) => {
      handleClose(flag);
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    },
    [isWindows, handleClose]
  );

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden';
      document.body.classList.add('show-popup');
      document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);
      if (isWindows) document.body.classList.add('show-popup-window');
    }

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    };
  }, [show, isWindows]);

  return !modalData ? (
    <div
      className={cx(`fixed inset-0 items-center justify-center z-50`, className, {
        flex: show === true,
        hidden: show === false,
      })}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className='w-full h-full bg-white md:w-auto md:h-auto md:rounded-lg'>
        {!isMapModal && !isMainSearch && title && (
          <div className='flex px-4 py-4 bg-white shadow-lg md:py-6 md:rounded-lg'>
            <div onClick={() => closeForm(false)} className='flex items-center pr-4 cursor-pointer md:hidden'>
              <i className='material-icons-outlined' onClick={() => closeForm(false)}>
                arrow_back
              </i>
            </div>
            <p className='text-normal md:text-24px'>{title}</p>
          </div>
        )}
        {isMainSearch && (
          <div className='h-[60px] px-[20px] flex items-center justify-between border-b border-[#E4E7EC]'>
            <div className='text-[17px] font-bold'>{title}</div>
            <div className='ml-5 cursor-pointer transform scale-[1.2]' onClick={() => closeForm(false)}>
              <CloseIcon color='#424953' />
            </div>
          </div>
        )}
        <div className={`h-full px-4 mt-6 overflow-scroll md:mt-12 md:h-auto ${contentClass}`}>{children}</div>
      </div>
    </div>
  ) : (
    <>{show && children}</>
  );
};

export default ModalComponent;
