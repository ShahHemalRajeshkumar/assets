const teacherIndex = process.env.ALGOLIA_TEACHERINDEX;

export default function handler(req, res) {
  const isProd = teacherIndex?.includes('ms_');

  const robots = isProd
    ? `
        User-agent: *
        Disallow:
        Sitemap: https://matchspace-music.ch/sitemap.xml
        Sitemap: https://matchspace-music.ch/sitemap-de-t.xml
        Sitemap: https://matchspace-music.ch/sitemap-de-i.xml
        Sitemap: https://matchspace-music.ch/sitemap-de-c.xml
        Sitemap: https://matchspace-music.ch/sitemap-en-t.xml
        Sitemap: https://matchspace-music.ch/sitemap-en-i.xml
        Sitemap: https://matchspace-music.ch/sitemap-en-c.xml
        Sitemap: https://matchspace-music.ch/sitemap-jobs.xml
        Sitemap: https://matchspace-music.ch/sitemap-en-ts.xml
        Sitemap: https://matchspace-music.ch/sitemap-de-ts.xml
        Sitemap: https://matchspace-music.ch/sitemap-mzo.xml
      `
    : `
        User-agent: *
        Disallow:
        Allow: /
        Sitemap: ${process.env.SITEMAP_URL}/sitemap.xml
      `;

  res.send(robots);
}
