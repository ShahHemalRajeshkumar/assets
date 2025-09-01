import React, { useEffect, useState } from 'react';
import TeacherSection from './TeacherSection';
import { translateENtoDE } from 'functions/translator';
import TeacherFilterField from './TeacherFilterField';
import cx from 'classnames';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

function TeacherContentWrapper({ teachersData, language, showPopup, instrumentsData, show, allOrganizationData, commonFilterQuery, setCommonFilterQuery }) {

  const { setSavedInstrument } =  useSchoolPage()

  function handleInstrumentChange(name, value) {
    setCommonFilterQuery((prev) => ({ ...prev, [name]: value }));
    setSavedInstrument(name === 'instrument' ? value : commonFilterQuery?.instrument)
  }

  const TeacherWithInstruments = [];
  const allData = teachersData?.map((teacher) => {
    const instrumentData = [];
    teacher.i_keys?.forEach((key) => {
      const instrument = instrumentsData?.find((instrument) => instrument?.key === key);
      if (instrument) {
        instrumentData.push(instrument);
      }
    });
    if (instrumentData.length > 0) {
      TeacherWithInstruments.push({
        ...teacher,
        instruments: instrumentData,
      });
    }
  });

  return (
      <div
        className={cx(
          'teacher-content-block md:!rounded-xl !p-[16px] sm:!p-[20px] w-full sm:!mb-[20px]',
          teachersData?.length > 6 ? 'pb-[10px] xs:pb-[13px]' : 'pb-[20px]'
        )}>
        <div className='flex sm:flex-row flex-col items-start sm:items-center gap-y-[16px] justify-between'>
          <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto '>
            {translateENtoDE('Teachers', language)}
          </h2>
          <TeacherFilterField
            data={TeacherWithInstruments}
            teacherFilterQuery={commonFilterQuery}
            handleInstrumentChange={handleInstrumentChange}
            language={language}
          />
        </div>
        <TeacherSection
          TeachersData={TeacherWithInstruments}
          language={language}
          teacherFilterQuery={commonFilterQuery}
          showPopup={showPopup}
          handleInstrumentChange={handleInstrumentChange}
          instrumentsData={instrumentsData}
          show={show}
          allOrganizationData={allOrganizationData}
        />
      </div>
  );
}

export default TeacherContentWrapper;
