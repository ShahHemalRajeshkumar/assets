import cx from 'classnames';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { translateENtoDE } from '../../functions/translator';

const ShowMoreText = ({
  onClick,
  language,
  text = '',
  isDisabled,
  maxLength = 100,
  showButtonLabel,
  textClasses = '',
}) => {
  const [visibleText, setVisibleText] = useState(false);

  const showTextHandle = useCallback(() => {
    if (!isDisabled) setVisibleText((value) => !value);
  }, [isDisabled]);

  useEffect(() => {
    setVisibleText(text?.length <= maxLength);
  }, [text, maxLength]);

  const textContent = useMemo(() => {
    if (visibleText) return text;

    const content = text?.slice(0, maxLength).split(' ') || '';

    return `${content.slice(0, content.length - 2).join(' ')} ...`;
  }, [text, visibleText, maxLength]);

  return (
    <div onClick={onClick} className='teacher-content-show-more'>
      <div className={cx('teacher-content-show-more-text', { [textClasses]: !!textClasses })}>
        {textContent}
        {text?.length > maxLength && (
          <div className='text-primary cursor-pointer font-bold text-14px inline-block ml-1' onClick={showTextHandle}>
            {visibleText
              ? language === 'ch-en'
                ? 'Show less'
                : 'Weniger anzeigen'
              : showButtonLabel || translateENtoDE(isDisabled ? 'Show more' : 'Show more', language)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMoreText;
