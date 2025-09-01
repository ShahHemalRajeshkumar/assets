import React, { useMemo } from 'react';
import CardComponent from '../TeachersSearch/CardComponent';

const MAX_LENGTH = 6;

const InstrumentTeacherCards = ({ language, instrument = {}, teachers = [] }) => {
  const data = useMemo(
    () => teachers?.sort((a, b) => +b?.recommendations - +a?.recommendations).slice(0, MAX_LENGTH),
    [teachers]
  );

  return (
    <div className='instrument-teachers mt-[20px] mb-[20px]'>
      {data.map((hit, index) => (
        <div key={`${index}`} className='w-full'>
          <CardComponent
            blok={hit}
            isInfo={true}
            active={false}
            filterParams={{}}
            language={language}
            teacherIndex={index}
            instrument={instrument}
          />
        </div>
      ))}
    </div>
  );
};

export default InstrumentTeacherCards;
