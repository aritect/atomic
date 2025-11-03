import { customAlphabet } from "nanoid";

const createId = () => customAlphabet("1234567890abcdef", 16)();

export { createId };
