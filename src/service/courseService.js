export function createCourseService(storage) {
  function addCourse(courseName, courseStartDate) {
    let courseId = Math.floor(Math.random() * 100000);
    if (!checkDateIsValid(courseStartDate)) {
      throw new Error(
        `ERROR: Invalid start date. Must be in yyyy-MM-dd format`
      );
    }
    const newCourse = {
      id: courseId,
      name: courseName,
      startDate: courseStartDate,
      participants: [],
    };
    const allCourse = storage.loadCourseData();

    const updatedCourses = [...allCourse, newCourse];
    storage.saveCourseData(updatedCourses);

    return newCourse;
  }
  function updateCourse(courseId, courseName, courseStartDate) {
    const allCourse = storage.loadCourseData();
    const idExists = allCourse.some((c) => c.id === courseId);
    if (!idExists) {
      throw new Error(`ERROR: Course with ID ${courseId} does not exist`);
    }
    const updatedCourses = allCourse.map((course) =>
      course.id === courseId
        ? { ...course, name: courseName, startDate: courseStartDate }
        : course
    );

    storage.saveCourseData(updatedCourses);

    return { id: courseId, name: courseName, startDate: courseStartDate };
  }
  function deleteCourse(courseId) {
    const allCourse = storage.loadCourseData();
    const courseToDelete = allCourse.find((c) => c.id === courseId);

    if (!courseToDelete) {
      throw new Error(`ERROR: Course with ID ${courseId} does not exist`);
    }

    const updatedCourses = allCourse.filter((course) => course.id !== courseId);
    storage.saveCourseData(updatedCourses);

    return {
      id: courseToDelete.id,
      courseName: courseToDelete.name,
    };
  }
  function getAllCoursesByTraineeId(traineeId) {
    const allCourse = storage.loadCourseData();
    const coursesHaveTraineeId = allCourse.filter((course) =>
      course.participants.includes(traineeId)
    );
    return coursesHaveTraineeId;
  }
  function joinCourse(courseId, traineeId) {
    const allCourse = storage.loadCourseData();
    const allTrainee = storage.loadTraineeData();
    const course = allCourse.find((c) => c.id === courseId);
    if (!course) {
      throw new Error(`ERROR: Course with ID ${courseId} does not exist`);
    }
    const trainee = allTrainee.find((t) => t.id === traineeId);
    if (!trainee) {
      throw new Error(`ERROR: Trainee with ID ${traineeId} does not exist`);
    }

    if (course.participants.includes(traineeId)) {
      throw new Error(`ERROR: Trainee already joined this course`);
    }
    if (course.participants.length >= 20) {
      throw new Error(`ERROR: The course is full.`);
    }
    const coursesHaveTraineeId = getAllCoursesByTraineeId(traineeId);
    if (coursesHaveTraineeId.length >= 5) {
      throw new Error(
        `ERROR: A trainee is not allowed to join more than 5 courses.`
      );
    }
    
    course.participants.push(traineeId);

    storage.saveCourseData(allCourse);

    return {
      traineeName : trainee.name,
      courseName : course.name 
    }
  }

  return [addCourse, updateCourse, deleteCourse, getAllCoursesByTraineeId,joinCourse];
}

function checkDateIsValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
