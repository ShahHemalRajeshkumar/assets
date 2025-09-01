import cx from 'classnames';
import { useMemo } from 'react';
import Image from 'next/image';
import ShowMoreText from '../../ShowMoreText';
import ExperienceLogo from '../../../icons/ExperienceLogo.png';

const TeacherAssociationsItem = ({ data, language = 'ch-en', isLast = false, isPopup }) => {
  // @TODO Association logo
  const imageSrc = data?.logo_url || ExperienceLogo;
  const langKey = useMemo(() => language?.split('-')[1] || 'en', [language]);

  return (
    <div
      className={cx('teacher-experience-item', {
        'teacher-experience-item__last': isLast,
      })}>
      <Image width={48} height={48} alt='' src={imageSrc} objectFit='contain' />
      <div>
        <h3 className='font-bold text-[15px] mb-1 tx-primary'>{data?.short_name[langKey]}</h3>
        <div className='text-12px mb-2 tx-secondary'>{data?.name[langKey]}</div>
        <div className='text-14px font-normal tx-secondary break-all pr-2'>
          <ShowMoreText
            maxLength={280}
            language={language}
            isNormalFormat={!isPopup}
            text={data?.description[langKey] || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherAssociationsItem;
