import { createTraineeService } from '../service/traineeService.js';
import { storage } from '../storage/storage.js';
const [
  addTrainee,
  updateTrainee,
  deleteTrainee,
  getTraineeById,
  getAllTrainee,
] = createTraineeService(storage);

function addTraineeCommand(args) {
  const [firstName, lastName] = args;

  if (!firstName || !lastName) {
    throw new Error('ERROR: Must provide first and last name');
  }

  const trainne = addTrainee(firstName, lastName);
  return `CREATED: ${trainne.id}  ${trainne.firstName} ${trainne.lastName}`;
}

function updateTraineeCommand(args) {
  const [id, firstName, lastName] = args;

  if (!id || !firstName || !lastName) {
    throw new Error('ERROR: Must provide ID, first name and last name.');
  }

  const trainee = updateTrainee(Number(id), firstName, lastName);
  return `UPDATED: ${trainee.id} ${trainee.firstName} ${trainee.lastName}`;
}

function deleteTraineeCommand(args) {
  const [id] = args;

  if (!id) {
    throw new Error('ERROR: Must provide ID.');
  }

  const trainee = deleteTrainee(Number(id));
  return `DELETED:${trainee.id} ${trainee.firstName} ${trainee.lastName} `;
}

function fetchTraineeCommand(args) {
  const [id] = args;

  if (!id) {
    throw new Error('ERROR: ID is required.');
  }

  let { trainee, coursesHaveTraineeId } = getTraineeById(Number(id));

  if (!coursesHaveTraineeId.length) {
    return `${trainee.id} ${trainee.firstName} ${trainee.lastName}
Courses:NONE`;
  }

  return `${trainee.id} ${trainee.firstName} ${trainee.lastName}
Courses:
  - ${coursesHaveTraineeId.join('\n  - ')}`;
}

function fetchAllTraineesCommand() {
  const trainees = getAllTrainee();
  return `Trainees:\n${trainees.map((t) => `${t.id} ${t.firstName} ${t.lastName}`).join('\n')}\n\nTotal: ${trainees.length}`;
}

export function handleTraineeCommand(subcommand, args) {
  subcommand = subcommand.toUpperCase();
  switch (subcommand) {
    case 'ADD':
      return addTraineeCommand(args);

    case 'UPDATE':
      return updateTraineeCommand(args);

    case 'DELETE':
      return deleteTraineeCommand(args);

    case 'GET':
      return fetchTraineeCommand(args);

    case 'GETALL':
      return fetchAllTraineesCommand();

    default:
      throw new Error(`ERROR:Invalid Subcommand.`);
  }
}
