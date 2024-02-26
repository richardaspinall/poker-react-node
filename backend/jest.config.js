module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/src/handlers', '<rootDir>/src/routes', '<rootDir>/src/sockets'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
