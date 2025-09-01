import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { translateENtoDE } from 'functions/translator';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import AboutSection from './Instruments/AboutSection';
import OtherLocationSection from './OtherLocationSection';
import InstrumentRelatedLocation from './instrumentRelatedLocation';
import SchoolMapBoxWrapper from './locationSection/SchoolMapBoxWrapper';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

const OrganizationReviews = dynamic(() => import('./organizationReviews/OrganizationReviews'));
const ContentBlock = dynamic(() => import('../TeacherInfoPage/ContentBlock'));
const TeacherContentGallery = dynamic(() =>
  import('../TeacherInfoPage/TeacherContent/TeacherContentGallery/TeacherContentGallery')
);
const TeacherContentWrapper = dynamic(() => import('./teacherSection/TeacherContentWrapper'));
const CourseSectionWrapper = dynamic(() => import('./coursesSection/CourseSectionWrapper'));
const EventsData = dynamic(() => import('./eventCompoenents/EventsData'));

function OrganizationContent({
  organizationData,
  language,
  showPopup,
  seoActions,
  shareLinkHandle,
  instrumentsData,
  teachersData,
  coursesData,
  show,
}) {
  const { query } = useRouter();
  const [activeSection, setActiveSection] = useState('about');
  const [showMore, setShowMore] = useState(false);
  const [locations, setLocations] = useState([]);
  const [commonFilterQuery, setCommonFilterQuery] = useState({ courseType: '', instrument: '', age: '' });
  const sectionRefs = useRef({});
  const isScrollingByClick = useRef(false);
  const showMoreRef = useRef(null);
  const { setSavedInstrument } = useSchoolPage();

  const navdata = useMemo(() => {
    return [
      { nav: 'About', id: 'about' },
      organizationData?.teachers?.length > 0 && { nav: 'Teachers', id: 'teachers' },
      coursesData?.length > 0 && { nav: 'Courses', id: 'courses' },
      organizationData?.gallery?.length > 0 && { nav: 'Gallery', id: 'gallery' },
      { nav: 'Location', id: 'location' },
      { nav: 'Events', id: 'event' },
      { nav: 'More Locations', id: 'otherlocation' },
      { nav: 'More Instruments', id: 'instrument' },
    ].filter(Boolean);
  }, [organizationData]);

  const visibleNavs = navdata.slice(0, 7);
  const moreNavs = navdata.slice(visibleNavs.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (isScrollingByClick.current) return;
        entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id));
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0.1 }
    );

    navdata.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => Object.values(sectionRefs.current).forEach(el => observer.unobserve(el));
  }, [navdata]);

  const handleNavClick = id => {
    const section = document.getElementById(id);
    if (section) {
      isScrollingByClick.current = true;
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 75, behavior: 'smooth' });
      setActiveSection(id);
      setTimeout(() => (isScrollingByClick.current = false), 800);
    }
    setShowMore(false);
  };

  useEffect(() => {
    const handleClick = e => {
      if (!showMoreRef.current?.contains(e.target)) setShowMore(false);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    fetch('/api/music-schools')
      .then(res => res.json())
      .then(({ data }) => setLocations(data));
  }, []);

  useEffect(() => {
    if (query?.instrument) {
      const instrument = instrumentsData?.find(item => query.instrument === item?.key);
      if (instrument?.id) {
        setCommonFilterQuery(prev => ({ ...prev, instrument: instrument.id }));
        setSavedInstrument(instrument.id);
      }
    }
  }, [query]);

  return (
    <div className='w-full max-w-full md:max-w-[61.7%]'>
      {navdata.length > 0 && (
        <div className='sticky top-0 z-10 pl-[16px] sm:px-[20px] pt-[24px] bg-[#F3F5F6]'>
          <div className='relative w-full whitespace-nowrap pr-2'>
            <div className='flex gap-[20px] xs:gap-[28px] pb-[7px] mb-[13px] overflow-x-auto'>
              {visibleNavs.map(({ id, nav }) => (
                <span
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`text-[13px] font-Roboto font-semibold uppercase pb-[6px] cursor-pointer border-b-[3px] ${
                    activeSection === id ? 'border-[#21697C] text-black' : 'border-transparent text-[#000000AD]'
                  } hover:text-black hover:border-[#21697C]`}>
                  {translateENtoDE(nav, language)}
                </span>
              ))}
              {moreNavs.length > 0 && (
                <span
                  onClick={() => setShowMore(!showMore)}
                  className='hidden md:inline-block text-[13px] font-semibold uppercase border-b-[3px] text-[#000000AD] hover:text-black cursor-pointer pt-1.5'>
                  {translateENtoDE('More', language)}
                </span>
              )}
            </div>
            {showMore && (
              <div
                ref={showMoreRef}
                className='absolute z-[999] right-0 top-[40px] bg-white shadow-lg rounded-lg w-max min-w-[150px]'>
                {moreNavs.map(({ id, nav }) => (
                  <span
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className='block px-4 py-2 text-[13px] font-Roboto cursor-pointer hover:bg-gray-200'>
                    {translateENtoDE(nav, language)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div id='about' className='org-gallery mb-[20px]'>
        <div className='teacher-content-block md:rounded-xl p-[16px] md:p-[24px]'>
          <div className='flex items-center gap-2 mb-[20px]'>
            <img src='/assets/images/musicschool.svg' alt='image' className='w-[32px] h-[32px]' />
            <span className='text-[15px] font-semibold text-black/[87%]'>{translateENtoDE('Public Music School', language)}</span>
          </div>
          <h2 className='font-bold text-[19px] mb-[20px]'>{translateENtoDE('About', language)}</h2>
          <AboutSection organizationData={organizationData} language={language} instrumentsData={instrumentsData} setCommonFilterQuery={setCommonFilterQuery} commonFilterQuery={commonFilterQuery} />
        </div>
      </div>

      {organizationData?.teachers?.length > 0 && (
        <div id='teachers' className='org-gallery'>
          <TeacherContentWrapper
            teachersData={organizationData.teachers}
            language={language}
            showPopup={showPopup}
            instrumentsData={instrumentsData}
            show={show}
            allOrganizationData={locations}
            commonFilterQuery={commonFilterQuery}
            setCommonFilterQuery={setCommonFilterQuery}
          />
        </div>
      )}

      {coursesData?.length > 0 && (
        <div id='courses' className='org-gallery mb-[20px]'>
          <CourseSectionWrapper
            coursesData={coursesData}
            instrumentsData={instrumentsData}
            language={language}
            showPopup={showPopup}
            seoActions={seoActions}
            organizationData={organizationData}
            allOrganizationData={locations}
            commonFilterQuery={commonFilterQuery}
            setCommonFilterQuery={setCommonFilterQuery}
          />
        </div>
      )}

      {organizationData?.gallery?.length > 0 && (
        <div id='gallery' className='org-gallery xs:h-[360px] sm:mb-[5px]'>
          <ContentBlock name='gallery' language={language} maxItemsVisible={0} data={organizationData.gallery} onShowPopup={showPopup} label={translateENtoDE('Gallery', language)}>
            <TeacherContentGallery gallery={organizationData.gallery.slice(0, 5)} showPopup={showPopup} organizationGalleryClass='!max-w-[calc(100vw-12px)]' />
          </ContentBlock>
        </div>
      )}

      <div id='location' className='org-gallery mb-[20px]'>
        <ContentBlock name='location' withPopup={false} language={language} label={translateENtoDE('Location', language)}>
          <SchoolMapBoxWrapper language={language} locations={organizationData?.addresses} query={query} />
        </ContentBlock>
      </div>

      <div id='event' className='org-gallery'>
        <EventsData language={language} organizationData={organizationData} />
      </div>

      <OtherLocationSection locationsData={locations} language={language} />

      <div id='instrument' className='org-gallery'>
        <div className='teacher-content-block md:rounded-xl p-[20px] mb-0'>
          <h2 className='font-bold text-[19px] mb-[12px]'>{translateENtoDE('More Instruments', language)}</h2>
          <InstrumentRelatedLocation organizationData={organizationData} instrumentsData={instrumentsData} language={language} locations={locations} />
        </div>
      </div>
    </div>
  );
}

export default OrganizationContent;