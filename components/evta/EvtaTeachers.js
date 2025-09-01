import React, { useMemo } from 'react';
import CardComponent from '../TeachersSearch/CardComponent';

const EvtaTeachers = ({ language, instrument = {}, teachers = [] }) => {
  const filtered = useMemo(
    () =>
      teachers?.filter(
        (item) =>
          !!item?.association_list?.length &&
          !!item?.association_list?.filter((name) => name?.short_name?.en?.toLowerCase()?.includes('evta'))?.length
      ),
    [teachers]
  );

  const data = useMemo(() => {
    return filtered?.sort((a, b) => {
      if (a?.name < b?.name) return -1;
      if (a?.name > b?.name) return 1;
      return 0;
    });
  }, [filtered]);

  return (
    <div className='evta-teachers'>
      <style>{`#__next { background: transparent }`}</style>
      {data.map((hit, index) => (
        <div key={`${index}`} className='w-full'>
          <CardComponent
            blok={hit}
            isInfo={true}
            isEvta={true}
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

export default EvtaTeachers;
