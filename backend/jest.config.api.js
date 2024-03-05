module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/(handlers|routes|sockets)/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@Tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@Shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@Infra/(.*)$': '<rootDir>/src/infra/$1',
  },
};
