/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/rules/**/*.test.ts", "**/*.test.ts"],
  // Bundling + loading the ruleset can take a moment on the first run.
  testTimeout: 30000,
};
