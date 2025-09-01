import cx from 'classnames';
import { sortExperienceData } from './helpers';
import useWindowSize from '../../../../hooks/useWindowSize';
import TeacherExperienceItem from './TeacherExperienceItem';

const TeacherListPopup = ({ name, language, data = [] }) => {
  const { width } = useWindowSize();

  return (
    <div className={cx(`teacher-page-popup-${name} visible-scrollbar`, { 'pb-18': width < 768 })}>
      {sortExperienceData(data).map((item, index) => (
        <TeacherExperienceItem
          data={item}
          key={item?.id}
          isPopup={true}
          language={language}
          isLast={index === data.length - 1}
          isExperience={name === 'experience'}
        />
      ))}
    </div>
  );
};

export default TeacherListPopup;
