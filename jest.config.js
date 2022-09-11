const esModules = [
  'react-native',
  '@react-native',
  'react-router-native',
].join('|');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!((jest-)?${esModules}(-community)?)/)`,
  ],
  moduleNameMapper: {
    'env.json': '<rootDir>/__mocks__/env.json',
  },
};
