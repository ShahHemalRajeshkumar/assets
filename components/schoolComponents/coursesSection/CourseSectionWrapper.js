import React, { useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { translateENtoDE } from 'functions/translator';
import CoursesSelectField from './CoursesSelectField';
import cx from 'classnames';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

const CoursesSection = dynamic(() => import('./CoursesSection'), { ssr: false });
function CourseSectionWrapper({
  coursesData,
  language,
  showPopup,
  seoActions,
  instrumentsData,
  organizationData,
  allOrganizationData,
  commonFilterQuery,
  setCommonFilterQuery
}) {
  const { setSavedInstrument } = useSchoolPage();
  const courseDataWithInstruments = useMemo(() => {
    return coursesData?.map((course) => {
      const instrument = instrumentsData?.find((instrument) => instrument.id === course.instrument_id);
      return {
        ...course,
        instrument: instrument || null,
      };
    });
  }, [coursesData, instrumentsData]);
  const handleInstrumentChange = useCallback(
    (e) => {
      setCommonFilterQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setSavedInstrument(e.target.name === 'instrument' ? e.target.value : commonFilterQuery?.instrument);
    },
    [setCommonFilterQuery, setSavedInstrument, commonFilterQuery?.instrument]
  );

  return (
    <div className={cx('teacher-content-block md:!rounded-xl !px-[16px] !py-[20px] sm:!p-[20px]')}>
      <div className='flex smd:flex-row flex-col items-start gap-y-[16px] smd:items-center justify-between gap-[16px]  mb-[4px] sm:mb-[20px]'>
        <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto'>
          {translateENtoDE('Courses', language)}
        </h2>
        <CoursesSelectField
          courses={courseDataWithInstruments}
          language={language}
          courseFilterQuery={commonFilterQuery}
          handleInstrumentChange={handleInstrumentChange}
        />
      </div>
      <CoursesSection
        courses={courseDataWithInstruments}
        language={language}
        courseFilterQuery={commonFilterQuery}
        showPopup={showPopup}
        instrumentsData={instrumentsData}
        seoActions={seoActions}
        handleInstrumentChange={handleInstrumentChange}
        organizationData={organizationData}
        allOrganizationData={allOrganizationData}
        setCommonFilterQuery={setCommonFilterQuery}
      />
    </div>
  );
}
export default CourseSectionWrapper;
