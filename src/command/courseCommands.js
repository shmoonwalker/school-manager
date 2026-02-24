import { createCourseService } from '../service/courseService.js';
import { storage } from '../storage/storage.js';

const [
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCoursesByTraineeId,
  courseJoin,
  courseLeave,
  getCourseById,
  courseGetAll,
] = createCourseService(storage);
function addCourseCommand(args) {
  if (args.length < 2) {
    throw new Error(`ERROR: Must provide course name and start date`);
  }

  const courseStartDate = args[args.length - 1];
  const courseName = args.slice(0, -1).join(' ');

  const course = addCourse(courseName, courseStartDate);
  return `CREATED: ${course.id} ${course.name} ${course.startDate}`;
}

function updateCourseCommand(args) {
  if (args.length < 3) {
    throw new Error(`ERROR: Must provide ID, name, and start date.`);
  }

  const courseId = Number(args[0]);
  const courseStartDate = args[args.length - 1];
  const courseName = args.slice(1, -1).join(' ');

  const course = updateCourse(courseId, courseName, courseStartDate);
  return `UPDATED: ${course.id} ${course.name} ${course.startDate}`;
}

function deleteCourseCommand(args) {
  const [id] = args;
  if (!id) {
    throw new Error('ERROR: Must provide ID.');
  }

  const course = deleteCourse(Number(id));
  return `DELETED: ${course.id} ${course.name}`;
}

function courseJoinCommand(args) {
  const [courseId, traineeId] = args;
  if (!traineeId || !courseId) {
    throw new Error(`ERROR: Must provide course ID and trainee ID `);
  }
  const result = courseJoin(Number(courseId), Number(traineeId));
  return `${result.traineeName} JOINED ${result.courseName}`;
}

function leaveCourseCommand(args) {
  const [courseId, traineeId] = args;
  if (!traineeId || !courseId) {
    throw new Error(`ERROR: Must provide course ID and trainee ID `);
  }
  const result = courseLeave(Number(courseId), Number(traineeId));
  return `${result.traineeName} Left ${result.courseName}`;
}

function getAllCoursesCommand() {
  const courses = courseGetAll();

  const lines = courses.map(
    (c) =>
      `${c.id} ${c.name} ${c.startDate} ${c.numberOfParticipants} ${c.isFull}`
  );

  return `Courses:\n${lines.join('\n')}\n\nTotal: ${courses.length}`;
}

export function handleCourseCommand(subcommand, args) {
  subcommand = subcommand.toUpperCase();
  switch (subcommand) {
    case 'ADD':
      return addCourseCommand(args);

    case 'UPDATE':
      return updateCourseCommand(args);

    case 'DELETE':
      return deleteCourseCommand(args);

    case 'JOIN':
      return courseJoinCommand(args);

    case 'LEAVE':
      return leaveCourseCommand(args);

    case 'GET':
      return getCourseCommand(args);

    case 'GETALL':
      return getAllCoursesCommand();

    default:
      throw new Error(`ERROR:Invalid Subcommand.`);
  }
}
