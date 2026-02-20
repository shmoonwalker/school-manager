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

  return [addCourse, updateCourse, deleteCourse];
}

function checkDateIsValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
