/**
 * Backend Test Configuration
 * 
 * To set up testing:
 * 1. Install: npm install --save-dev jest babel-jest @babel/preset-env
 * 2. Create tests in __tests__ or .test.js files
 * 3. Run: npm test
 */

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: [
    'routes/**/*.js',
    'controllers/**/*.js',
    'middleware/**/*.js',
    'models/**/*.js',
    'utils/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
