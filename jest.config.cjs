module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // src/appConfig.js reads import.meta.env, which Jest can't parse
    "^(\\.{1,2}/)+appConfig$": "<rootDir>/test-mocks/appConfig.js",
    "\\.(css)$": "<rootDir>/test-mocks/styleMock.js",
    "\\.(svg|png|jpg|jpeg|gif|webp)$": "<rootDir>/test-mocks/fileMock.js",
  },
};
