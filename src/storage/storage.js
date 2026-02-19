import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  // Use the fs module to read the trainees.json file and return the data as a JavaScript object 
  const traineeJsonString = fs.readFileSync(TRAINEE_DATA_FILE_PATH,'utf8');
  
  return JSON.parse(traineeJsonString)
}

export function saveTraineeData(traineeData) {
  // Use the fs module to write the updated trainee data back to the trainees.json file 
  const traineeJsonString = JSON.stringify(traineeData, null, 2);
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, traineeJsonString, 'utf8');  
  
}

export function loadCourseData() {
  // TODO: Implement
  const courseJsonString = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');

  return JSON.parse(courseJsonString)
}

export function saveCourseData(courseData) {
  // TODO: Implement
  const courseJsonString = JSON.stringify(courseData, null, 2);
  fs.writeFileSync(COURSE_DATA_FILE_PATH,courseJsonString , 'utf8');  
}
