import dayjs from 'dayjs';
import cx from 'classnames';
import Image from 'next/image';
import ShowMoreText from '../../ShowMoreText';
import EducationLogo from '../../../icons/EducationLogo.png';
import ExperienceLogo from '../../../icons/ExperienceLogo.png';
import { translateENtoDE } from '../../../../functions/translator';

const TeacherExperienceItem = ({ data, language, isLast = false, isPopup, isExperience }) => {
  const startDate = dayjs(data?.start_date).year();

  const endDate = isExperience
    ? data?.present
      ? translateENtoDE('Present')
      : dayjs(data?.end_date).year()
    : dayjs(data?.end_date).year();

  const imageAlt = translateENtoDE(isExperience ? 'Musical Experience' : 'Music Education', language);

  const imageSrc = data?.institution?.key
    ? `https://d1qzgjer0zdepi.cloudfront.net/institutions/${data?.institution?.key}.png`
    : isExperience
    ? ExperienceLogo
    : EducationLogo;

  return (
    <div
      className={cx('teacher-experience-item', {
        'teacher-experience-item__last': isLast,
      })}>
      <Image width={48} height={48} alt={imageAlt} src={imageSrc} objectFit='contain' />
      <div>
        <h3 className='font-bold text-[15px] mb-1 tx-primary'>{data.position}</h3>
        <div className='text-12px mb-2 tx-secondary'>{`${startDate} - ${endDate} | ${data?.institution?.name}`}</div>
        <div className='text-14px font-normal tx-secondary break-all pr-2'>
          <ShowMoreText maxLength={280} text={data?.description || ''} language={language} isNormalFormat={!isPopup} />
        </div>
      </div>
    </div>
  );
};

export default TeacherExperienceItem;
