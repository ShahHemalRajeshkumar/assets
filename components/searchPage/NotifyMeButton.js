import { translateENtoDE } from '../../functions/translator';

const NotifyMeButton = ({ language, onClick, sbText, sbClasses }) => {
  const classes = sbClasses ? sbClasses.current : 'search-notify-me-button';

  return (
    <button type='button' onClick={onClick} className={classes}>
      {sbText || translateENtoDE('NOTIFY ME', language)}
    </button>
  );
};

export default NotifyMeButton;
