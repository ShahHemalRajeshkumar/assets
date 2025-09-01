import axios from 'axios';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { mzo_teacher_id, organization } = query;
  if (!mzo_teacher_id) {
    return res.status(400).json({ error: 'Missing mzo_teacher_id in query params.' });
  }
  if (!organization) {
    return res.status(400).json({ error: 'Missing organization in query params.' });
  }
  const url = process.env.MATCHSPACE_PROD || 'https://staging.matchspace.click'
  const baseUrl = `${url}/api/v1/auth_ms/music_school/teacher`;

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        organization,
        mzo_teacher_id,
      },
    });
    return res.status(200).json({ data: response?.data?.teacher });
  } catch (error) {
    console.log(error,":Fatching errro")
    return res.status(500).json({ error: 'Failed to load teacher data.' });
  }
}
