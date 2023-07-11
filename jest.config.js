const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  verbose: true,
  coverageReporters: ['json', 'lcov'],
  collectCoverage: true,

  coveragePathIgnorePatterns: ['<rootDir>/src/libs/'],
}

module.exports = createJestConfig(config)
