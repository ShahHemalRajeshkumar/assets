import axios from "axios";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { organization } = query;
  const url = process.env.MATCHSPACE_PROD || 'https://staging.matchspace.click'

  const baseUrl = `${url}/api/v1/auth_ms/music_school/course_categories?organization=mzo`;

  try {
    const { data } = await axios.get(`${baseUrl}`, {
      params: {
        organization,
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, ':Fatching errro');
    return res.status(500).json({ error: 'Failed to load teacher data.' });;
  }
}