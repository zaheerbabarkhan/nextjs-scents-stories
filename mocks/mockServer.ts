import { setupServer } from "msw/node";
import { handlers } from "./handlers";

console.log("this is setupServer", setupServer);
export const server = setupServer(...handlers);
