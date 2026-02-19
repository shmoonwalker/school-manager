export function createTraineeService(storage) {
  function addTrainee(fName, lName) {
    let traineeId = Math.floor(Math.random() * 100000);

    const newTrainee = {
      id: traineeId,
      firstName: fName,
      lastName: lName,
    };
    const allTrainee = storage.loadTraineeData();

    const updatedTrainees = [...allTrainee, newTrainee];
    storage.saveTraineeData(updatedTrainees);

    return newTrainee;
  }
  function updateTrainee(id, fName, lName) {
    const allTrainee = storage.loadTraineeData();
    const idExists = allTrainee.some((t) => t.id === id);

    if (!idExists) {
      throw new Error(`ERROR: Trainee with ID ${id} does not exis`);
    }

    const updatedTrainees = allTrainee.map((trainee) =>
      trainee.id === id
        ? { ...trainee, firstName: fName, lastName: lName }
        : trainee
    );

    storage.saveTraineeData(updatedTrainees);
    return { id: id, firstName: fName, lastName: lName };
  }

  function deleteTrainee(id) {
    const allTrainee = storage.loadTraineeData();
    const idExists = allTrainee.some((t) => t.id === id);

    if (!idExists) {
      throw new Error(`ERROR: Trainee with ID ${id} does not exis`);
    }

    const updatedTrainees = allTrainee.filter((trainee) => trainee.id !== id);

    storage.saveTraineeData(updatedTrainees);
  }

  function getTraineeById(id) {
    const allTrainee = storage.loadTraineeData();
    const idExists = allTrainee.some((t) => t.id === id);

    if (!idExists) {
      throw new Error(`ERROR: Trainee with ID ${id} does not exis`);
    }

    const trainee = allTrainee.find((t) => t.id === id);

    return trainee;
  }

  function getAllTrainee() {
    const allTrainee = storage.loadTraineeData();
    const sortedTrainee = [...allTrainee].sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
    return [sortedTrainee, allTrainee.length];
  }

  return [
    addTrainee,
    updateTrainee,
    deleteTrainee,
    getTraineeById,
    getAllTrainee,
  ];
}
