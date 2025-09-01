import cx from 'classnames';
import Bugsnag from '@bugsnag/js';
import { useRouter } from 'next/router';
import { useSnackbar } from 'react-simple-snackbar';
import { useState, useMemo, useCallback, useEffect } from 'react';
import TeacherAssociationListPopup from './TeacherContent/TeacherAssociations/TeacherListPopup';
import TeacherGalleryPopup from './TeacherContent/TeacherContentGallery/TeacherGalleryPopup';
import TeacherPopupCourse from './TeacherContent/TeacherContentCourses/TeacherPopupCourse';
import TeacherPopupLikes from './TeacherContent/TeacherContentLikes/TeacherPopupLikes';
import TeacherPhotoPopup from './TeacherContent/TeacherContentHead/TeacherPhotoPopup';
import TeacherListPopup from './TeacherContent/TeacherExperience/TeacherListPopup';
import TeacherGuaranteePopup from './TeacherConfigurator/TeacherGuaranteePopup';
import TeacherConfigurator from './TeacherConfigurator/TeacherConfigurator';
import TeacherPopupShareLinks from './TeacherHeader/TeacherPopupShareLinks';
import AskQuestionCallback from './AskQuestion/AskQuestionCallback';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import AskQuestionPopup from './AskQuestion/AskQuestionPopup';
import { translateENtoDE } from '../../functions/translator';
import TeacherContent from './TeacherContent/TeacherContent';
import TeacherCallbackPopups from './TeacherCallbackPopups';
import snackbarOptions from './snackbarOptions';
import { getScrollbarWidth } from '../../utils';
import { useFixedTabs } from './useFixedTabs';
import TeacherPopup from './TeacherPopup';
import TeacherContactSection from './NewTeacherSections/TeacherContactSection';
import NewTeacherInfoSupport from './NewTeacherSections/NewTeacherInfoSupport';
import GuaranteePopup from './NewTeacherSections/GuaranteePopup';

const PABBLY_URL = process.env.PABBLY_CALLBACK_URL;

