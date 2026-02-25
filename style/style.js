import chalk from 'chalk';

export const style = {
  id: (text) => chalk.cyan(text),

  successMessage: (text) => chalk.green.bold(text),
  errorMessage: (text) => chalk.red.bold(text),
  warningMessage: (text) => chalk.yellow.bold(text),
};
