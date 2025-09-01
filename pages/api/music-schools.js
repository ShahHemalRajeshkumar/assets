export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
  const url = process.env.MATCHSPACE_PROD || 'https://staging.matchspace.click'
  try {
    const response = await fetch(
      `${url}/api/v1/auth_ms/music_school/school_regions?organization=mzo`
    );
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error loading instrument locations:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
}
