const TeachersCounter = ({ counter, instrument, language, filteredSchools }) => {
  const checkSchoolExist = filteredSchools.some((item)=> item?.profile_type === "music_school");
  
  const text =
    language === 'ch-en'
      ? `${counter} ${(instrument?.en || '').toLowerCase()}  teacher${counter > 1 ? 's' : ''} ${checkSchoolExist ? 'and schools' : ''}`
      : `${counter} ${instrument?.de || ''}${instrument?.delimiters?.teacher || ''}${counter > 1 ? 'nen' : ''} ${checkSchoolExist ? 'und Schulen' : ''}`;

  if (!counter) return <div />;
  return <p className='font-medium text-[17px]'>{text.replace(/'  '/g, '')}</p>;
};

export default TeachersCounter;
