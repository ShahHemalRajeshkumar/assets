// import { useEffect, useMemo, useRef, useState } from 'react';
// import { translateENtoDE } from 'functions/translator';
// import ArrowLeft from '@/components/icons/ArrowLeft';
// import React from 'react';
// import useWindowSize from 'hooks/useWindowSize';
// import ShareIcon from '@/components/icons/ShareIcon';
// import CloseIcon from '@/components/icons/closeIcon';
// import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
// import Spinner from '@/components/Spinner';
// import { useSchoolPage } from '@/utils/context/SchoolPageContext';
// import { FieldBlock } from '../commonComponent/fieldsBlock';
// import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
// import { TeachingLocation } from '../commonComponent/TeachingLocation';
// import { StepFormObject } from '@/utils/schoolpage/StepFormDetails';

// const TeacherDetailSidebar = React.memo(
//   ({
//     data,
//     onClose,
//     language,
//     showPopup,
//     isSidebarOpen,
//     isTeacherDeatailLoading,
//     instrumentsData,
//     allOrganizationData,
//   }) => {
//     const [teacherDetails, setTeacherDetails] = useState(null);
//     const [isGenreExpend, setIsGenreExpend] = useState(false);
//     const [isReached, setIsReached] = useState(false);
//     const [showAllLocations, setShowAllLocations] = useState(false);

//     const { width } = useWindowSize();
//     const { setCurrentSelectedTeacher, setIsMoreCourseSidebarOpen } = useSchoolPage();
//     const itemReachPoint = useRef();
//     const sidebarRef = useRef();
//     useEffect(() => {
//       const sidebar = sidebarRef.current;
//       if (!sidebar) return;

//       const handleScroll = () => {
//         if (!itemReachPoint.current) return;

//         const rect = itemReachPoint.current.getBoundingClientRect();
//         const sidebarRect = sidebar.getBoundingClientRect();
//         setIsReached(rect.top < sidebarRect.bottom);
//       };

//       sidebar.addEventListener('scroll', handleScroll);
//       handleScroll(); 

//       return () => {
//         sidebar.removeEventListener('scroll', handleScroll);
//       };
//     }, []);

//     useEffect(() => {
//       if (data) setTeacherDetails(data);
//     }, [data]);

//     const expandedGenres = useMemo(() => {
//       if (!teacherDetails?.genres) return [];
//       return isGenreExpend ? teacherDetails.genres : teacherDetails.genres.slice(0, 5);
//     }, [isGenreExpend, teacherDetails]);

//     const filterLocation = useMemo(() => {
//       return (
//         allOrganizationData
//           ?.filter((loc) => data?.region_ids?.includes(loc?.id))
//           .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? []
//       );
//     }, [allOrganizationData, data]);

//     if (isTeacherDeatailLoading) {
//       return (
//         <div className="bg-white relative h-full flex items-center justify-center">
//           <Spinner />
//         </div>
//       );
//     }

