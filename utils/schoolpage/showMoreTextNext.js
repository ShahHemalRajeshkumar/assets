import { translateENtoDE } from 'functions/translator';
import { useState } from 'react';

const ShowMoreTextNext = ({ children, maxLength = 150, language, showButtonLabel }) => {
  const [showMore, setShowMore] = useState(false);
  const text = typeof children === 'string' ? children : '';
  const truncateTextByWords = (text, maxLength) => {
    if (text.length <= maxLength) return text;

    const words = text.split(' ');
    let result = '';
    for (let word of words) {
      if ((result + word).length + 1 > maxLength) break;
      result += (result ? ' ' : '') + word;
    }
    return result + '...';
  };

  return (
    <div>
       <p className='text-[15px] text-[#000000AD] leading-[156%] font-Roboto !whitespace-normal inline'>
        {showMore ? text : truncateTextByWords(text, maxLength)}
      </p>
      {text.length > maxLength && (
        <button
          onClick={() => setShowMore(!showMore)}
                 className='ml-1 text-[14px] font-Roboto font-semibold leading-[160%] text-[#21697C] cursor-pointer mt-2  inline-block'>
          <span>
            {showMore
              ? language === 'ch-en'
                ? 'Show less'
                : 'Weniger anzeigen'
              : showButtonLabel || translateENtoDE('Show more', language)}
          </span>
        </button>
      )}
    </div>
  );
};

export default ShowMoreTextNext;
