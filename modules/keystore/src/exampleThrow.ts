import { assert } from "console";
import { NotFoundError } from "./";

try {
  throw new NotFoundError("Here is my message");
} catch (err) {
  assert(err instanceof NotFoundError);
  assert(err.message === "Here is my message");
}
console.log("All is well");