//     if (!teacherDetails) {
//       return (
//         <div className="bg-white relative h-full flex items-center justify-center text-gray-500">
//           {translateENtoDE(`No teacher details found`, language)}
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white relative h-full overflow-y-scroll pb-14 sm:pb-0" ref={sidebarRef}>
//         <div className="flex justify-between items-center mb-[24px] p-[20px] border-b border-[#E4E7EC] sticky top-0 bg-white z-30">
//           <div className="flex gap-3 items-center">
//             {isSidebarOpen && (
//               <div onClick={onClose} className="cursor-pointer">
//                 <ArrowLeft />
//               </div>
//             )}
//             <h3 className="font-semibold text-[19px] leading-[100%] font-Roboto">
//               {translateENtoDE('Teacher details', language)}
//             </h3>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() =>
//                 showPopup(
//                   'links',
//                   { title: translateENtoDE('Share this page', language) },
//                   setCurrentSelectedTeacher(teacherDetails)
//                 )
//               }
//             >
//               <ShareIcon className="w-[24px] h-[24px] cursor-pointer" />
//             </button>
//             <button onClick={onClose} className="text-gray-600 hover:text-red-500">
//               <CloseIcon />
//             </button>
//           </div>
//         </div>
//         <div className="flex sm:flex-row flex-col gap-8 md:gap-[40px] px-[16px] sm:px-[24px] pb-[24px]">
//           <div className="w-full max-w-full sm:max-w-[288px] flex flex-col items-center">
//             <div className="w-full !max-w-[200px] !h-[200px] object-cover rounded-full overflow-hidden relative">
//               <img
//                 src={teacherDetails?.image_url || '/assets/images/teacherdefault.avif'}
//                 alt="teacher image"
//                 className="absolute inset-0 object-cover rounded-full"
//               />
//             </div>
//             <p className="text-[22px] sm:text-[24px] font-Roboto leading-[116%] text-[#000000DE] font-bold mt-[16px]">
//               {teacherDetails?.name}
//             </p>
//             {LessonsStepSection(
//               StepFormObject,
//               language,
//               <div
//                 onClick={() => setIsMoreCourseSidebarOpen(true)}
//                 className="text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full hover:bg-[#004252] transition duration-300 ease-linear border border-transparent"
//               >
//                 {translateENtoDE(`VIEW COURSES`, language)}
//               </div>
//             )}
//           </div>
//           <div className="w-full sm:max-w-[584px] sm:min-w-[300px]">
//             {teacherDetails?.about_me && (
//               <div>
//                 <h4 className="font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-4">
//                   {translateENtoDE('About me', language)}
//                 </h4>
//                 <ShowMoreTextNext
//                   maxLength={200}
//                   language={language}
//                   showButtonLabel={translateENtoDE('Show more', language)}
//                 >
//                   {teacherDetails?.about_me?.mzo ||
//                     teacherDetails?.about_me[language === 'ch-en' ? 'en' : 'de']}
//                 </ShowMoreTextNext>
//               </div>
//             )}
//             {teacherDetails?.instruments?.length > 0 && (
//               <div className="mt-[20px]">
//                 <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
//                   {translateENtoDE('Instruments', language) + ':'}
//                 </h5>
//                 <div className="flex flex-wrap gap-[8px] mt-[8px]">
//                   {teacherDetails.instruments.map((instrument, idx) => (
//                     <div key={idx} className="flex items-center gap-2 py-[8px] px-[12px] bg-[#F2F4F7] rounded-[4px]">
//                       <span className="text-[16px]">🎹</span>
//                       <span className="text-[14px] font-medium font-Roboto text-[#000000DE]">
//                         {language === 'ch-en' ? instrument.en : instrument.de}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <div className="flex flex-col sm:flex-row gap-[20px] mt-[20px]">
//               {teacherDetails?.age_groups?.length > 0 && (
//                 <div className="flex-1">
//                   <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
//                     {translateENtoDE('Age groups taught', language) + ':'}
//                   </h5>
//                   <div className="flex flex-wrap gap-[8px] mt-[8px]">
//                     {teacherDetails.age_groups.map((ageGroup, idx) => (
//                       <div key={idx} className="py-[8px] px-[12px] bg-[#F2F4F7] rounded-[4px]">
//                         <span className="text-[14px] font-medium font-Roboto text-[#000000DE]">
//                           {translateENtoDE(ageGroup, language)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {teacherDetails?.languages?.length > 0 && (
//                 <div className="flex-1">
//                   <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
//                     {translateENtoDE('Languages', language) + ':'}
//                   </h5>
//                   <div className="flex flex-wrap gap-[8px] mt-[8px]">
//                     {teacherDetails.languages.map((lang, idx) => (
//                       <div key={idx} className="py-[8px] px-[12px] bg-[#F2F4F7] rounded-[4px]">
//                         <span className="text-[14px] font-medium font-Roboto text-[#000000DE]">
//                           {language === 'ch-en' ? lang.en : lang.de}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div ref={itemReachPoint} className="mt-[20px]">
//               <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold whitespace-nowrap">
//                 {translateENtoDE(`Main musical genres`, language) + ':'}
//               </h5>
//               <div className="flex flex-wrap gap-[4px] mt-[8px]">
//                 {expandedGenres.map((genre, idx) =>
//                   FieldBlock(language === 'ch-en' ? genre.en : genre.de, idx)
//                 )}
//                 {!isGenreExpend && teacherDetails?.genres?.length > 5 && (
//                   <button
//                     onClick={() => setIsGenreExpend(true)}
//                     className="py-[8px] px-[10px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto text-[#21697C]"
//                   >
//                     {`${teacherDetails?.genres.length - 5}+`}
//                   </button>
//                 )}
//               </div>
//             </div>
//             {(teacherDetails?.lessons || teacherDetails?.lesson_description || teacherDetails?.my_lessons) && (
//               <div className="mt-[20px]">
//                 <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold mb-[8px]">
//                   {translateENtoDE('My lessons', language) + ':'}
//                 </h5>
//                 <p className="text-[14px] text-[#000000AD] font-Roboto leading-[160%]">
//                   {teacherDetails?.lessons?.[language === 'ch-en' ? 'en' : 'de'] || 
//                    teacherDetails?.lesson_description?.[language === 'ch-en' ? 'en' : 'de'] ||
//                    teacherDetails?.my_lessons?.[language === 'ch-en' ? 'en' : 'de'] ||
//                    teacherDetails?.lessons || teacherDetails?.lesson_description || teacherDetails?.my_lessons}
//                 </p>
//               </div>
//             )}
//             {(teacherDetails?.specialization || teacherDetails?.specializations || teacherDetails?.my_specialization) && (
//               <div className="mt-[20px]">
//                 <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold mb-[8px]">
//                   {translateENtoDE('My specialization', language) + ':'}
//                 </h5>
//                 <p className="text-[14px] text-[#000000AD] font-Roboto leading-[160%]">
//                   {teacherDetails?.specialization?.[language === 'ch-en' ? 'en' : 'de'] ||
//                    teacherDetails?.specializations?.[language === 'ch-en' ? 'en' : 'de'] ||
//                    teacherDetails?.my_specialization?.[language === 'ch-en' ? 'en' : 'de'] ||
//                    teacherDetails?.specialization || teacherDetails?.specializations || teacherDetails?.my_specialization}
//                 </p>
//               </div>
//             )}
//             {filterLocation?.length > 0 && (
//               <div className="mt-[20px]">
//                 <h5 className="text-[14px] font-Roboto text-[#000000DE] font-semibold mb-[12px]">
//                   {translateENtoDE('Teaching locations', language)}
//                 </h5>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
//                   {(showAllLocations ? filterLocation : filterLocation.slice(0, 4)).map((location, idx) => (
//                     <div key={idx} className="flex items-start gap-[8px]">
//                       <div className="w-[6px] h-[6px] bg-[#E91E63] rounded-full mt-[6px] flex-shrink-0"></div>
//                       <div>
//                         <p className="text-[14px] font-semibold text-[#000000DE] font-Roboto">
//                           {location?.full_name?.[language === 'ch-en' ? 'en' : 'de']}
//                         </p>
//                         <p className="text-[13px] text-[#000000AD] font-Roboto">
//                           {location?.mzo_region_addresses?.[0]?.full_address}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {filterLocation.length > 4 && (
//                   <button 
//                     onClick={() => setShowAllLocations(!showAllLocations)}
//                     className="text-[14px] text-[#21697C] font-medium mt-[8px] hover:underline"
//                   >
//                     {translateENtoDE(showAllLocations ? 'Show less' : 'Show more', language)}
//                   </button>
//                 )}
//               </div>
//             )}
//             {width < 600 && isReached && (
//               <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4">
//                 <button
//                   onClick={() => setIsMoreCourseSidebarOpen(true)}
//                   className="bg-[#F9843B] text-white text-[15px] font-medium uppercase py-[13px] w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition"
//                 >
//                   {translateENtoDE('VIEW COURSES', language)}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default TeacherDetailSidebar;

