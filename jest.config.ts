// import nextJest from "next/jest.js";
// import type { Config } from "jest";

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: "./",
// });

// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.ts", "./mocks/mockServer.ts"], // Optional, if you need to setup jest-dom globally
//   moduleNameMapper: {
//     "\\.(css|scss)$": "identity-obj-proxy",
//     '@/auth': '<rootDir>/mocks/auth.ts',
// 		'next-auth/providers/credentials':
// 			'<rootDir>/mocks/next-auth-providers-credentials.ts',
// 		'next-auth': '<rootDir>/mocks/next-auth.ts',
//     "msw": "<rootDir>/node_modules/msw",
//   },
// };

// export default createJestConfig(config);

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "<rootDir>/mocks/mockServer.ts",
  ],

  testEnvironment: "jsdom",

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "@/auth": "<rootDir>/mocks/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/mocks/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/mocks/next-auth.ts",
  },
};

export default createJestConfig(config);
