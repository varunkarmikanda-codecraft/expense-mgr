import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

interface Friend {
    name: string;
    email?: string;
    phoneNumber?: number;
    nickname?: string;
    balance: number;
}

type validator = (input: string) => true | String;

const ask = (question: string, validator?: validator, defaultValue?: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(defaultValue ? `${question} (${defaultValue}) ` : `${question} `, (answer: string) => {
            const finalValue = answer.trim() === "" ? defaultValue ?? "" : answer;
            if(validator) {
                const result = validator(finalValue);
                if(result !== true) {
                    console.log(`${result}`);
                    return resolve(ask(question, validator, defaultValue));
                }
            }
            resolve(finalValue);
        })
    })
}

const rl = readline.createInterface({ input, output });

const friends: Friend[] = [];


