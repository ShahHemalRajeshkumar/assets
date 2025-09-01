// require('dotenv').config();

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({
//   productionBrowserSourceMaps: false,
//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//     esmExternals: true,
//     modularizeImports: {
//       '@mui/icons-material': {
//         transform: '@mui/icons-material/{{member}}',
//       },
//       lodash: {
//         transform: 'lodash/{{member}}',
//       },
//     },
//   },
//   swcMinify: true,
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: false,
//   trailingSlash: false,
//   cleanDistDir: true,
//   env: {
//     ALGOLIA_URL: process.env.ALGOLIA_URL,
//     ALGOLIA_SEARCHAPPID: process.env.ALGOLIA_SEARCHAPPID,
//     ALGOLIA_SEARCHAPIKEY: process.env.ALGOLIA_SEARCHAPIKEY,
//     ALGOLIA_TEACHERINDEX: process.env.ALGOLIA_TEACHERINDEX,
//     ALGOLIA_TEACHERINDEX_SW: process.env.ALGOLIA_TEACHERINDEX_SW,
//     ALGOLIA_TEACHERINDEX_PAGE: process.env.ALGOLIA_TEACHERINDEX_PAGE,
//     ALGOLIA_TEACHERINDEX_EVTA: process.env.ALGOLIA_TEACHERINDEX_EVTA,
//     ALGOLIA_TEACHERINDEX_SITEMAP: process.env.ALGOLIA_TEACHERINDEX_SITEMAP,
//     ALGOLIA_TEACHERINDEX_INSTRUMENT: process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT,
//     ALGOLIA_COURSEINDEX: process.env.ALGOLIA_COURSEINDEX,
//     ALGOLIA_RECOMMENDATION_INDEX: process.env.ALGOLIA_RECOMMENDATION_INDEX,
//     ALGOLIA_INSTRUMENTS: process.env.ALGOLIA_INSTRUMENTS,
//     ALGOLIA_TEACHERINDEX_INSTRUMENT: process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT,
//     NEXT_PUBLIC_BUGSNAG_API_KEY: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
//     MATCHSPACE_FORM_CONTACT: process.env.MATCHSPACE_FORM_CONTACT,
//     MATCHSPACE_CHECKOUT: process.env.MATCHSPACE_CHECKOUT,
//     MATCHSPACE_CONTACT: process.env.MATCHSPACE_CONTACT,
//     MATCHSPACE_GIFT: process.env.MATCHSPACE_GIFT,
//     COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
//     PABBLY_WAIT_URL: process.env.PABBLY_WAIT_URL,
//     PABBLY_SEARCH_URL: process.env.PABBLY_SEARCH_URL,
//     PABBLY_CALLBACK_URL: process.env.PABBLY_CALLBACK_URL,
//     PABBLY_CONTACT_LATER_URL: process.env.PABBLY_CONTACT_LATER_URL,
//     MATCHSPACE_FORM_ID_EN: process.env.MATCHSPACE_FORM_ID_EN,
//     MATCHSPACE_FORM_ID_DE: process.env.MATCHSPACE_FORM_ID_DE,
//     SITEMAP_URL: process.env.SITEMAP_URL,
//     GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
//     GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
//     MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
//     MATCHSPACE_PREPROD: process.env.MATCHSPACE_PREPROD,
//     MATCHSPACE_PROD: process.env.MATCHSPACE_PROD,
//     STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
//     STORYBLOK_VERSION: process.env.STORYBLOK_VERSION,
//   },
//   images: {
//     loader: 'default',
//     dangerouslyAllowSVG: true,
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//     domains: [
//       'a.storyblok.com',
//       'images.selise.club',
//       'static.wixstatic.com',
//       'clapp.ams3.digitaloceanspaces.com',
//       'cnc-images.fra1.digitaloceanspaces.com',
//       'preiatmatchspace.s3.eu-west-3.amazonaws.com',
//       'cncprodgrifendor.fra1.digitaloceanspaces.com',
//       'mspproduction.s3.eu-west-3.amazonaws.com',
//       'd1qzgjer0zdepi.cloudfront.net',
//       's3.eu-west-3.amazonaws.com',
//       'mspstaging.s3.eu-west-3.amazonaws.com',
//       'dv2zl4fctjeos.cloudfront.net',
//       'mspstaging.s3.amazonaws.com',
//       'i.ytimg.com',
//       'i.vimeocdn.com',
//       'i0.wp.com',
//       'www.billboard.com',
//       'drive.google.com',
//       'drive.usercontent.google.com',
//       'matchspace-music.ch',
//       'www.youtube.com',
//       'img.youtube.com',
//     ],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     formats: ['image/avif', 'image/webp'],
//     minimumCacheTTL: 86400,
//   },
//   staticPageGenerationTimeout: 30000,
//   outputFileTracing: true,
//   onDemandEntries: {
//     maxInactiveAge: 60 * 1000,
//     pagesBufferLength: 2,
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production',
//     styledComponents: true,
//   },
//   optimizeFonts: true,
//   httpAgentOptions: {
//     keepAlive: true,
//   },
//   reactStrictMode: true,

//   async rewrites() {
//     return [
//       {
//         source: '/robots.txt',
//         destination: '/api/robots',
//       },
//     ];
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   async headers() {
//     return [
//       {
//         source: '/_next/image(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//       {
//         source: '/_next/static/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=3600, must-revalidate',
//           },
//           {
//             key: 'Content-Security-Policy',
//             value:
//               "frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://conversations-widget.brevo.com https://core.service.elfsight.com https://monitor.fraudblocker.com https://api.mapbox.com; connect-src 'self' https://www.google-analytics.com https://conversations-widget.brevo.com https://core.service.elfsight.com https://api.mapbox.com https://events.mapbox.com; img-src 'self' data: https: https://api.mapbox.com; style-src 'self' 'unsafe-inline' https://api.mapbox.com; worker-src 'self' blob:;",
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'SAMEORIGIN',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//           {
//             key: 'Permissions-Policy',
//             value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
//           },
//         ],
//       },
//     ];
//   },

//   webpack(config, { dev, isServer }) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     });

//     if (!isServer) {
//       config.devtool = dev ? 'eval-source-map' : false;
//     }

//     if (!dev) {
//       config.optimization.minimize = true;
//       config.optimization.usedExports = true;
//       config.optimization.sideEffects = false;
//       config.optimization.splitChunks = {
//         chunks: 'all',
//         cacheGroups: {
//           styles: {
//             name: 'styles',
//             test: /\.(css|scss|sass)$/,
//             chunks: 'all',
//             enforce: true,
//           },
//           vendor: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             chunks: 'all',
//             maxSize: 244000,
//           },
//           common: {
//             minChunks: 2,
//             chunks: 'all',
//             enforce: true,
//             maxSize: 244000,
//           },
//           mapbox: {
//             test: /[\\/]node_modules[\\/]mapbox-gl[\\/]/,
//             name: 'mapbox',
//             chunks: 'async',
//             enforce: true,
//           },
//         },
//       };
//     }

//     return config;
//   },
// });
require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    esmExternals: true,
    legacyBrowsers: false,        
    browsersListForSwc: true,     
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false,
  cleanDistDir: true,
  env: {
    ALGOLIA_URL: process.env.ALGOLIA_URL,
    ALGOLIA_SEARCHAPPID: process.env.ALGOLIA_SEARCHAPPID,
    ALGOLIA_SEARCHAPIKEY: process.env.ALGOLIA_SEARCHAPIKEY,
    ALGOLIA_TEACHERINDEX: process.env.ALGOLIA_TEACHERINDEX,
    ALGOLIA_TEACHERINDEX_SW: process.env.ALGOLIA_TEACHERINDEX_SW,
    ALGOLIA_TEACHERINDEX_PAGE: process.env.ALGOLIA_TEACHERINDEX_PAGE,
    ALGOLIA_TEACHERINDEX_EVTA: process.env.ALGOLIA_TEACHERINDEX_EVTA,
    ALGOLIA_TEACHERINDEX_SITEMAP: process.env.ALGOLIA_TEACHERINDEX_SITEMAP,
    ALGOLIA_TEACHERINDEX_INSTRUMENT: process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT,
    ALGOLIA_COURSEINDEX: process.env.ALGOLIA_COURSEINDEX,
    ALGOLIA_RECOMMENDATION_INDEX: process.env.ALGOLIA_RECOMMENDATION_INDEX,
    ALGOLIA_INSTRUMENTS: process.env.ALGOLIA_INSTRUMENTS,
    ALGOLIA_TEACHERINDEX_INSTRUMENT: process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT,
    NEXT_PUBLIC_BUGSNAG_API_KEY: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
    MATCHSPACE_FORM_CONTACT: process.env.MATCHSPACE_FORM_CONTACT,
    MATCHSPACE_CHECKOUT: process.env.MATCHSPACE_CHECKOUT,
    MATCHSPACE_CONTACT: process.env.MATCHSPACE_CONTACT,
    MATCHSPACE_GIFT: process.env.MATCHSPACE_GIFT,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    PABBLY_WAIT_URL: process.env.PABBLY_WAIT_URL,
    PABBLY_SEARCH_URL: process.env.PABBLY_SEARCH_URL,
    PABBLY_CALLBACK_URL: process.env.PABBLY_CALLBACK_URL,
    PABBLY_CONTACT_LATER_URL: process.env.PABBLY_CONTACT_LATER_URL,
    MATCHSPACE_FORM_ID_EN: process.env.MATCHSPACE_FORM_ID_EN,
    MATCHSPACE_FORM_ID_DE: process.env.MATCHSPACE_FORM_ID_DE,
    SITEMAP_URL: process.env.SITEMAP_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    MATCHSPACE_PREPROD: process.env.MATCHSPACE_PREPROD,
    MATCHSPACE_PROD: process.env.MATCHSPACE_PROD,
    STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
    STORYBLOK_VERSION: process.env.STORYBLOK_VERSION,
  },
  images: {
    loader: 'default',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'a.storyblok.com',
      'images.selise.club',
      'static.wixstatic.com',
      'clapp.ams3.digitaloceanspaces.com',
      'cnc-images.fra1.digitaloceanspaces.com',
      'preiatmatchspace.s3.eu-west-3.amazonaws.com',
      'cncprodgrifendor.fra1.digitaloceanspaces.com',
      'mspproduction.s3.eu-west-3.amazonaws.com',
      'd1qzgjer0zdepi.cloudfront.net',
      's3.eu-west-3.amazonaws.com',
      'mspstaging.s3.eu-west-3.amazonaws.com',
      'dv2zl4fctjeos.cloudfront.net',
      'mspstaging.s3.amazonaws.com',
      'i.ytimg.com',
      'i.vimeocdn.com',
      'i0.wp.com',
      'www.billboard.com',
      'drive.google.com',
      'drive.usercontent.google.com',
      'matchspace-music.ch',
      'www.youtube.com',
      'img.youtube.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  staticPageGenerationTimeout: 30000,
  outputFileTracing: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  optimizeFonts: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://conversations-widget.brevo.com https://core.service.elfsight.com https://monitor.fraudblocker.com https://api.mapbox.com; connect-src 'self' https://www.google-analytics.com https://conversations-widget.brevo.com https://core.service.elfsight.com https://api.mapbox.com https://events.mapbox.com; img-src 'self' data: https: https://api.mapbox.com; style-src 'self' 'unsafe-inline' https://api.mapbox.com; worker-src 'self' blob:;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.devtool = dev ? 'eval-source-map' : false;
    }

    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 20,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|scss|sass)$/,
            chunks: 'all',
            enforce: true,
            maxSize: 150000,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          mapbox: {
            test: /[\\/]node_modules[\\/]mapbox-gl[\\/]/,
            name: 'mapbox',
            chunks: 'async',
            enforce: true,
            priority: 15,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 200000,
            priority: 10,
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            maxSize: 150000,
            priority: 5,
          },
        },
      };
    }

    return config;
  },
});
