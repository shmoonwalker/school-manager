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

    const updatedCourse = [...allCourse, newCourse];
    storage.saveCourseData(updatedCourse);

    return newCourse;
  }
  return [addCourse];
}

function checkDateIsValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
