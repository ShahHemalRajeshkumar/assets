import axios from 'axios';

export async function handleGetCourseDetail(organization, id) {
  const baseUrl = 'https://staging.matchspace.click/api/v1/auth_ms/music_school/teacher';

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        organization,
        mzo_course_id: id,
      },
    });
    return response;
  } catch (err) {
    console.error('Failed to fetch Course data:', err);
    throw err;
  }
}
