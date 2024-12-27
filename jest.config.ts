// eslint-disable-next-line import/no-anonymous-default-export
export default {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "babel-jest",
            { configFile: "./babel.config.tes.js" },
        ],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../libs/ui",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
};
