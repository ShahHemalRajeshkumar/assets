import cx from 'classnames';
import ThumbsUpIcon from '../icons/ThumbsUp.svg';
import useWindowSize from '../../hooks/useWindowSize';
import { translateENtoDE } from '../../functions/translator';
import CertifiedTeacher from '../icons/CertifiedTeacher.svg';
import TeacherEducation from '../icons/TeacherEducation.svg';
import QualifiedMusician from '../icons/QualifiedMusician.svg';
import CertifiedMusician from '../icons/CertifiedMusician.svg';

const TeacherLabelWithLikes = ({ isCard, isInfo, likes, language, teacherType, isOneRow }) => {
  const { width } = useWindowSize();

  if (!teacherType) {
    return null;
  }

  const labels = {
    certified_teacher: {
      icon: <CertifiedTeacher className='mr-2' />,
      label: translateENtoDE('Certified Teacher', language)?.trim(),
    },
    verified_talent: {
      icon: <TeacherEducation className='mr-2' />,
      label: translateENtoDE('Teacher in Education', language)?.trim(),
    },
    professional_musician: {
      icon: <QualifiedMusician className='mr-2' />,
      label: translateENtoDE('Qualified Musican', language)?.trim(),
    },
    certified_musician: {
      icon: <CertifiedMusician className='mr-2' />,
      label: translateENtoDE('Certified Musician', language)?.trim(),
    },
  };

  return (
    <div
      className={cx('teacher-label-row tx-primary', {
        'teacher-label-row__one': isOneRow,
        'teacher-label-row-media': isOneRow && (width < 550 || (width > 1100 && width < 1200)),
        'teacher-label-row-info': isInfo,
      })}>
      <div
        className={cx('teacher-label-item leading-21px', {
          'teacher-label-item__one mr-1': isOneRow,
          'mr-[8px]': isOneRow && !!likes,
        })}>
        <div className='cursor-pointer' title={labels[teacherType]?.label}>
          {labels[teacherType]?.icon}
        </div>
        <div className='pr-2'>{labels[teacherType]?.label}</div>
      </div>
      {isOneRow && !!likes && <div className='teacher-label-item__border ml-1 mr-0.5' />}
      {!!likes && (
        <div
          className={cx('teacher-label-item leading-21px', {
            'ml-2': !isOneRow,
            'teacher-label-item__one': isOneRow,
          })}>
          <ThumbsUpIcon className='mr-1.5' />
          <div className={cx('mr-[6px]', { 'mt-[3px]': isCard })}>{likes}</div>
          {isCard ? (
            <div className='w-[5px] h-[5px]' />
          ) : (
            <div className='teacher-label-item-icon mr-3'>
              {translateENtoDE(likes === 1 ? 'Recommendation' : 'Recommendations', language)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherLabelWithLikes;
