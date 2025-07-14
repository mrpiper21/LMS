export default {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'IE 11',
        'Edge >= 12',
        'Chrome >= 60',
        'Firefox >= 60',
        'Safari >= 12'
      ]
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': true,
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    }
  }
} 