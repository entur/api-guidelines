/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/unit/**/*.test.ts", "**/integration/**/*.test.ts"],
  // Bundling + loading the ruleset can take a moment on the first run.
  testTimeout: 30000,
};
