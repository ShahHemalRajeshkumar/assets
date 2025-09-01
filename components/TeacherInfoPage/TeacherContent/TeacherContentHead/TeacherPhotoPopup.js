import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import useWindowSize from '../../../../hooks/useWindowSize';
import { getScrollbarWidth } from '../../../../utils';
import CloseIcon from '../../../icons/close.svg';

const TeacherPhotoPopup = ({ teacher = {}, onClose }) => {
  const { width } = useWindowSize();

  const imageSize = useMemo(
    () => ({
      width: width < 768 ? 300 : 600,
      height: width < 768 ? 300 : 600,
    }),
    [width]
  );

  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.style.overflowY = 'hidden';
    document.body.classList.add('show-popup');
    document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);
    if (isWindows) document.body.classList.add('show-popup-window');

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    };
  }, [isWindows]);

  return (
    <div className='teacher-photo-popup'>
      <Image
        layout='fixed'
        alt={teacher?.name}
        width={imageSize.width}
        height={imageSize.height}
        src={teacher?.avatar_path}
      />
      <div onClick={onClose} className='teacher-photo-popup-btn'>
        <CloseIcon color='#ffffff' />
      </div>
    </div>
  );
};

export default TeacherPhotoPopup;
