import WarningIcon from '../../icons/warning.svg';

const TeachersFilterOnline = ({ language }) => {
  const tooltipText =
    language === 'ch-en'
      ? 'Expand search to include teachers offering online lessons from any location.'
      : 'Erweitere die Suche auf Lehrkräfte, die von jedem Ort aus Online-Unterricht anbieten.';

  return (
    <div className='search-online-tooltip ml-[8px]'>
      <WarningIcon />
      <div className='search-online-tooltip-text'>{tooltipText}</div>
    </div>
  );
};

export default TeachersFilterOnline;
