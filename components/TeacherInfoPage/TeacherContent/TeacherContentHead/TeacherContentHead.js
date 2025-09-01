import cx from 'classnames';
import Image from 'next/image';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import TeacherLabelWithLikes from '../../../TeachersSearch/TeacherLabelWithLikes';
import { getTeacherTitle, getTeacherSubTitle, isValidUrl } from './functions';
import TeacherContentInstruments from './TeacherContentInstruments';
import { translateENtoDE } from '../../../../functions/translator';
import useWindowSize from '../../../../hooks/useWindowSize';
import TeacherContentTabs from './TeacherContentTabs';
// import HeartIcon from '../../../icons/Heart.svg';
import ShareIcon from '../../../icons/Share.svg';
import TeacherContactSection from '../../NewTeacherSections/TeacherContactSection';

const TeacherContentHead = ({
  headRef,
  language,
  topIndex,
  bottomRef,
  showPopup,
  fixedTabs,
  activeHash,
  isFixedTabs,
  teacher = {},
  setCurrentHash,
  handleOpenGuaranteeModal
}) => {
  const contentRef = useRef(null);
  const { width } = useWindowSize();
  const [isBottom, setIsBottom] = useState(false);

  const contactHandle = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    showPopup('contact', {});
  };
  const showTeacherPhoto = () => showPopup('photo', {});
  const shareLinkHandle = () => {
    showPopup('links', { title: translateENtoDE('Share this page', language) });
  };

  const pricesHandle = () => {
    showPopup('prices', {
      extraClass: 'teacher-page-popup-prices',
      title: translateENtoDE('Configure your session', language),
    });
  };

  const responsiveData = useMemo(() => {
    const contentWidth = contentRef?.current?.getBoundingClientRect()?.width?.toFixed(0);

    return {
      photo: `${width < 650 ? 96 : 160}px`,
      imageBgHeight: `${!!contentWidth ? contentWidth / 3 : width < 650 ? 120 : 266}px`,
    };
  }, [width, contentRef]);

  const contactButton = (
    <button
      type='button'
      onClick={contactHandle}
      className={cx('tracking-widest btn-orange uppercase', {
        'mb-4': width > 1100,
      })}>
      {language === 'ch-en' ? 'CONTACT ME' : 'KONTAKTIERE MICH'}
    </button>
  );

  const viewPricesButton = (
    <button
      type='button'
      onClick={pricesHandle}
      className={cx('tracking-widest btn-primary bg-primary uppercase', {
        'mb-4': width <= 768,
      })}>
      {translateENtoDE('View prices', language)}
    </button>
  );

  const coverUrl = isValidUrl(teacher?.cover_image?.image_path)
    ? teacher?.cover_image?.image_path
    : 'https://images.selise.club/default_image_14.png';

  const onScroll = useCallback(() => {
    const footerBottom = bottomRef?.current?.getBoundingClientRect()?.bottom;

    setIsBottom(footerBottom < 50);
  }, [bottomRef]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={contentRef} className='teacher-content-head'>
      <div style={{ height: responsiveData.imageBgHeight }} className='teacher-content-head-overlay'>
        <Image
          unoptimized
          width='100%'
          src={coverUrl}
          className='rounded-t-lg teacher-content-head-img'
          alt={`${teacher?.name} - Cover`}
          height={responsiveData.imageBgHeight}
        />
      </div>
      <div className='relative px-5 pt-11'>
        <div className='teacher-content-head-photo-wrap'>
          {teacher?.avatar_path ? (
            <Image
              alt={teacher?.name}
              onClick={showTeacherPhoto}
              src={teacher?.avatar_path}
              width={responsiveData.photo}
              height={responsiveData.photo}
              className='teacher-content-head-photo cursor-pointer'
            />
          ) : (
            <div
              style={{
                width: responsiveData.photo,
                height: responsiveData.photo,
              }}
              className='teacher-content-head-photo rounded-full bg-slate-400'
            />
          )}
          {width >= 650 && <h1 className='teacher-content-head-title'>{getTeacherTitle(teacher, language)}</h1>}
        </div>
        <div className='flex items-center mb-3'>
          <h2 className='font-bold text-20px sm:text-24px'>{teacher?.name}</h2>
          {/* <HeartIcon className='ml-4 mr-2 cursor-pointer' /> */}
          <div className='ml-4 cursor-pointer' onClick={shareLinkHandle}>
            <ShareIcon />
          </div>
        </div>
        <div className='teacher-content-head-info smd:pb-4 pb-0'>
          <div>
            <TeacherLabelWithLikes
              isOneRow
              language={language}
              teacherType={teacher?.profile_type}
              likes={teacher?.recommendations.length}
            />
            <p className='text-14px tx-secondary mb-4'>
              {getTeacherSubTitle(teacher, language)}
              {width < 650 ? `. ${getTeacherTitle(teacher, language)}` : ''}
            </p>
          </div>
          <div className='flex flex-col'>
            <TeacherContentInstruments language={language} instruments={teacher?.instruments} />
          </div>
        </div>
        <div className='max-[1100px]:block hidden '>
          <TeacherContactSection contactHandle={contactHandle} language={language} pricesHandle={pricesHandle} handleOpenGuaranteeModal={handleOpenGuaranteeModal} teacher={teacher} />
        </div>
        <TeacherContentTabs
          tabRef={headRef}
          teacher={teacher}
          language={language}
          topIndex={topIndex}
          isBottom={isBottom}
          showPopup={showPopup}
          fixedTabs={fixedTabs}
          activeHash={activeHash}
          isFixedTabs={isFixedTabs}
          contactHandle={contactHandle}
          setCurrentHash={setCurrentHash}
          shareLinkHandle={shareLinkHandle}
        />
      </div>
    </div>
  );
};

export default TeacherContentHead;
