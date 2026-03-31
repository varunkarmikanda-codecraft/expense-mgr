import * as readline from 'node:readline';
import { stdin as input, stdout as output } from "node:process";
import type { ValidatorFn } from '../core/validators/validator.type.js';

const rl = readline.createInterface({ input, output })

export interface AskOptions {
  defaultAnswer?: string | undefined;
  validator?: ValidatorFn | undefined;
}

export const ask = async (question: string, options?: AskOptions) => {
  const { defaultAnswer, validator } = options || {};

    return new Promise((resolve) => {
        rl.question(defaultAnswer ? `${question} (${defaultAnswer}) ` : `${question} `, (answer: string) => {
            if (validator && !validator(answer)) {
                console.log('Invalid input. Please try again.');
                return resolve(ask(question, { defaultAnswer: defaultAnswer, validator: validator }));
            }
            resolve(answer || defaultAnswer);
        });
    });
}

export interface Choice {
  label: string;
  value: string;
}

export const choose = async (question: string, choices: Choice[]) => {
  console.log(question);
  choices.forEach((choice) => {
    console.log(`${choice.value}. ${choice.label}`);
  })
  const validator: ValidatorFn = (input: string) => {
    return choices.some(choice => choice.value.toLowerCase() === input.toLowerCase());
  }
  return ask('Please enter a choice', { validator });
}

