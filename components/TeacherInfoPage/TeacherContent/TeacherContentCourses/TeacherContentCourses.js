import cx from 'classnames';
import React, { useState, useMemo, useCallback } from 'react';
import { translateENtoDE } from '../../../../functions/translator';
import TeacherContentCoursesList from './TeacherContentCoursesList';

const getTabs = (lang) => [
  { label: translateENtoDE('All', lang), value: 'all' },
  { label: translateENtoDE('Private lessons', lang), value: 'pri_vate' },
  // { label: translateENtoDE('Group courses', lang), value: 'group_course' },
  // { label: translateENtoDE('Workshops', lang), value: 'workshop' },
  // { label: translateENtoDE('Music camps', lang), value: 'music_camp' },
];

const TeacherContentCourses = ({ teacher, courses = [], language, showPopup, maxItemsVisible = 5, seoActions }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [maxItems, setMaxItems] = useState(() => maxItemsVisible);

  const tabs = useMemo(() => getTabs(language), [language]);

  const filteredCourses = useMemo(() => {
    const filtered = courses
      ?.filter((item) => {
        if (activeTab === 'all') return true;

        return item?.course_type === activeTab;
      })
      .filter((item) => item?.status === 'published');

    const withOrder = filtered
      ?.filter((item) => item?.order_num || item?.order_num === 0)
      .sort((a, b) => a?.order_num - b?.order_num || 999);
    const withoutOrder = filtered
      ?.filter((item) => !item?.order_num && item?.order_num !== 0)
      .sort((a, b) => a?.id - b?.id);

    return [...withOrder, ...withoutOrder];
  }, [courses, activeTab]);

  const activeTabHandle = (tab) => {
    setActiveTab(tab);
    setShowAll(false);
    setMaxItems(maxItemsVisible);
  };

  const popupHandle = (course, isPrice) => {
    showPopup(isPrice ? 'course-price' : 'course', {
      course,
      extraClass: 'teacher-page-popup-course-mobile',
      title: translateENtoDE('Course details', language),
    });
  };

  const showAllCourses = useCallback(() => {
    setShowAll(() => !showAll);
    setMaxItems(showAll ? maxItemsVisible : courses.length);
  }, [showAll, courses, maxItemsVisible]);

  return (
    <div className={cx('teacher-content-courses', { 'pb-2': filteredCourses.length > maxItemsVisible })}>
      <div className='teacher-content-courses-tabs'>
        {tabs.map((item) => (
          <div
            key={item.value}
            className={`teacher-content-courses-tabs-item${
              activeTab === item.value ? ' teacher-content-courses-tabs-item__active' : ''
            }`}
            onClick={() => activeTabHandle(item.value)}>
            {item.label}
          </div>
        ))}
      </div>
      <TeacherContentCoursesList
        teacher={teacher}
        language={language}
        data={filteredCourses}
        seoActions={seoActions}
        popupHandle={popupHandle}
        maxItemsVisible={maxItems}
      />
      {filteredCourses.length > maxItemsVisible && (
        <button
          type='button'
          onClick={showAllCourses}
          className={cx('teacher-content-courses-btn', {
            'teacher-content-courses-btn-all': showAll,
          })}>
          {showAll
            ? translateENtoDE('View less', language)
            : `${translateENtoDE('View all', language)} (${filteredCourses?.length})`}
        </button>
      )}
    </div>
  );
};

export default TeacherContentCourses;
