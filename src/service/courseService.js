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
  function updateCourse(id, courseName, courseStartDate) {
    const allCourse = storage.loadCourseData();
    const idExists = allCourse.some((c) => c.id === id);
    if (!idExists) {
      throw new Error(`ERROR: Course with ID ${id} does not exist`);
    }
    const updatedCourses = allCourse.map((course) =>
      course.id === id
        ? { ...course, name: courseName, startDate: courseStartDate }
        : course
    );

    storage.saveCourseData(updatedCourses);

    return { id: id, name: courseName, startDate: courseStartDate };
  }

  return [addCourse, updateCourse];
}

function checkDateIsValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
