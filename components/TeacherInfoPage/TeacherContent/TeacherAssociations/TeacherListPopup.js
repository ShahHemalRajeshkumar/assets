import cx from 'classnames';
import useWindowSize from '../../../../hooks/useWindowSize';
import TeacherAssociationsItem from './TeacherAssociationsItem';

const TeacherListPopup = ({ name, language, data = [] }) => {
  const { width } = useWindowSize();

  return (
    <div className={cx(`teacher-page-popup-${name} visible-scrollbar`, { 'pb-18': width < 768 })}>
      {data.map((item, index) => (
        <TeacherAssociationsItem
          data={item}
          key={item?.id}
          isPopup={true}
          language={language}
          isLast={index === data.length - 1}
        />
      ))}
    </div>
  );
};

export default TeacherListPopup;
