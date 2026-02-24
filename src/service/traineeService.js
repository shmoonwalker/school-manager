export function createTraineeService(storage) {
  function addTrainee(fName, lName) {
    let traineeId = Math.floor(Math.random() * 100000);

    const allTrainee = storage.loadTraineeData();
    while (true) {
      const idExists = allTrainee.some((t) => t.id === traineeId);
      if (!idExists) {
        break;
      }
      traineeId = Math.floor(Math.random() * 100000);
    }
    const newTrainee = {
      id: traineeId,
      firstName: fName,
      lastName: lName,
    };
    const updatedTrainees = [...allTrainee, newTrainee];
    storage.saveTraineeData(updatedTrainees);

    return newTrainee;
  }
  function updateTrainee(traineeId, fName, lName) {
    const allTrainee = storage.loadTraineeData();
    const idExists = allTrainee.find((t) => t.id === traineeId);

    if (!idExists) {
      throw new Error(`ERROR: Trainee with ID ${traineeId} does not exist`);
    }

    const updatedTrainees = allTrainee.map((trainee) =>
      trainee.id === traineeId
        ? { ...trainee, firstName: fName, lastName: lName }
        : trainee
    );

    storage.saveTraineeData(updatedTrainees);
    return { id: traineeId, firstName: fName, lastName: lName };
  }

  function deleteTrainee(traineeId) {
    const allTrainee = storage.loadTraineeData();
    const traineeToDelete = allTrainee.find((t) => t.id === traineeId);

    if (!traineeToDelete) {
      throw new Error(`ERROR: Trainee with ID ${traineeId} does not exist`);
    }

    const updatedTrainees = allTrainee.filter(
      (trainee) => trainee.id !== traineeId
    );

    storage.saveTraineeData(updatedTrainees);

    return {
      id: traineeToDelete.id,
      firstName: traineeToDelete.firstName,
      lastName: traineeToDelete.lastName,
    };
  }

  function getTraineeById(traineeId) {
    const allTrainee = storage.loadTraineeData();
    const trainee = allTrainee.find((t) => t.id === traineeId);
    const allCourse = storage.loadCourseData();
    const coursesHaveTraineeId = allCourse
      .filter((course) => course.participants.includes(traineeId))
      .map((course) => course.name);
    if (!trainee) {
      throw new Error(`ERROR: Trainee with ID ${traineeId} does not exist`);
    }
    return { trainee, coursesHaveTraineeId };
  }

  function getAllTrainee() {
    const allTrainee = storage.loadTraineeData();
    const sortedTrainee = [...allTrainee].sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
    return sortedTrainee;
  }

  return [
    addTrainee,
    updateTrainee,
    deleteTrainee,
    getTraineeById,
    getAllTrainee,
  ];
}
