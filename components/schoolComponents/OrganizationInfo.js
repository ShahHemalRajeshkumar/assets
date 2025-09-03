import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useMemo, useCallback, useEffect, memo } from 'react';
import Image from 'next/image';
import ShareIcon from '../icons/ShareIcon';
import { useSnackbar } from 'react-simple-snackbar';
import snackbarOptions from '../TeacherInfoPage/snackbarOptions';
import { translateENtoDE } from '../../functions/translator';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import useWindowSize from 'hooks/useWindowSize';
import { getScrollbarWidth } from '../../utils';
import SchoolOrganizationCard from './SchoolOrganizationCard';
import OrganizationContent from './OrganizationContent';

const TeacherGalleryPopup = dynamic(() => import('../TeacherInfoPage/TeacherContent/TeacherContentGallery/TeacherGalleryPopup'), { ssr: false });
const TeacherCallbackPopups = dynamic(() => import('../TeacherInfoPage/TeacherCallbackPopups'), { ssr: false });
const OrganizationContentPopup = dynamic(() => import('./organizationPopup'), { ssr: false });
const ContactForm = dynamic(() => import('./contectUs/ContectUs'), { ssr: false });
const CallUsComponent = dynamic(() => import('./callUsComponent/CallUsComponent'), { ssr: false });
const SuccessFormComponent = dynamic(() => import('./SuccessFormComponent'), { ssr: false });
const TeacherPopupShareLinks = dynamic(() => import('../TeacherInfoPage/TeacherHeader/TeacherPopupShareLinks'), { ssr: false });

const OrganizationInfo = memo(({ language, organizationData, seoActions = {}, instrumentsData, teachers, coursesData }) => {
  const { query, asPath } = useRouter();
  const [popupInfo, setPopupInfo] = useState({ name: null });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTeacherCardReached, setIsTeacherCardReached] = useState(false);
  const { show, setShow, currentSelectedTeacher, setCurrentSelectedTeacher } = useSchoolPage();
  const { width } = useWindowSize();
  const [openSnackbar] = useSnackbar({ snackbarOptions });

  const full_name = useMemo(() => 
    organizationData?.full_name?.[language === 'ch-en' ? 'en' : 'de'],
    [organizationData?.full_name, language]
  );

  const handleCloseModal = useCallback(() => setShow(false), [setShow]);
  
  const modalComponent = useMemo(() => {
    if (!show) return null;
    const { name, slideIndex } = popupInfo;

    switch (name) {
      case 'gallery':
        return (
          <TeacherGalleryPopup
            onClose={handleCloseModal}
            slideIndex={slideIndex}
            gallery={organizationData?.gallery}
            language={language}
          />
        );
      case 'contectUs':
        return <ContactForm organizationData={organizationData} language={language} />;
      case 'callUs':
        return <CallUsComponent organizationData={organizationData} language={language} />;
      case 'success':
        return <SuccessFormComponent language={language} />;
      default:
        return null;
    }
  }, [popupInfo.name, popupInfo.slideIndex, show, organizationData, language, handleCloseModal]);

  return (
    <div>
      <div className="w-full max-w-[1440px] mx-auto h-[280px] relative rounded-xl overflow-hidden">
        <Image
          src="/assets/images/schollbg.webp"
          alt="School Background"
          width={1440}
          height={280}
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          className="object-cover rounded-xl w-full h-[280px]"
        />

  <div onClick={() => setShow(true)} className="absolute top-5 right-5">
    <ShareIcon className="w-[20px] h-[20px]" />
  </div>
</div>
      <TeacherCallbackPopups language={language} />

      <div className="flex md:flex-row flex-col gap-6">
        <SchoolOrganizationCard organizationData={organizationData} language={language} />
        <OrganizationContent
          organizationData={organizationData}
          language={language}
          instrumentsData={instrumentsData}
          teachersData={teachers}
          coursesData={coursesData}
        />
      </div>
      {isTeacherCardReached && width < 952 && (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="fixed bottom-5 left-5 w-[240px] h-[40px] px-4 text-[15px] font-medium uppercase btn-orange"
        >
          {language === 'ch-en' ? 'CONTACT US' : 'SCHREIB UNS'}
        </button>
      )}
      {modalComponent}
    </div>
  );
});

OrganizationInfo.displayName = 'OrganizationInfo';
export default OrganizationInfo;