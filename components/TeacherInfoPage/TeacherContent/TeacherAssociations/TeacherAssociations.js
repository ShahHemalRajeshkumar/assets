import TeacherAssociationsItem from './TeacherAssociationsItem';

const TeacherAssociations = ({ data = [], language }) => {
  return (
    <>
      {data.slice(0, 2).map((item, index) => (
        <TeacherAssociationsItem data={item} key={item?.id} language={language} isLast={index === data.length - 1} />
      ))}
    </>
  );
};

export default TeacherAssociations;
