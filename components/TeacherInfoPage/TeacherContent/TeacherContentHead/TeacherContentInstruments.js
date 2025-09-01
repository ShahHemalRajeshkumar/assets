import cx from 'classnames';
import { useState, useMemo } from 'react';
import TeacherPopup from '../../TeacherPopup';
import useWindowSize from '../../../../hooks/useWindowSize';

const cutStringTo = (text = '', maxLength = 7) => {
  if (text?.length <= maxLength) return text;

  return `${text?.slice(0, maxLength) || ''}...`;
};

const TeacherContentInstruments = ({ language, instruments = [] }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);

  const shopPopup = () => setShow(true);
  const hidePopup = () => setShow(false);

  const data = useMemo(() => {
    if (width > 768) {
      const sliceIndex = width < 1280 ? (instruments.length === 3 ? 3 : 2) : instruments.length > 4 ? 3 : 4;
      return instruments.slice(0, sliceIndex);
    } else {
      return instruments;
    }
  }, [width, instruments]);

  const textClasses = 'text-14px px-1 font-medium tx-secondary';

  return (
    <div className='teacher-content-instruments-hidden'>
      <div
        className={cx('teacher-content-instruments grid gap-1 justify-end place-content-end', {
          'grid-cols-[116px_116px_116px]': instruments.length === 3,
          'grid-cols-[96px_96px_96px_96px]': instruments.length > 3,
          'grid-cols-[116px] teacher-content-instruments-center': instruments.length === 1,
          'grid-cols-[116px_116px] teacher-content-instruments-center': instruments.length === 2,
        })}>
        {data.map((item, index) => (
          <div key={index} className='teacher-content-instrument select-none cursor-default'>
            <div className='ms_instruments'>
              <div className={`ms_instruments-${String(item?.key).toLowerCase().replace(' ', '_')} text-48px mb-2`} />
            </div>
            <p className={`${textClasses} select-none`} title={language === 'ch-de' ? item.de : item.en}>
              {cutStringTo(language === 'ch-de' ? item.de : item.en)}
            </p>
          </div>
        ))}
        {width > 768 && (instruments.length > 4 || (instruments.length > 3 && width < 1280)) && (
          <div className='teacher-dropdown-wrapper'>
            <div onClick={shopPopup} className='teacher-content-instrument teacher-content-instrument__primary'>
              <p className='text-16px font-bold text-primary'>{`+${instruments.length - (width < 1280 ? 2 : 3)}`}</p>
            </div>
            {show && (
              <div className='teacher-dropdown-instruments'>
                <TeacherPopup onClose={hidePopup} isOnlyWrapper={true}>
                  <div
                    className={cx(`grid gap-[4px] z-10`, {
                      'grid-cols-[96px_96px_96px_96px]': instruments.length === 4,
                      'grid-cols-[96px_96px_96px_96px_96px]': instruments.length === 5,
                      'grid-cols-[96px_96px_96px_96px_96px_96px]': instruments.length >= 6,
                    })}
                    onClick={hidePopup}>
                    {instruments.map((item, index) => (
                      <div key={index} className='teacher-content-instrument select-none cursor-default'>
                        <div className='ms_instruments'>
                          <div
                            className={`ms_instruments-${String(item?.key)
                              .toLowerCase()
                              .replace(' ', '_')} text-48px mb-2`}
                          />
                        </div>
                        <p className={`${textClasses} select-none`} title={language === 'ch-de' ? item.de : item.en}>
                          {cutStringTo(language === 'ch-de' ? item.de : item.en)}
                        </p>
                      </div>
                    ))}
                  </div>
                </TeacherPopup>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherContentInstruments;
