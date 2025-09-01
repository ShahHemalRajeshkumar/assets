import React, { useMemo, useState, useEffect } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import CourseCard from './CourseCard';
import { useFilterCourse } from './useFilterCourse';
import { translateENtoDE } from 'functions/translator';
import SidebarComponent from '../sidebarComponent';
import dynamic from 'next/dynamic';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import axios from 'axios';
const ShowMoreCoursesSidebar = dynamic(() => import('./ShowMoreCoursesSidebar'));
const OrganizationCouresDetailSidebar = dynamic(() => import('../coursesSection/OrganizationCouresDetailSidebar'));

function CoursesSection({ courses, language, courseFilterQuery, showPopup, seoActions, instrumentsData, handleInstrumentChange, organizationData, allOrganizationData, setCommonFilterQuery }) {
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useWindowSize();
  const { isMoreCourseSidebarOpen, setIsMoreCourseSidebarOpen, isCourseDetailSidebar, setIsCourseDetailSidebar, savedInstrument, setInstrumentFilterAbout } =
    useSchoolPage();

  const imageSize = useMemo(
    () => ({
      height: width < 650 ? 220 : 108,
      width: width < 650 ? width - 40 : 162,
    }),
    [width]
  );

  async function handleShowDetail(course) {
    setIsLoading(true)
    setIsCourseDetailSidebar(true);
    try {
      const { data } = await axios.get('/api/getCourseDetail',{
        params: {
          organization:"mzo",
          mzo_course_id: course?.id,
        }
      });
      const courseDetailData = data?.data?.course
      const findCourseDataById = courses?.find((item)=> item?.id == course?.id)
      const findInstrumentData = instrumentsData?.find((item)=> item?.id == courseDetailData?.instrument_id)
      const courseResult = {...courseDetailData,instrument: findInstrumentData, partsgroup_rental: findCourseDataById?.partsgroup_rental}
      setCurrentSelectedCourse(courseResult);
    } catch (error) {
      console.error('Error fetching Course details:', error.message);
    } finally{
      setIsLoading(false)
    }
    document.body.style.overflow = 'hidden';
  }

  function handleOpenSiderbar() {
    setIsMoreCourseSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function handleClose() {
    setIsCourseDetailSidebar(false);
    if (isCourseDetailSidebar && !isMoreCourseSidebarOpen) {
      document.body.style.overflow = 'scroll';
    }
  }

  function handleCloseSidebar() {
    setIsMoreCourseSidebarOpen(false);
  }

  function handleCloseOutsideSidebar() {
    setIsMoreCourseSidebarOpen(false)
  }

  const filteredCourses = useFilterCourse(courses, courseFilterQuery);

  return (
    <>
      <div className='flex flex-col sm:gap-[8px]'>
        {filteredCourses?.length > 0 ? (
          filteredCourses
            .slice(0, 3)
            .map(
              (item, index) =>
                item && (
                  <CourseCard
                    key={index}
                    item={item}
                    courseIndex={index}
                    language={language}
                    imageSize={imageSize}
                    onClick={() => handleShowDetail(item)}
                  />
                )
            )
        ) : (
          <div className='text-sm text-gray-500'>{translateENtoDE('Courses not available', language)}</div>
        )}
        {courses?.length > 3 && (
          <div
            onClick={() => handleOpenSiderbar()}
            className='text-[14px] font-Roboto font-medium text-[#21697C] uppercase leading-[100%] cursor-pointer text-center py-[9px] mt-1 rounded-full hover:bg-[#EDF3F5]'>
            {translateENtoDE('View all', language)} {`(${filteredCourses.length})`}
          </div>
        )}
        {isMoreCourseSidebarOpen && (
          <div
            className='fixed inset-0 bg-[#000000A8] z-40'
            onClick={handleCloseOutsideSidebar}></div>
        )}
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-[960px] bg-white overflow-y-auto transition-all duration-300 ease-linear z-[60] ${
            isMoreCourseSidebarOpen ? 'translate-x-0 ' : 'translate-x-[100%]'
          }`}>
          <ShowMoreCoursesSidebar
            data={courses}
            filteredCourses={filteredCourses}
            onClose={handleCloseSidebar}
            language={language}
            imageSize={imageSize}
            showPopup={showPopup}
            handleShowDetail={handleShowDetail}
            instrumentsData={instrumentsData}
            courseFilterQuery={courseFilterQuery}
            handleInstrumentChange={handleInstrumentChange}
          />
        </div>
      </div>
      {
        <SidebarComponent isOpen={isCourseDetailSidebar} zIndex={60} overlayZindex={60} onClose={() => handleClose()}>
          <OrganizationCouresDetailSidebar
            course={currentSelectedCourse}
            language={language}
            onClose={() => handleClose()}
            seoActions={seoActions}
            isSidebarOpen={isMoreCourseSidebarOpen}
            isCourseDetailSidebar={isCourseDetailSidebar}
            showPopup={showPopup}
            organizationData={organizationData}
            isLoading={isLoading}
            allOrganizationData={allOrganizationData}
          />
        </SidebarComponent>
      }
    </>
  );
}

export default CoursesSection;
