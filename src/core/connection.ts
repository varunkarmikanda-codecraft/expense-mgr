import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

interface Friend {
  name: string;
  email?: string;
  phoneNumber?: number;
  nickname?: string;
  balance: number;
}

type validator = (input: string) => true | String;

const nameValidator: validator = (val: string) => {
  if (!val || val.trim().length < 2) {
    return "Name/Nickname must be at least 2 characters long!";
  }
  if (val.length > 30) {
    return "Keep it short! Max 30 characters.";
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  if (!nameRegex.test(val)) {
    return "Names can only contain letters, spaces, hyphens, or apostrophes.";
  }

  return true;
};

const emailValidator = (email: string) => {
  if (!email) return "Email is required";
  if (email.length > 254) return "Email is too long (max 254 chars)";

  // The regex you provided
  const tester =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-userA-Z0-9])+$/;

  if (!tester.test(email))
    return "Invalid email format (e.g., name@domain.com)";

  return true;
};

const phoneNumberValidator = (val: string) => {
  if (!val) return "Phone number cannot be empty";

  const cleanNum = val.replace(/[\s-]/g, "");

  const internationalRegex = /^\+?[1-9]\d{6,14}$/;

  if (!internationalRegex.test(cleanNum)) {
    return "Invalid format. Use international style (e.g., +919876543210)";
  }

  return true;
};

const ask = (
  question: string,
  validator?: validator,
  defaultValue?: string,
): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(
      defaultValue ? `${question} (${defaultValue}) ` : `${question} `,
      (answer: string) => {
        const finalValue = answer.trim() === "" ? (defaultValue ?? "") : answer;
        if (validator) {
          const result = validator(finalValue);
          if (result !== true) {
            console.log(`${result}`);
            return resolve(ask(question, validator, defaultValue));
          }
        }
        resolve(finalValue);
      },
    );
  });
};

const rl = readline.createInterface({ input, output });

const friends: Friend[] = [];

const addFriendByName = async () => {
  const name = await ask("Enter your friends name?", nameValidator);

  const friend: Friend = {
    name: name,
    balance: 0,
  };

  friends.push(friend);
  console.log(`Added by name:\n\tName: ${friend.name}`);
};

const addFriendByEmail = async () => {
  const name = await ask("Enter your friends name? ", nameValidator);
  const email = await ask(`${name}'s email: `, emailValidator);
  const friend: Friend = {
    name: name,
    email: email,
    balance: 0,
  };
  friends.push(friend);
  console.log(
    `Added by email: \n\tName: ${friend.name}\n\tEmail: ${friend.email}`,
  );
};

const addFriendByPhoneNumber = async () => {
  const name = await ask("Enter your friends name? ", nameValidator);
  const phoneNumber = await ask(
    `${name}'s phone number: `,
    phoneNumberValidator,
  );

  const friend: Friend = {
    name: name,
    phoneNumber: parseInt(phoneNumber),
    balance: 0,
  };
  friends.push(friend);
  console.log(
    `Added by email: \n\tName: ${friend.name}\n\tPhone number: ${friend.phoneNumber}`,
  );
};

const addConnection = async () => {
  while (true) {
    const prompt =
      "\nWhat do you want to do?\n\t1. Add friend\n\t2. View all friends\n\t3. Exit\nYour choice: ";

    const choice = await ask(prompt);

    switch (choice) {
      case "1": {
        let toAddFriend: boolean = true;

        while (toAddFriend) {
          const prompt =
            "\nHow do u want to add a friend?\n\t1. Add by name\n\t2. Add by email\n\t3. Add by phone number\n\t4. Exit\nYour choice: ";

          const choice = await ask(prompt);

          switch (choice) {
            case "1":
              await addFriendByName();
              break;
            case "2":
              await addFriendByEmail();
              break;
            case "3":
              await addFriendByPhoneNumber();
              break;
            case "4":
              toAddFriend = false;
              break;
          }
        }
        break;
      }
      case "2": {
        if (friends.length === 0) {
          console.log("\nNo friends added yet!");
        } else {
          console.log("\nYour friends");
          for (const friend of friends) {
            console.log(`Name: ${friend.name}\t\tBalance: ${friend.balance}`);
          }
        }
        break;
      }
      case "3": {
        console.log("Exiting");
        rl.close();
        return;
      }
    }
  }
};

addConnection();
