import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

function loadTraineeData() {
  const traineeJsonString = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');

  return JSON.parse(traineeJsonString);
}

function saveTraineeData(traineeData) {
  const traineeJsonString = JSON.stringify(traineeData, null, 2);
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, traineeJsonString, 'utf8');
}

function loadCourseData() {
  const courseJsonString = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');

  return JSON.parse(courseJsonString);
}

function saveCourseData(courseData) {
  const courseJsonString = JSON.stringify(courseData, null, 2);
  fs.writeFileSync(COURSE_DATA_FILE_PATH, courseJsonString, 'utf8');
}

export const storage = {
  loadTraineeData,
  saveTraineeData,
  loadCourseData,
  saveCourseData,
};
