import React, { useMemo } from 'react';
import useWindowSize from '../../../../hooks/useWindowSize';
import TeacherContentCoursesListItem from './TeacherContentCoursesListItem';

const TeacherContentCoursesList = ({ teacher, data = [], language, popupHandle, maxItemsVisible = 5, seoActions }) => {
  const { width } = useWindowSize();

  const imageSize = useMemo(
    () => ({
      height: width < 650 ? 220 : 112,
      width: width < 650 ? width - 40 : 162,
    }),
    [width]
  );

  return (
    <>
      {data.slice(0, maxItemsVisible).map((item, index) => (
        <TeacherContentCoursesListItem
          item={item}
          key={item?.id}
          teacher={teacher}
          courseIndex={index}
          language={language}
          imageSize={imageSize}
          seoActions={seoActions}
          onClick={() => popupHandle(item, true)}
        />
      ))}
    </>
  );
};

export default TeacherContentCoursesList;
