module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS modules
        "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock image imports
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
