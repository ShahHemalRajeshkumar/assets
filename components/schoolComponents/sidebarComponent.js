import React from 'react';
import ArrowLeft from '../../components/icons/ArrowLeft';
import Share from '../icons/Share';

const SidebarComponent = React.memo(({ isOpen, onClose, children, maxWidth = '960px', zIndex , overlayZindex }) => {

  return (
    <div className=''>
      {/* Overlay */}
      <div className={` z-[${overlayZindex}] ${isOpen?"opacity-100 fixed inset-0 bg-[#000000A8] transition-opacity duration-300":"opacity-0"}`} onClick={onClose}></div>

      {/* Sidebar Container */}
      <div className={` fixed inset-y-0 right-0 w-full max-w-[${maxWidth}] bg-white overflow-y-auto z-[${zIndex}] transition-all duration-300 ease-linear ${isOpen?"translate-x-0":"translate-x-[100%]"}`}>
        {/* Header */}
     

        {children}
      </div>
    </div>
  );
});

export default SidebarComponent;
