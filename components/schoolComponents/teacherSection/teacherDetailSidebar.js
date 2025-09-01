import { useEffect, useMemo, useRef, useState } from 'react';
import { translateENtoDE } from 'functions/translator';
import ArrowLeft from '@/components/icons/ArrowLeft';
import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import ShareIcon from '@/components/icons/ShareIcon';
import CloseIcon from '@/components/icons/closeIcon';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import Spinner from '@/components/Spinner';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import { FieldBlock } from '../commonComponent/fieldsBlock';
import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
import { TeachingLocation } from '../commonComponent/TeachingLocation';
import { StepFormObject } from '@/utils/schoolpage/StepFormDetails';

const TeacherDetailSidebar = React.memo(
  ({
    data,
    onClose,
    language,
    showPopup,
    isSidebarOpen,
    isTeacherDeatailLoading,
    instrumentsData,
    allOrganizationData,
  }) => {
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [isGenreExpend, setIsGenreExpend] = useState(false);
    const [isReached, setIsReached] = useState(false);

    const { width } = useWindowSize();
    const { setCurrentSelectedTeacher, setIsMoreCourseSidebarOpen } = useSchoolPage();
    const itemReachPoint = useRef();
    const sidebarRef = useRef();
    useEffect(() => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const handleScroll = () => {
        if (!itemReachPoint.current) return;

        const rect = itemReachPoint.current.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        setIsReached(rect.top < sidebarRect.bottom);
      };

      sidebar.addEventListener('scroll', handleScroll);
      handleScroll(); 

      return () => {
        sidebar.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
      if (data) setTeacherDetails(data);
    }, [data]);

    const expandedGenres = useMemo(() => {
      if (!teacherDetails?.genres) return [];
      return isGenreExpend ? teacherDetails.genres : teacherDetails.genres.slice(0, 5);
    }, [isGenreExpend, teacherDetails]);

    const filterLocation = useMemo(() => {
      return (
        allOrganizationData
          ?.filter((loc) => data?.region_ids?.includes(loc?.id))
          .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? []
      );
    }, [allOrganizationData, data]);

    if (isTeacherDeatailLoading) {
      return (
        <div className="bg-white relative h-full flex items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (!teacherDetails) {
      return (
        <div className="bg-white relative h-full flex items-center justify-center text-gray-500">
          {translateENtoDE(`No teacher details found`, language)}
        </div>
      );
    }

    return (
      <div className="bg-white relative h-full overflow-y-scroll pb-14 sm:pb-0" ref={sidebarRef}>
        <div className="flex justify-between items-center mb-[24px] p-[20px] border-b border-[#E4E7EC] sticky top-0 bg-white z-30">
          <div className="flex gap-3 items-center">
            {isSidebarOpen && (
              <div onClick={onClose} className="cursor-pointer">
                <ArrowLeft />
              </div>
            )}
            <h3 className="font-semibold text-[19px] leading-[100%] font-Roboto">
              {translateENtoDE('Teacher details', language)}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                showPopup(
                  'links',
                  { title: translateENtoDE('Share this page', language) },
                  setCurrentSelectedTeacher(teacherDetails)
                )
              }
            >
              <ShareIcon className="w-[24px] h-[24px] cursor-pointer" />
            </button>
            <button onClick={onClose} className="text-gray-600 hover:text-red-500">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-8 md:gap-[40px] px-[16px] sm:px-[24px] pb-[24px]">
          <div className="w-full max-w-full sm:max-w-[288px] flex flex-col items-center">
            <div className="w-full !max-w-[200px] !h-[200px] object-cover rounded-full overflow-hidden relative">
              <img
                src={teacherDetails?.image_url || '/assets/images/teacherdefault.avif'}
                alt="teacher image"
                className="absolute inset-0 object-cover rounded-full"
              />
            </div>
            <p className="text-[22px] sm:text-[24px] font-Roboto leading-[116%] text-[#000000DE] font-bold mt-[16px]">
              {teacherDetails?.name}
            </p>
            {LessonsStepSection(
              StepFormObject,
              language,
              <div
                onClick={() => setIsMoreCourseSidebarOpen(true)}
                className="text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full hover:bg-[#004252] transition duration-300 ease-linear border border-transparent"
              >
                {translateENtoDE(`VIEW COURSES`, language)}
              </div>
            )}
          </div>
          <div className="w-full sm:max-w-[584px] sm:min-w-[300px]">
            {teacherDetails?.about_me && (
              <div>
                <h4 className="font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-4">
                  {translateENtoDE('About me', language)}
                </h4>
                <ShowMoreTextNext
                  maxLength={200}
                  language={language}
                  showButtonLabel={translateENtoDE('Show more', language)}
                >
                  {teacherDetails?.about_me?.mzo ||
                    teacherDetails?.about_me[language === 'ch-en' ? 'en' : 'de']}
                </ShowMoreTextNext>
              </div>
            )}
            <div ref={itemReachPoint} className="mt-[20px]">
              <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold whitespace-nowrap">
                {translateENtoDE(`Main musical genres`, language) + ':'}
              </h5>
              <div className="flex flex-wrap gap-[4px] mt-[8px]">
                {expandedGenres.map((genre, idx) =>
                  FieldBlock(language === 'ch-en' ? genre.en : genre.de, idx)
                )}
                {!isGenreExpend && teacherDetails?.genres?.length > 5 && (
                  <button
                    onClick={() => setIsGenreExpend(true)}
                    className="py-[8px] px-[10px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto text-[#21697C]"
                  >
                    {`${teacherDetails?.genres.length - 5}+`}
                  </button>
                )}
              </div>
              {width < 600 && isReached && (
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4">
                  <button
                    onClick={() => setIsMoreCourseSidebarOpen(true)}
                    className="bg-[#F9843B] text-white text-[15px] font-medium uppercase py-[13px] w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition"
                  >
                    {translateENtoDE('VIEW COURSES', language)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default TeacherDetailSidebar;