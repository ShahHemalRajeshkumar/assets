import axios from "axios";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { organization, mzo_course_id } = query;
  const url = process.env.MATCHSPACE_PROD || 'https://staging.matchspace.click'

  try {
    const { data } = await axios.get(`${url}/api/v1/auth_ms/music_school/course`, {
      params: {
        organization,
        mzo_course_id,
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, ':Fatching errro');
    return res.status(500).json({ error: 'Failed to load teacher data.' });;
  }
}