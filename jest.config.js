'use strict';

module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'vue'
  ],

  roots: [
    '<rootDir>/src'
  ],

  testRegex: '(test|__test__)/.*.test.(vue|ts|tsx|js|jsx)?$',

  transform: {
    '^.+.tsx?$': 'babel-jest',
    '^.+.vue$': 'vue-jest'
  },

  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },

  preset: 'ts-jest/presets/js-with-ts',

  transformIgnorePatterns: [
    '/node_modules/(?!(@vue/composition-api)/)/'
  ]
};
