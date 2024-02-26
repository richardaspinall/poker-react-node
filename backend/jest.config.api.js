module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/(handlers|routes|sockets)/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
