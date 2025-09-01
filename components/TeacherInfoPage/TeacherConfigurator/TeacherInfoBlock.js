import cx from 'classnames';
import Image from 'next/image';
import ShareIcon from '../../icons/Share.svg';
import { translateENtoDE } from '../../../functions/translator';
import ChevronRightIcon from '../../icons/ChevronRightPrimary.svg';

const TeacherInfoBlock = ({
  course,
  teacher,
  language,
  showPopup,
  isCoursePopup,
  contactInfoRef,
  isConfigurator,
  shareLinkHandle,
}) => {
  const contactHandle = () => {
    showPopup('contact', { course, isConfigurator });
  };

  return (
    <div
      ref={contactInfoRef}
      className={cx('teacher-info-block', {
        // 'teacher-info-block-booked': isCoursePopup,
      })}>
      {!!teacher?.avatar_path ? (
        <Image width='56px' height='56px' alt={teacher?.name} className='rounded-full' src={teacher?.avatar_path} />
      ) : (
        <div className='w-14 h-14 rounded-full bg-slate-400' />
      )}

      <div>
        <h2 className='font-bold text-16px mb-1'>{teacher?.name}</h2>
        <button
          type='button'
          onClick={contactHandle}
          data-test='configurator-check-availability-btn'
          className='flex items-center text-14px font-bold text-primary uppercase cursor-pointer'>
          {translateENtoDE('CONTACT ME', language)}
          <ChevronRightIcon className='ml-1' />
        </button>
      </div>
      {!!shareLinkHandle && (
        <div className='cursor-pointer' onClick={shareLinkHandle} data-test='configurator-share-btn'>
          <ShareIcon />
        </div>
      )}
    </div>
  );
};

export default TeacherInfoBlock;
