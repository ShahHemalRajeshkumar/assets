import CustomDropdown from '@/components/DropDownMenu';
import DownArrow from '@/components/icons/DownArrow';
import { translateENtoDE } from 'functions/translator';
import useOutsideClick from 'hooks/useOutsideClick';
import React, { useMemo, useRef, useState } from 'react';

function TeacherFilterField({ data, teacherFilterQuery, handleInstrumentChange, language }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setActiveDropdown(null));

  const allTeacherCommonInstrument = useMemo(() => {
    const allInstruments = data?.flatMap((teacher) => teacher.instruments) || [];
    return Array.from(new Map(allInstruments.map((inst) => [inst?.key, inst])).values());
  }, [data]);

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleSelect = (name, value, e) => {
    e.stopPropagation();
    handleInstrumentChange(name, value);
    setActiveDropdown(null);
  };

  const allOption = { label: translateENtoDE('All Instruments', language), value: '' };

  const sortedInstruments = allTeacherCommonInstrument.map((instrument) => ({
    label: language === 'ch-de' ? instrument.de : instrument.en,
    value: instrument?.id,
    key: instrument.key,
  }));

  const instrumentOptions = [...sortedInstruments].sort((a, b) => a.label.localeCompare(b.label, 'de'));

  const ageOptions = [
    { label: translateENtoDE('Age groups', language), value: '' },
    { label: translateENtoDE('Adults', language), value: 'adults' },
    { label: translateENtoDE('Kids', language), value: 'kids' },
  ];

  const selectedInstrumentName = teacherFilterQuery?.instrument
    ? allTeacherCommonInstrument.find((inst) => String(inst?.id) === String(teacherFilterQuery.instrument))?.[
        language === 'ch-de' ? 'de' : 'en'
      ] ?? translateENtoDE('Instruments', language)
    : translateENtoDE('All Instruments', language);

  const selectedAgeName = teacherFilterQuery?.age
    ? translateENtoDE(
        teacherFilterQuery.age.replace(/^./, (c) => c.toUpperCase()),
        language
      )
    : translateENtoDE('Age groups', language);

  return (
    <div ref={dropdownRef} className='flex xs:flex-row flex-col gap-3 w-full justify-end '>
      <CustomDropdown
        label={selectedInstrumentName}
        selectedValue={teacherFilterQuery?.instrument || ''}
        options={[allOption, ...instrumentOptions]}
        isOpen={activeDropdown === 'instrument'}
        onToggle={(e) => toggleDropdown('instrument', e)}
        onSelect={(value, e) => handleSelect('instrument', value, e)}
      />

      <CustomDropdown
        label={selectedAgeName}
        selectedValue={teacherFilterQuery?.age || ''}
        options={ageOptions}
        isOpen={activeDropdown === 'age'}
        onToggle={(e) => toggleDropdown('age', e)}
        onSelect={(value, e) => handleSelect('age', value, e)}
      />
    </div>
  );
}

export default TeacherFilterField;
