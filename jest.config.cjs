module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(tsparticles|react-tsparticles)/)"
    ],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS modules
        "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock image imports
        "^react-tsparticles$": "<rootDir>/__mocks__/tsparticles.js", // Add this line

    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
