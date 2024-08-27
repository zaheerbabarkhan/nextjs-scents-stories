import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./mocks/mockServer";

import { TextEncoder, TextDecoder } from "util";

console.log("setup running")
Object.assign(global, { TextDecoder, TextEncoder });



// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in individual tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());