import cx from 'classnames';
import React, { useMemo, useCallback } from 'react';
import Check from '../../icons/check.svg';

const TeacherFilterCheckbox = ({
  name,
  type,
  value,
  label,
  setValue,
  isOnline,
  isGenres,
  labelInfo,
  isLanguage,
  // extraLabel,
  setIsOnline,
  extraClasses,
  setFilterParams,
}) => {
  const isChecked = useMemo(() => {
    if (isGenres) return value?.includes(name);
    if (isLanguage) return value?.includes(name);

    return value;
  }, [name, value, isGenres, isLanguage]);

  const checkboxHandle = useCallback(() => {
    const newValue = !isChecked;

    if (isLanguage || isGenres) {
      const fieldKey = isGenres ? 'genres' : 'languages';
      const data = isChecked ? value.filter((item) => item !== name) : [...value, name];

      setValue(fieldKey, data);
      setFilterParams((values) => ({ ...values, [fieldKey]: data }));
    } else {
      if (name === 'online' && newValue !== isOnline) {
        setIsOnline && setIsOnline(newValue);
      }
      setValue(name, newValue);
      if (newValue) setFilterParams((values) => ({ ...values, [type]: name }));
    }
  }, [name, type, value, isOnline, isChecked, isGenres, setIsOnline, isLanguage, setValue, setFilterParams]);

  return (
    <div className={cx('teacher-filter-checkbox', { [extraClasses]: !!extraClasses })}>
      <div className='flex items-center cursor-pointer'>
        <div
          id={`checkbox-${name}`}
          onClick={checkboxHandle}
          className={cx('ask-checkbox', {
            'ask-checkbox-active': !!isChecked,
          })}>
          {!!isChecked && <Check />}
        </div>
        <div className='flex items-center'>
          <p className='teacher-filter-checkbox-label'>{label}</p>
          {/* {!!extraLabel && <>{extraLabel}</>} */}
        </div>
      </div>
      {!!labelInfo && <p className='teacher-filter-checkbox-info'>{labelInfo}</p>}
    </div>
  );
};

export default TeacherFilterCheckbox;
