import cx from 'classnames';
import { useMemo } from 'react';
import { translateENtoDE } from '../../../functions/translator';

const TeacherFilterButtons = ({ form, language, onClose, onReset, filteredList = [], onFilter }) => {
  // const isDisabled = !Object.values(form).includes(true);
  const listLength = useMemo(() => filteredList?.length, [filteredList]);

  return (
    <div className='teacher-filter-buttons'>
      <button type='button' onClick={onReset} className='teacher-filter-buttons-reset'>
        {translateENtoDE('Reset all', language)}
      </button>

      <div className='teacher-filter-buttons-pair'>
        <button
          type='button'
          onClick={onClose}
          className='ml-6 text-[15px] font-medium text-primary uppercase hover:text-dark-primary'>
          {translateENtoDE('Cancel', language)}
        </button>
        <button
          type='button'
          onClick={onFilter}
          disabled={!listLength}
          className={cx('teacher-filter-submit ml-6', {
            'teacher-filter-submit-disabled': !listLength,
          })}>
          {language === 'ch-en' ? `Show ${listLength} result(s)` : `${listLength} Ergebnis(se) anzeigen`}
        </button>
      </div>
    </div>
  );
};

export default TeacherFilterButtons;