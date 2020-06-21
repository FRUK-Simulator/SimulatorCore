const { defaults } = require('jest-config');

module.exports = {
    bail: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    roots: ['src'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    verbose: true,
    testEnvironment: 'node',
    timers: 'fake'
};