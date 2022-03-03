const presets = [
  [
    '@babel/preset-env', {
      targets: {
        browsers: ['last 3 version and > 1%']
      },
      useBuiltIns: 'usage',
      corejs: '3.21.0'
    }
  ],
  [
    '@babel/react'
  ]
];

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-nullish-coalescing-operator'
];

module.exports = { presets, plugins };
