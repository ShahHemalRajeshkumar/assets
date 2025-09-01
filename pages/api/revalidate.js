export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (req.query.slug) {
    try {
      console.info('revalidate slug', req.query.slug);
      await res.revalidate(req.query.slug);
      return res.json({
        revalidated: true,
        pages: [req.query.slug],
      });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  }
}
