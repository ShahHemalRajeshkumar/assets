import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getStory } from '../../../../utils/getStory';
import TeacherInfo from '../../../../components/TeacherInfoPage';
import { getAlgoliaData, getTeacherInfo } from '../../../../utils/algolia';
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
export async function getStaticProps({ params }) {
  let likesList = [];
  let coursesList = [];

  const teacher = await getTeacherInfo(params?.id);
  const story = await getStory(`/${params.language}`);

  if (!teacher || !teacher?.uuid) {
    return {
      redirect: {
        permanent: false,
        destination: `/${params.language}/?teachers=notfound`,
      },
    };
  }

  if (teacher?.uuid) {
    likesList = await getAlgoliaData({ type: 'likes', id: teacher?.uuid });
    coursesList = await getAlgoliaData({ type: 'courses', id: teacher?.uuid });
  }
  return {
    props: {
      story,
      params,
      userToken: uuidv4(),
      teacher: {
        ...teacher,
        courses: coursesList?.data || [],
        recommendations: likesList?.data?.filter((item) => item?.status !== 'not_published'),
      },
    },
    revalidate: 60, 
  };
}
class TeacherInfoPage extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    return <TeacherInfo {...this.props} />;
  }
}
export default TeacherInfoPage;
