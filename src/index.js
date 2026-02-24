import { parseCommand } from './command-parser.js';
import prompt from 'prompt-sync';
import { style } from '../style/style.js';

const input = prompt();

while (true) {
  let userInput = input(style.id('> '));

  if (userInput.toUpperCase() === 'EXIT') {
    console.log(style.warningMessage('Goodbye.'));
    break;
  }

  userInput = userInput.split(' ');

  try {
    const result = parseCommand(userInput);
    console.log(style.successMessage(result));
  } catch (err) {
    console.error(style.errorMessage(err.message));
  }
}
