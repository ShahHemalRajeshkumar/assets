import React from 'react';
import cx from 'classnames';

const ModalComponent = ({ handleClose, children, title, noScroll }) => (
  <div className='top-auto w-screen h-screen md:top-0 md:h-auto md:w-auto modal-wrapper'>
    {title && (
      <div className='flex px-4 py-4 shadow-lg md:py-6'>
        <div className='flex items-center pr-4 cursor-pointer md:hidden' onClick={handleClose}>
          <i className='material-icons-outlined'>arrow_back</i>
        </div>
        <p className='text-normal md:text-24px'>{title}</p>
      </div>
    )}
    <div
      className={cx('h-full px-4 mt-6  md:mt-12 md:h-auto modal-content', {
        'overflow-scroll': !noScroll,
      })}>
      {children}
    </div>
  </div>
);

export default ModalComponent;
