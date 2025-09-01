import React, { useMemo, useState, useRef, useEffect } from 'react';
import DownArrow from '@/components/icons/DownArrow';
import useOutsideClick from 'hooks/useOutsideClick';
import { translateENtoDE } from 'functions/translator';
import CustomDropdown from '@/components/DropDownMenu';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';

function CoursesSelectField({ courses, courseFilterQuery, handleInstrumentChange, language }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const dropdownRef = useRef(null);
  const { query } = useRouter();
  const { setCourseCategoriesData } = useSchoolPage()
  useOutsideClick(dropdownRef, () => setActiveDropdown(null));

  const allCourseCommonCoursetypes = useMemo(() => {
    if (!courses) return [];
    const map = new Map();
    for (const course of courses) {
      if (!map.has(course?.mzo_course_category_id)) {
        map.set(course?.mzo_course_category_id, course?.mzo_course_category_id);
      }
    }
    return Array.from(map.values());
  }, [courses]);

  const allCourseCommonInstrument = useMemo(() => {
    if (!courses) return [];
    const map = new Map();
    for (const course of courses) {
      if (!map.has(course?.instrument?.id)) {
        map.set(course?.instrument?.id, course);
      }
    }
    return Array.from(map.values());
  }, [courses]);
  const toggleDropdown = (dropdownName, e) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSelect = (name, value, e) => {
    e.stopPropagation();
    handleInstrumentChange({ target: { name, value } });
    setActiveDropdown(null);
  };

  const allOption = { label: translateENtoDE('All Instruments', language), value: '' };

  const sortedInstruments = allCourseCommonInstrument
    ?.map(({ instrument }) => ({
      label: language === 'ch-de' ? instrument?.de : instrument?.en,
      value: instrument?.id,
      key: instrument?.key,
    }))
    .sort((a, b) => a.key.localeCompare(b.key));

  const instrumentOptions = [...sortedInstruments].sort((a, b) => a?.label?.localeCompare(b.label, 'de'));

  const ageOptions = [
    { label: translateENtoDE('Age groups', language), value: '' },
    { label: translateENtoDE('Adults', language), value: 'adults' },
    { label: translateENtoDE('Kids', language), value: 'kids' },
  ];

  async function handlGetCourseCategories() {
    try {
      const { data } = await axios.get('/api/getCourseCategories', {
        params: {
          organization: query?.organization,
        },
      });
      const Categories = data?.data?.map((item) => {
        return { ...item, label: language == 'ch-en' ? item?.name?.en : item?.name?.de, value: item?.id };
      });
      const findCoursetypeByCourses = Categories.map((item) =>
        allCourseCommonCoursetypes?.includes(item?.id) ? item : null
      ).filter(Boolean);
      setCourseCategoriesData(data?.data)
      setCourseCategories([...findCoursetypeByCourses].sort((a, b) => a?.label?.localeCompare(b.label, 'de')));
    } catch (error) {
      console.error('Error fetching Course Categories:', error.message);
    }
  }
  useEffect(() => {
    handlGetCourseCategories();
  }, [query]);
  return (
    <div
      ref={dropdownRef}
      className='grid grid-cols-2 sm:grid-cols-3 gap-4 sm:flex items-center justify-end w-full sm:ml-auto sm:max-w-[400px] [&>*:nth-child(1)]:col-span-2 sm:[&>*:nth-child(1)]:col-span-1'>
      <CustomDropdown
        label={
          courseFilterQuery?.courseType == ''
            ? translateENtoDE('Course type', language)
            : courseCategories.find((item) => item?.id == courseFilterQuery?.courseType)?.label
        }
        selectedValue={courseFilterQuery?.courseType || ''}
        options={[{ label: translateENtoDE('Course type', language), value: '' }, ...courseCategories]}
        isOpen={activeDropdown === 'courseType'}
        onToggle={(e) => toggleDropdown('courseType', e)}
        onSelect={(value, e) => handleSelect('courseType', value, e)}
      />

      <CustomDropdown
        label={
          courseFilterQuery?.instrument
            ? sortedInstruments.find((inst) => inst?.value === courseFilterQuery.instrument)?.label ||
              translateENtoDE('Instrument', language)
            : translateENtoDE('All Instruments', language)
        }
        selectedValue={courseFilterQuery?.instrument || ''}
        options={[allOption, ...instrumentOptions]}
        isOpen={activeDropdown === 'instrument'}
        onToggle={(e) => toggleDropdown('instrument', e)}
        onSelect={(value, e) => handleSelect('instrument', value, e)}
      />

      <CustomDropdown
        label={
          translateENtoDE(
            courseFilterQuery?.age?.replace(/^./, (c) => c.toUpperCase()),
            language
          ) || translateENtoDE('Age groups', language)
        }
        selectedValue={courseFilterQuery?.age || ''}
        options={ageOptions}
        isOpen={activeDropdown === 'age'}
        onToggle={(e) => toggleDropdown('age', e)}
        onSelect={(value, e) => handleSelect('age', value, e)}
      />
    </div>
  );
}

export default CoursesSelectField;



