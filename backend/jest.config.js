module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/handlers',
    '<rootDir>/src/routes',
    '<rootDir>/src/sockets',
    '<rootDir>/src/db',
  ],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@Tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@Shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@Infra/(.*)$': '<rootDir>/src/infra/$1',
  },
};
