module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1'
    },
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ]
};