const TeacherInfoPage = ({ language, teacher, seoActions = {} }) => {
  const fixedTabs = useFixedTabs();
  const { query, asPath } = useRouter();
  const [show, setShow] = useState(false);
  const [, onCopyText] = useCopyToClipboard();
  const [pageYOffset, setPageYOffset] = useState(0);
  const [openSnackbar] = useSnackbar(snackbarOptions);
  const [popupInfo, setPopupInfo] = useState({ name: null });

  const showPopup = useCallback((name, params = {}) => {
    if (typeof window !== 'undefined') {
      setPageYOffset(window?.pageYOffset || 0);
    }
    setShow(true);
    setPopupInfo({ name, ...params });
  }, []);

  const hidePopup = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, pageYOffset || 0);
    }
    setShow(false);
    setPopupInfo({ name: null });
  }, [pageYOffset]);

  const pabblyHandle = useCallback(async (callbackid) => {
    try {
      await fetch(PABBLY_URL, {
        method: 'POST',
        body: JSON.stringify({ callbackid }),
        headers: { 'Content-Type': 'text/plain' },
      });
    } catch (error) {
      Bugsnag.notify(error);
      console.log('LOG: pabbly error', error);
    } finally {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);
  useEffect(() => {
    if (query?.course) {
      const courseIndex = teacher?.courses?.findIndex((c) => c?.id === +query.course) ?? 0;
      const courseData = teacher?.courses?.[courseIndex];
      if (courseData) {
        showPopup('course-price', {
          course: courseData,
          courseIndex,
          extraClass: 'teacher-page-popup-course-mobile',
          title: translateENtoDE('Course details', language),
        });
      }
    }
    if (query?.gallery) {
      showPopup('gallery', { slideIndex: query.gallery });
    }
    if (query?.tf === 'success' && localStorage.getItem('typeform_submitted')) {
      showPopup('contact', { isSuccessPopup: true });
    }
    if ((!query?.tf || query?.tf !== 'success') && localStorage.getItem('typeform_submitted')) {
      localStorage.removeItem('typeform_submitted');
    }
    if (query?.callback) {
      pabblyHandle(query.callback);
      showPopup('callback');
    }
  }, [query, showPopup, pabblyHandle, language, teacher]);

  const onCopyLink = useCallback(
    ({ name, course, linkType }) => {
      const baseUrl = `${window.location.origin}${asPath.split('?')[0]}`;
      let link = '';

      if (name === 'course' || name === 'course-price') {
        link = `${baseUrl}?course=${course?.id}${name === 'course-price' ? '&price=true' : ''}`;
      } else if (name === 'links') {
        const socialLinks = {
          url: baseUrl,
          twitter: 'https://twitter.com/',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
        };
        link = socialLinks[linkType];
      }

      if (link) {
        onCopyText(link);
        openSnackbar(translateENtoDE('Link copied!', language));
      }
    },
    [asPath, onCopyText, openSnackbar, language]
  );

  const contactHandle = useCallback(() => showPopup('contact'), [showPopup]);
  const pricesHandle = useCallback(() => {
    showPopup('prices', {
      extraClass: 'teacher-page-popup-prices',
      title: translateENtoDE('Configure your session', language),
    });
  }, [language, showPopup]);

  const handleOpenGuaranteeModal = useCallback(() => {
    showPopup('guaranteeNewPopup', {
      title: translateENtoDE('Our flexible payment options', language),
    });
  }, [language, showPopup]);
  const popupComponents = {
    education: <TeacherListPopup name="education" language={language} data={teacher?.education} />,
    experience: <TeacherListPopup name="experience" language={language} data={teacher?.experience} />,
    associations: <TeacherAssociationListPopup name="associations" language={language} data={teacher?.association_list} />,
    likes: <TeacherPopupLikes language={language} likes={teacher?.recommendations} />,
    links: (
      <TeacherPopupShareLinks
        teacher={teacher}
        language={language}
        seoActions={seoActions}
        onCopyLink={(linkType) => onCopyLink({ name: 'links', linkType })}
      />
    ),
    'course-price': (params) => (
      <TeacherPopupCourse {...params} teacher={teacher} language={language} hidePopup={hidePopup} showPopup={showPopup} seoActions={seoActions} isConfigurator />
    ),
    course: (params) => (
      <TeacherPopupCourse {...params} teacher={teacher} language={language} hidePopup={hidePopup} showPopup={showPopup} seoActions={seoActions} />
    ),
    prices: (params) => (
      <div className="configurator-fixed-mobile">
        <TeacherConfigurator
          isModal
          teacher={teacher}
          language={language}
          showPopup={showPopup}
          hidePopup={hidePopup}
          fixedTabs={fixedTabs}
          seoActions={seoActions}
          courses={teacher?.courses}
          {...params}
        />
      </div>
    ),
    guarantee: <TeacherGuaranteePopup language={language} />,
    guaranteeNewPopup: <GuaranteePopup language={language} />,
    callback: <AskQuestionCallback language={language} />,
    photo: <TeacherPhotoPopup teacher={teacher} onClose={hidePopup} />,
    contact: (params) => (
      <AskQuestionPopup teacher={teacher} language={language} onClose={hidePopup} showPopup={showPopup} seoActions={seoActions} {...params} />
    ),
    gallery: (params) => (
      <TeacherGalleryPopup onClose={hidePopup} teacherInfo={teacher} seoActions={seoActions} gallery={teacher?.gallery} {...params} />
    ),
  };

  const modalComponent = useMemo(() => {
    if (!show || !popupInfo.name) return null;
    const { name, ...params } = popupInfo;
    const content = typeof popupComponents[name] === 'function' ? popupComponents[name](params) : popupComponents[name];
    if (!content) return null;

    if (['photo', 'contact', 'gallery'].includes(name)) return content;

    const isFullModalStyle = [
      'likes',
      'prices',
      'course',
      'education',
      'guarantee',
      'experience',
      'associations',
      'course-price',
      'guaranteeNewPopup',
    ].includes(name);

    return (
      <TeacherPopup
        name={name}
        title={params.title}
        onClose={hidePopup}
        isFullViewModal
        extraClass={params.extraClass}
        isCopyLink={!!params.course || name === 'gallery'}
        extraOnClose={params.extraOnClose}
        mobileOnClose={params.mobileOnClose}
        isMobileOnClose={params.isMobileOnClose}
        isFullModalStyle={isFullModalStyle}
        onCopyLink={() => {
          onCopyLink({ name, course: params.course });
          if (seoActions?.share && (name === 'course' || name === 'course-price')) {
            seoActions.share('link', 'page_course');
          }
        }}>
        {content}
      </TeacherPopup>
    );
  }, [popupInfo, show, popupComponents, hidePopup, onCopyLink, seoActions, teacher]);

  const isWindows = useMemo(() => typeof window !== 'undefined' && navigator?.platform?.includes('Win'), []);

  useEffect(() => {
    document?.style?.setProperty('--scrollbar-width', `${getScrollbarWidth() || 17}px`);
  }, []);

  return (
    <div className={cx('teacher-info-page', { 'window-scrollbar': isWindows })}>
      <TeacherCallbackPopups language={language} />
      <div className="teacher-info-content-wrapper">
        <div className="teacher-info-content">
          <TeacherContent
            teacher={teacher}
            language={language}
            fixedTabs={fixedTabs}
            showPopup={showPopup}
            hidePopup={hidePopup}
            seoActions={seoActions}
            handleOpenGuaranteeModal={handleOpenGuaranteeModal}
          />
          <div className="min-[1101px]:block hidden h-full">
            <TeacherContactSection
              teacher={teacher}
              contactHandle={contactHandle}
              language={language}
              pricesHandle={pricesHandle}
              handleOpenGuaranteeModal={handleOpenGuaranteeModal}
            />
          </div>
        </div>
        <NewTeacherInfoSupport language={language} />
      </div>
      {modalComponent}
    </div>
  );
};
export default TeacherInfoPage;