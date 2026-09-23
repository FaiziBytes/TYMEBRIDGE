import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mod = require("../dist/serverless.cjs");

export default mod.default ?? mod;
