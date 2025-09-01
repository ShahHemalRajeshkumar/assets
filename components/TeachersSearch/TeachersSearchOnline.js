import { useCallback } from 'react';
import { translateENtoDE } from '../../functions/translator';
import WarningIcon from '../icons/warning.svg';
import Switch from './Switch';

const TeachersSearchOnline = ({ label = '', isOnline, setIsOnline, language }) => {
  const switchLabel = translateENtoDE('All Online teachers', language);
  const tooltipText =
    language === 'ch-en'
      ? 'Expand search to include teachers offering online lessons from any location.'
      : 'Erweitere die Suche auf Lehrkräfte, die von jedem Ort aus Online-Unterricht anbieten.';

  const onlineToggle = useCallback(() => {
    if (setIsOnline) setIsOnline(() => !isOnline);
  }, [isOnline, setIsOnline]);

  return (
    <div className='flex items-center justify-between cursor-pointer'>
      <div onClick={onlineToggle} className='flex items-center justify-start'>
        <div className='relative top-[4px] '>
          <Switch checked={isOnline} onSwitch={setIsOnline} />
        </div>

        <div className='text-[15px] tx-secondary font-[500] ml-[8px] select-none'>{label || switchLabel}</div>
      </div>
      <div className='search-online-tooltip ml-[8px]'>
        <WarningIcon />
        <div className='search-online-tooltip-text'>{tooltipText}</div>
      </div>
    </div>
  );
};

export default TeachersSearchOnline;
