import cx from 'classnames';
import { useRouter } from 'next/router';
import { Widget } from '@typeform/embed-react';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { translateENtoDE } from '../../../functions/translator';
import AskQuestionClosePopup from './AskQuestionClosePopup';
import useWindowSize from '../../../hooks/useWindowSize';
import AskQuestionSuccess from './AskQuestionSuccess';
import { getScrollbarWidth } from '../../../utils';
import CloseIcon from '../../icons/close.svg';

const AskQuestionPopup = ({
  course,
  teacher,
  onClose,
  language,
  showPopup,
  isSuccessPopup,
  isConfigurator,
  seoActions = {},
}) => {
  const popup = useRef();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [updated, setUpdated] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showGuarantee, setShowGuarantee] = useState(false);

  const onHideClosePopup = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const closeHandle = useCallback(() => {
    onClose();
    if (width) document.body.style.overflowY = 'auto';

    if (course) {
      showPopup(`course${isConfigurator ? '-price' : ''}`, {
        course,
        extraClass: 'teacher-page-popup-course-mobile',
        title: translateENtoDE('Course details', language),
      });
    }
  }, [onClose, course, showPopup, language, width, isConfigurator]);

  const isSuccess = useMemo(() => {
    return (router.query?.tf === 'success' && localStorage.getItem('typeform_submitted')) || isSuccessPopup;
  }, [router.query, isSuccessPopup]);

  const onClosePopup = useCallback(() => {
    if (isSuccess && showGuarantee) {
      setShowGuarantee(false);
    } else {
      if (isSuccess) {
        closeHandle();
      } else {
        setVisiblePopup(true);
      }
    }
  }, [isSuccess, showGuarantee, closeHandle]);

  useEffect(() => {
    if (seoActions?.contactStart && !updated) {
      setUpdated(true);
      seoActions?.contactStart();
    }
  }, [updated, seoActions]);

  const isWindows = useMemo(() => {
    return typeof window !== 'undefined' ? navigator?.platform?.includes('Win') : false;
  }, []);

  useEffect(() => {
    setTopOffset(width < 768 ? -56 : window?.pageYOffset - 160 || 0);

    if (width < 768) window.scrollTo({ top: 0 });

    document.body.style.overflowY = 'hidden';
    document.body.classList.add('show-popup');
    document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);

    if (isWindows) document.body.classList.add('show-popup-window');
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    };
  }, [width, seoActions, isWindows]);

  const formID = useMemo(() => {
    return language === 'ch-en' ? process.env.MATCHSPACE_FORM_ID_EN : process.env.MATCHSPACE_FORM_ID_DE;
  }, [language]);

  const cookies = useMemo(() => {
    const data = {};

    document?.cookie?.split(';')?.map((item) => {
      const split = String(item || '')
        .trim()
        .split('=');
      data[split[0]] = split[1];
      return item;
    });

    return data;
  }, []);

  useEffect(() => {
    if (isSuccess) {
      return () => {
        localStorage.removeItem('typeform_submitted');
        window.history.pushState(null, '', window.location.pathname);
      };
    }
  }, [isSuccess]);

  const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
  const typeformStyles = useMemo(() => {
    if (width <= 800) return {};

    if (isAndroid) return { minHeight: '60vh' };

    return { minHeight: height < 1200 ? '600px' : '60vh' };
  }, [width, height, isAndroid]);

  const teamCS = useMemo(() => {
    const team = router.query?.team;
    if (team && team === 'cs') return 'cs';

    return '-';
  }, [router.query]);

  return (
    <div style={{ top: `${topOffset}px` }} className={cx('teacher-page-popup-screen')}>
      <div
        ref={popup}
        id='contact-teacher-modal'
        className={cx('teacher-page-popup teacher-page-ask-popup', {
          // 'mb-[30vh]': width <= 768,
          'teacher-page-ask-popup-trans': visiblePopup,
        })}>
        {visiblePopup && (
          <AskQuestionClosePopup language={language} onClose={closeHandle} onContinue={onHideClosePopup} />
        )}
        <div
          className={cx('teacher-page-popup-head', {
            'teacher-page-popup-head_no-border': isSuccess,
            'teacher-page-ask-popup-hidden': visiblePopup,
          })}>
          <p className='text-20px font-bold'>{!isSuccess && translateENtoDE('Send message to teacher', language)}</p>
          <div className='ml-5 cursor-pointer' onClick={onClosePopup}>
            <CloseIcon color='#424953' />
          </div>
        </div>
        <div
          className={cx('teacher-page-ask-popup-content', {
            'teacher-page-ask-popup-hidden': visiblePopup,
          })}>
          <div className={cx('pb-[20px]', { 'min-h-[500px]': !showGuarantee })}>
            {isSuccess && (
              <AskQuestionSuccess
                language={language}
                seoActions={seoActions}
                showGuarantee={showGuarantee}
                setShowGuarantee={setShowGuarantee}
              />
            )}
            {!isSuccess && (
              <Widget
                id={formID}
                inlineOnMobile
                style={typeformStyles}
                onClose={onClosePopup}
                className='teacher-typeform'
                hidden={{
                  cs: teamCS,
                  teacher_uuid: teacher?.uuid,
                  gcl: cookies['_gcl_aw'] || '-',
                  ms_ga: cookies['ms_ga'] || '-',
                  teacher_username: teacher?.username,
                  ms_user_id: cookies['ms_user_id'] || '-',
                }}
                transitiveSearchParams={['teacher_uuid']}
                onReady={() => localStorage.removeItem('typeform_submitted')}
                onSubmit={() => localStorage.setItem('typeform_submitted', true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPopup;
