import { handleCourseCommand } from './command/courseCommands.js';
import { handleTraineeCommand } from './command/traineeCommands.js';
export function parseCommand(userInput) {
  if (userInput.length < 2) {
    throw new Error('ERROR:Invalid Command.');
  }
  const command = userInput[0].toUpperCase();
  const subCommand = userInput[1].toUpperCase();
  const args = userInput.slice(2);
  switch (command) {
    case 'TRAINEE':
      return handleTraineeCommand(subCommand, args);

    case 'COURSE':
      return handleCourseCommand(subCommand, args);

    default:
      throw new Error(`ERROR:Invalid Command.`);
  }
}