import { getPinFullAddress } from '@/components/TeachersSearchMap/mapboxInfo';
import { useEffect, useMemo, useRef, useState } from 'react';
import { translateENtoDE } from 'functions/translator';
import Image from 'next/image';
import ArrowLeft from '@/components/icons/ArrowLeft';
import React from 'react';
import useScroll from '../onScrollShowPopup';
import useWindowSize from 'hooks/useWindowSize';
import ShareIcon from '@/components/icons/ShareIcon';
import CloseIcon from '@/components/icons/closeIcon';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import Spinner from '@/components/Spinner';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import { FieldBlock } from '../commonComponent/fieldsBlock';
import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
import TeacherStudioIcon from '../../../components/icons/TeacherStudio.svg';
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
    const [showCallButton, setShowCallButton] = useState(false);
    const [isGenreExpend, setIsGenreExpend] = useState(false);
    const { width } = useWindowSize();
    const { setCurrentSelectedTeacher, setIsMoreCourseSidebarOpen } = useSchoolPage();
    const itemReachPoint = useRef();
    const sidebarRef = useRef();
    const { isReached } = useScroll(itemReachPoint, sidebarRef);

    useEffect(() => {
      if (data) {
        setTeacherDetails(data);
      }
    }, [data]);

    useEffect(() => {
      const handleScroll = () => {
        if (sidebarRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
          setShowCallButton(scrollTop + clientHeight >= scrollHeight - 30);
        }
      };

      if (sidebarRef.current) {
        sidebarRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (sidebarRef.current) {
          sidebarRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    const studioLocations = useMemo(() => {
      const data = [];
      return data?.flat();
    }, [teacherDetails]);

    const expandedGenres = (genres) => {
      return isGenreExpend
        ? genres
        : teacherDetails?.genres.slice(0, 5).map((item, index) => item);
    };

    const filterLocation =
      allOrganizationData
        ?.filter((location) => data?.region_ids?.find((item) => item == location?.id))
        .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? [];

    return (
      <div
        className="bg-white relative h-full overflow-y-scroll pb-14 sm:pb-0"
        ref={sidebarRef}
      >
        <ul>
          {/* Header */}
          <div className="flex justify-between items-center mb-[24px] p-[20px] border-b-[1px] border-[#E4E7EC] sticky top-0 bg-white z-30">
            <div className="flex gap-3 items-center">
              {isSidebarOpen && (
                <div onClick={onClose} className="cursor-pointer">
                  <ArrowLeft />
                </div>
              )}
              <h3 className="font-semibold text-[19px] leading-[100%] tx-primary font-Roboto">
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

          {/* Content */}
          {isTeacherDeatailLoading ? (
            <li className="flex items-center justify-center h-[80vh]">
              <Spinner />
            </li>
          ) : teacherDetails ? (
            <li className="flex sm:flex-row flex-col gap-8 md:gap-[40px] px-[16px] sm:px-[24px] pb-[24px]">
             
              <div className="w-full max-w-full sm:max-w-[288px] flex flex-col items-center">
                <div className="w-full !max-w-[120px] sm:!max-w-[160px] md:!max-w-[200px] !h-[120px] sm:!h-[160px] md:!h-[200px] object-cover rounded-full overflow-hidden relative">
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
                    className="text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full hover:bg-[#004252] transition duration-300 ease-linear border-[1px] border-transparent"
                  >
                    {translateENtoDE('VIEW COURSES', language)}
                  </div>
                )}
              </div>

              {/* Right Content */}
              <div className="w-full sm:max-w-[584px] sm:min-w-[300px]">
                {/* About Me */}
                {teacherDetails?.about_me && (
                  <div>
                    <h5 className="font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-4">
                      {translateENtoDE('About me', language)}
                    </h5>
                    <ShowMoreTextNext
                      maxLength={200}
                      language={language}
                      showButtonLabel={translateENtoDE('Show more', language)}
                    >
                      {teacherDetails?.about_me?.mzo
                        ? teacherDetails?.about_me?.mzo
                        : language === 'ch-en'
                        ? teacherDetails?.about_me.en
                        : teacherDetails?.about_me.de}
                    </ShowMoreTextNext>
                  </div>
                )}

                {/* Instruments */}
                <div className="mt-[20px]">
                  <h6 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
                    {translateENtoDE('Instruments', language) + ':'}
                  </h6>
                  <div className="flex flex-wrap gap-2 xs:gap-1 mt-2">
                    {[...new Set([...teacherDetails?.i_keys])]?.map((instrument, idx) => {
                      const findInstrument = instrumentsData.find(
                        (item) => item.key.toLowerCase() === instrument.toLowerCase()
                      );
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-[8px] py-[7px] px-[9px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto leading-[115%] text-[#000000AD] capitalize"
                        >
                          <div className="ms_instruments">
                            <div
                              className={`ms_instruments-${String(findInstrument?.key)
                                .toLowerCase()
                                .replace(' ', '_')} text-[19px] font-medium text-[#000000ad]`}
                            />
                          </div>
                          <div className="text-[14px] font-Roboto font-medium text-[#000000ad]">
                            {language === 'ch-en'
                              ? findInstrument?.en
                              : findInstrument?.de.toLowerCase().replace('_', ' ')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ages / Languages / Genres */}
                <div className="mt-[20px] grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-[16px] w-full border-b-[1px] border-[#E4E7EC] pb-[20px] mb-[20px]">
                  <div>
                    <h6 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
                      {translateENtoDE('Age groups taught', language) + ':'}
                    </h6>
                    <div className="mt-2 flex items-center gap-[4px]">
                      {teacherDetails?.ages &&
                        teacherDetails?.ages.map((age, idx) =>
                          FieldBlock(
                            translateENtoDE(
                              age.replace(/^./, (c) => c.toUpperCase()),
                              language
                            ),
                            idx
                          )
                        )}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-[14px] font-Roboto text-[#000000DE] font-semibold">
                      {translateENtoDE('Languages', language) + ':'}
                    </h6>
                    <div className="mt-2 flex flex-wrap gap-[4px]">
                      {teacherDetails?.languages?.map((item, idx) =>
                        FieldBlock(language === 'ch-en' ? item.en : item.de, idx)
                      )}
                    </div>
                  </div>
                  <div ref={itemReachPoint}>
                    <h6 className="text-[14px] font-Roboto text-[#000000DE] font-semibold whitespace-nowrap hyphens-auto">
                      {translateENtoDE('Main musical genres', language) + ':'}
                    </h6>
                    <div className="flex flex-wrap gap-[4px] mt-[8px]">
                      {expandedGenres(teacherDetails?.genres).map((genre, idx) =>
                        FieldBlock(language === 'ch-en' ? genre.en : genre.de, idx)
                      )}
                      {!isGenreExpend && teacherDetails?.genres?.length > 5 && (
                        <button
                          onClick={() => setIsGenreExpend(!isGenreExpend)}
                          className="py-[8px] px-[10px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto leading-[115%] text-[#21697C] capitalize text-center"
                        >
                          {teacherDetails?.genres.length - 5}+
                        </button>
                      )}
                    </div>

                  
                    {width < 600 && isReached && (
                      <div
                        onClick={() => setIsMoreCourseSidebarOpen(true)}
                        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4"
                      >
                        <button className="bg-[#F9843B] text-white text-[15px] font-medium uppercase py-[13px] w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition">
                          {translateENtoDE('VIEW COURSES', language)}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Locations */}
                {filterLocation && filterLocation?.length > 0 && (
                  <TeachingLocation
                    title="Teaching locations"
                    filterLocation={filterLocation}
                    language={language}
                  />
                )}

                {/* Lessons & Specialization */}
                <div>
                  <div className="mb-[20px]">
                    <h3 className="font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-[16px]">
                      {translateENtoDE('My lessons', language)}
                    </h3>
                    <ShowMoreTextNext
                      maxLength={200}
                      language={language}
                      showButtonLabel={translateENtoDE('Show more', language)}
                    >
                      {teacherDetails?.quote?.mzo
                        ? teacherDetails?.quote?.mzo
                        : teacherDetails?.quote[language === 'ch-en' ? 'en' : 'de']}
                    </ShowMoreTextNext>
                  </div>
                  <h3 className="font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-[16px]">
                    {translateENtoDE('My specialization', language)}
                  </h3>
                  <ShowMoreTextNext
                    maxLength={200}
                    language={language}
                    showButtonLabel={translateENtoDE('Show more', language)}
                  >
                    {teacherDetails?.specialties?.mzo
                      ? teacherDetails?.specialties?.mzo
                      : teacherDetails?.specialties[language === 'ch-en' ? 'en' : 'de']}
                  </ShowMoreTextNext>
                </div>
              </div>
            </li>
          ) : (
            <li className="text-gray-500 flex justify-center items-center h-[80vh]">
              {translateENtoDE('No teacher details found', language)}
            </li>
          )}
        </ul>
      </div>
    );
  }
);
export default TeacherDetailSidebar;
