import React, { useState, useCallback, useRef, useEffect, useMemo, memo } from 'react';
import TeacherSectionSidebar from './teacherSectionSidebar';
import TeacherDetailSidebar from './teacherDetailSidebar';
import TeacherProfile from './TeacherProfile';
import { useTeacherFilter } from './useTeacherFilter';
import SidebarComponent from '../sidebarComponent';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowLeft from '@/components/icons/ArrowLeft';
import { translateENtoDE } from 'functions/translator';
import axios from 'axios';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

const TeacherSection = memo(function TeacherSection({
  TeachersData,
  language,
  teacherFilterQuery,
  showPopup,
  shareLinkHandle,
  instrumentsData,
  handleInstrumentChange,
  show,
  allOrganizationData
}) {
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [scrolled, setScrolled] = useState(0);
  const [isTeacherDeatailLoading, setIsTeacherDeatailLoading] = useState(false);
  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const {
    isMoreTeacherSidebarOpen,
    setMoreTeacherSidebarOpen,
    isTeacherDetailSidebar,
    setIsTeacherDetailSidebar,
  } = useSchoolPage();
  const showTeacherDetails = useCallback(async (teacher) => {
    setIsTeacherDetailSidebar(true);
    setIsTeacherDeatailLoading(true);
    
    try {
      const { data } = await axios.get('/api/teacherDetail', { 
        params: {
          organization: 'mzo',
          mzo_teacher_id: teacher,
        },
      });
      setTeacherDetails(data?.data);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error fetching teacher details:', error.message);
    } finally {
      setIsTeacherDeatailLoading(false);
    }
  }, [setIsTeacherDetailSidebar]);
  
  const handleClose = useCallback(() => {
    setIsTeacherDetailSidebar(false);
    if (isTeacherDetailSidebar && !isMoreTeacherSidebarOpen) {
      document.body.style.overflow = 'scroll';
    }
  }, [isTeacherDetailSidebar, isMoreTeacherSidebarOpen, setIsTeacherDetailSidebar]);

  const handleOpenSidebar = useCallback(() => {
    setMoreTeacherSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  }, [setMoreTeacherSidebarOpen]);

  const CloseShowMoreSidebar = useCallback(() => {
    setMoreTeacherSidebarOpen(false);
    document.body.style.overflow = 'scroll';
  }, [setMoreTeacherSidebarOpen]);

  useEffect(() => {
    if (!isTeacherDetailSidebar && !isMoreTeacherSidebarOpen) {
      document.body.style.overflow = 'scroll';
    }

    if(!show && isMoreTeacherSidebarOpen){
    }
  }, [isMoreTeacherSidebarOpen, isTeacherDetailSidebar, show]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teacherFilterdData = useMemo(() => 
    useTeacherFilter(TeachersData, teacherFilterQuery),
    [TeachersData, teacherFilterQuery]
  );

  return (
    <>
      <div className='relative'>
        <div className='hidden sm:grid grid-cols-2 smd:grid-cols-3 gap-[16px] mt-[16px] sm:mt-[20px] min-w-[1500px] sm:min-w-full sm:w-full'>
          {teacherFilterdData?.length ? (
            teacherFilterdData
              ?.slice(0, 6)
              .map((teacher, idx) => (
                <TeacherProfile
                  key={teacher.id || idx}
                  teacher={teacher}
                  showTeacherDetails={showTeacherDetails}
                  language={language}
                />
              ))
          ) : (
            <span className='text-sm text-gray-500'>
              {translateENtoDE('Teachers not available', language)}
            </span>
          )}

          {/* Sidebar for viewing all teachers */}
        </div>
        <div className='relative z-1 sm:hidden block '>
          <Swiper
            spaceBetween={10}
            slidesPerView={1.2}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='mt-[16px] teacher-slider  '>
            {teacherFilterdData?.length ? (
              teacherFilterdData.slice(0, 6).map((teacher, idx) => (
                <SwiperSlide key={teacher.id || idx}>
                  <TeacherProfile
                    key={teacher.id || idx}
                    teacher={teacher}
                    showTeacherDetails={showTeacherDetails}
                    language={language}
                  />
                </SwiperSlide>
              ))
            ) : (
              <span className='text-[14px] text-[#000000ae] leading-[115%] font-Roboto font-medium pt-2'>
                {translateENtoDE('Teacher Not Found', language)}
              </span>
            )}
            {/* Sidebar for viewing all teachers */}
          </Swiper>
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className='absolute -left-[8px] sm:-left-4 top-1/2 -translate-y-1/2 z-20 border-[2px] border-gray-400 bg-white p-2 rounded-full shadow-lg transition-all hidden'>
              <ArrowLeft className='w-[24px] h-[24px]' />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className='absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 border-[2px] border-gray-400 bg-white p-2 rounded-full shadow-lg transition-all hidden'>
              <ArrowLeft className='w-[24px] h-[24px] rotate-180' />
            </button>
          </>
        </div>
        {TeachersData?.length > 6 && (
          <div
            onClick={() => handleOpenSidebar()}
            className='text-[14px] font-Roboto font-medium text-[#21697C] uppercase leading-[100%] cursor-pointer text-center  py-[10px] mt-3 rounded-full hover:bg-[#EDF3F5]'>
            {translateENtoDE('View all', language)} {`(${teacherFilterdData.length})`}
          </div>
        )}

        {isMoreTeacherSidebarOpen && (
          <div className='fixed inset-0 bg-[#000000A8] z-30' onClick={() => setMoreTeacherSidebarOpen(false)}></div>
        )}
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-[960px] bg-white overflow-y-auto overflow-x-hidden z-40 transition-all duration-300 ease-linear ${
            isMoreTeacherSidebarOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}>
          <TeacherSectionSidebar
            language={language}
            data={TeachersData}
            teacherFilterdData={teacherFilterdData}
            onClose={() => CloseShowMoreSidebar()}
            showTeacherDetails={showTeacherDetails}
            teacherFilterQuery={teacherFilterQuery}
            handleInstrumentChange={handleInstrumentChange}
          />
        </div>
      </div>
      <>
        <SidebarComponent isOpen={isTeacherDetailSidebar} zIndex={50} overlayZindex={40} onClose={() => handleClose()} title='Teacher Details'>
          {
            <TeacherDetailSidebar
              data={teacherDetails}
              onClose={() => handleClose()}
              language={language}
              scrolled={scrolled}
              isSidebarOpen={isMoreTeacherSidebarOpen}
              showPopup={showPopup}
              instrumentsData={instrumentsData}
              isTeacherDeatailLoading={isTeacherDeatailLoading}
              allOrganizationData={allOrganizationData}
            />
          }
        </SidebarComponent>
      </>
    </>
  );
});

TeacherSection.displayName = 'TeacherSection';
export default TeacherSection;

