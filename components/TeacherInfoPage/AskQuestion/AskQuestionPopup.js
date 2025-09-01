import cx from 'classnames';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import AskQuestionClosePopup from './Textarea/AskQuestionClosePopup';
import AskQuestionFormLater from './Textarea/AskQuestionFormLater';
import { translateENtoDE } from '../../../functions/translator';
import AskQuestionSuccessLater from './AskQuestionSuccessLater';
import useWindowSize from '../../../hooks/useWindowSize';
import AskQuestionForm from './Textarea/AskQuestionForm';
import AskQuestionSuccess from './AskQuestionSuccess';
import CloseIcon from '../../icons/close.svg';

const AskQuestionPopup = ({ teacher, language, onClose, course, showPopup, seoActions = {}, isConfigurator }) => {
  const popup = useRef();
  const { query } = useRouter();
  const { width } = useWindowSize();
  const startExecuted = useRef(false);
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visibleLater, setVisibleLater] = useState(false);
  const [showGuarantee, setShowGuarantee] = useState(false);
  const [isSuccessLater, setIsSuccessLater] = useState(false);

  const onSubmit = useCallback(
    (messageText) => {
      const { coords, location, instrument } = query;
      const [lat, lng] = `${coords || ''}`.split(',');

      const requestQuery = `?message=${encodeURIComponent(messageText)}${
        location ? `&location_name=${encodeURIComponent(location)}` : ''
      }${instrument ? `&instrument=${encodeURIComponent(instrument)}` : ''}${
        lat ? `&location_lat=${encodeURIComponent(lat)}` : ''
      }${lng ? `&location_lng=${encodeURIComponent(lng)}` : ''}`;

      const url = `${process.env.MATCHSPACE_FORM_CONTACT}/${teacher?.uuid}${requestQuery}&language=${
        language === 'ch-en' ? 'en' : 'de'
      }`;

      window.open(url, '_self');
    },
    [teacher, query, language]
  );

  const onHideClosePopup = () => {
    setVisiblePopup(false);
  };

  const scrollToBlock = useCallback(
    (scrollHeight) => {
      if (popup?.current) {
        popup.current.scrollTop = scrollHeight;
      }
    },
    [popup]
  );

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

  const onClosePopup = useCallback(() => {
    setErrorMsg('');

    if (isSuccessLater) {
      closeHandle();
    } else {
      if (isSuccess && showGuarantee) {
        setShowGuarantee(false);
      } else {
        if (isSuccess || !message) {
          if (!message) seoActions?.messageAbort();
          closeHandle();
        } else {
          setVisiblePopup(true);
        }
      }
    }
  }, [isSuccess, showGuarantee, message, seoActions, isSuccessLater, closeHandle]);

  useEffect(() => {
    if (startExecuted.current) return;

    if (message) {
      startExecuted.current = true;
      seoActions?.messageStart();
    }
  }, [message, seoActions]);

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
    setTopOffset(width < 768 ? -160 : window?.pageYOffset - 160 || 0);

    if (width < 768) window.scrollTo({ top: 0 });

    document.body.style.overflowY = 'hidden';
    document.body.classList.add('show-popup');
    document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
      if (isWindows) document.body.classList.remove('show-popup-window');
    };
  }, [width, isWindows, seoActions]);

  const content = useMemo(() => {
    if (isSuccess) {
      return (
        <AskQuestionSuccess
          language={language}
          seoActions={seoActions}
          showGuarantee={showGuarantee}
          setShowGuarantee={setShowGuarantee}
        />
      );
    }

    if (isSuccessLater) {
      return <AskQuestionSuccessLater language={language} seoActions={seoActions} />;
    }

    return (
      <AskQuestionForm
        teacher={teacher}
        errorMsg={errorMsg}
        language={language}
        onSubmit={onSubmit}
        isLoading={isLoading}
        seoActions={seoActions}
        setMessage={setMessage}
        onClosePopup={onClosePopup}
        scrollToBlock={scrollToBlock}
      />
    );
  }, [
    teacher,
    language,
    onSubmit,
    errorMsg,
    isSuccess,
    isLoading,
    seoActions,
    onClosePopup,
    scrollToBlock,
    showGuarantee,
    isSuccessLater,
  ]);

  return (
    <>
      {createPortal(
        <div className='teacher-page-popup-screen teacher-page-popup-screen-new'>
          <div
            ref={popup}
            id='contact-teacher-modal'
            className={cx('teacher-page-popup teacher-page-ask-popup scrollbar-invisible', {
              'teacher-page-ask-popup-trans': visiblePopup || visibleLater,
            })}>
            {visiblePopup && (
              <AskQuestionClosePopup
                language={language}
                onClose={closeHandle}
                onContinue={onHideClosePopup}
                onLater={() => {
                  setVisibleLater(true);
                  setVisiblePopup(false);
                }}
              />
            )}
            {visibleLater && (
              <AskQuestionFormLater
                message={message}
                teacher={teacher}
                errorMsg={errorMsg}
                language={language}
                isLoading={isLoading}
                onClose={closeHandle}
                seoActions={seoActions}
                setErrorMsg={setErrorMsg}
                setVisibleLater={setVisibleLater}
                setIsSuccessLater={setIsSuccessLater}
                onBack={() => {
                  setIsSuccessLater(false);
                  setVisibleLater(false);
                  setVisiblePopup(true);
                }}
              />
            )}
            <div
              className={cx('teacher-page-popup-head', {
                'teacher-page-popup-head_no-border': isSuccess || isSuccessLater,
                'teacher-page-ask-popup-hidden': visiblePopup || visibleLater,
              })}>
              <p className='text-20px font-bold'>
                {!isSuccess && !isSuccessLater && translateENtoDE('Contact teacher', language)}
              </p>
              <div className='ml-5 cursor-pointer' onClick={onClosePopup}>
                <CloseIcon color='#424953' />
              </div>
            </div>
            <div
              className={cx('teacher-page-ask-popup-content', {
                'teacher-page-ask-popup-hidden': visiblePopup || visibleLater,
              })}>
              {content}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AskQuestionPopup;
