import type { ValidatorFn } from "./validator.type.js";

export const number: ValidatorFn = (input: number) => {
  return !isNaN(input);
}