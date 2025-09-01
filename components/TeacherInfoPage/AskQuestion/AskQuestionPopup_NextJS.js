import cx from 'classnames';
import axios from 'axios';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { translateENtoDE } from '../../../functions/translator';
import AskQuestionClosePopup from './AskQuestionClosePopup';
import useWindowSize from '../../../hooks/useWindowSize';
import AskQuestionSuccess from './AskQuestionSuccess';
import AskQuestionForm from './AskQuestionForm';
import CloseIcon from '../../icons/close.svg';

const AskQuestionPopup = ({ teacher, language, onClose, course, showPopup, seoActions = {}, isConfigurator }) => {
  const popup = useRef();
  const { width } = useWindowSize();

  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);

  const onSubmit = useCallback(
    (values) => {
      setErrorMsg('');
      setIsLoading(true);

      axios
        .post(process.env.MATCHSPACE_CONTACT, {
          enquiry: {
            teacher_uuid: teacher?.uuid,
            first_name: values?.firstName,
            last_name: values?.lastName,
            question: message,
            email: values?.email,
            phone: values?.phoneNumber,
            postcode: values?.postcode,
          },
        })
        .then(() => setIsSuccess(true))
        .catch((error) => setErrorMsg(error?.message))
        .finally(() => setIsLoading(false));
    },
    [teacher, message]
  );

  const onHideClosePopup = () => {
    setVisiblePopup(false);
  };

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
    if (isSuccess || !message) {
      closeHandle();
    } else {
      setVisiblePopup(true);
    }
  }, [isSuccess, message, closeHandle]);

  useEffect(() => {
    if (seoActions?.contactStart && !updated) {
      setUpdated(true);
      seoActions?.contactStart();
    }
  }, [updated, seoActions]);

  useEffect(() => {
    setTopOffset(width < 768 ? -56 : window.pageYOffset - 160 || 0);

    if (width < 768) window.scrollTo({ top: 0 });

    document.body.style.overflowY = 'hidden';
    document.body.classList.add('show-popup');

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.classList.remove('show-popup');
    };
  }, [width, seoActions]);

  const content = useMemo(() => {
    if (isSuccess) {
      return <AskQuestionSuccess seoActions={seoActions} language={language} />;
    }

    return (
      <AskQuestionForm
        errorMsg={errorMsg}
        language={language}
        onSubmit={onSubmit}
        isLoading={isLoading}
        seoActions={seoActions}
        setMessage={setMessage}
      />
    );
  }, [isSuccess, isLoading, language, errorMsg, seoActions, onSubmit]);

  return (
    <div
      style={{ top: `${topOffset}px` }}
      className={cx('teacher-page-popup-screen', {
        // 'teacher-page-popup-screen-mobile': width <= 768,
      })}>
      <div
        ref={popup}
        id='contact-teacher-modal'
        className={cx('teacher-page-popup teacher-page-ask-popup', {
          'mb-[30vh]': width <= 768,
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
          {content}
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPopup;
