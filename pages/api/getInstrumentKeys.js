import axios from 'axios';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Please use GET.' });
  }

  const { organization = 'mzo' } = query;
    const url = process.env.MATCHSPACE_PROD || 'https://staging.matchspace.click'
  const baseUrl =`${url}/api/v1/auth_ms/music_school/instruments_keys`;

  try {
    const { data } = await axios.get(baseUrl, {
      params: { organization },
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching instrument keys:', error?.message || error);

    return res.status(500).json({
      error: 'Failed to load instrument data. Please try again later.',
    }); 
  }
}
