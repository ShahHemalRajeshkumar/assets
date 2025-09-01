import { sortExperienceData } from './helpers';
import TeacherExperienceItem from './TeacherExperienceItem';

const TeacherExperience = ({ data = [], language, isExperience }) => {
  return (
    <>
      {sortExperienceData(data)
        .slice(0, 2)
        .map((item, index) => (
          <TeacherExperienceItem
            data={item}
            key={item?.id}
            language={language}
            isExperience={isExperience}
            isLast={index === data.length - 1}
          />
        ))}
    </>
  );
};

export default TeacherExperience;
