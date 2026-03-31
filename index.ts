import { openInteractionManager } from "./src/presentation/interaction-manager.js"

const run = async () => {
  const { ask, choose, close} = openInteractionManager();

  const answer = await ask('What is your name? ');
  console.log(`Hello ${answer}`);

  choose("Enter your choice: ", [
    { label: "yellow", value: "1" },
    { label: "blue", value: "2" },
    { label: "black", value: "3" }
  ]);

  close();
}