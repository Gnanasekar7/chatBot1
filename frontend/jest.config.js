import { defaults } from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios)/)']
};

export default config;