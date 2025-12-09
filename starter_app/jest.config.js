import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './', // load next.config + env from project root
});

const customJestConfig = {
  // Path to setup file
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',

  // Map @/... to src/app/...
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/app/utils/$1',
  },

  // Coverage – point to real paths
  collectCoverageFrom: [
    'src/app/components/**/*.{js,jsx,ts,tsx}',
    'src/app/utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],

  // Tests location
  testMatch: [
    'src/app/tests/**/*.[jt]s?(x)',
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(customJestConfig);
