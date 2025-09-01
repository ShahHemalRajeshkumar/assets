module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: 'default'
      }
    } : {})
  }
}