module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/db/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src/db'],
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
