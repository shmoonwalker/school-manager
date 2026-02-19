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

    const updatedTrainees = allTrainee.map((trainee) =>
      trainee.id === id
        ? { ...trainee, firstName: fName, lastName: lName }
        : trainee
    );

    storage.saveTraineeData(updatedTrainees);
    return { id: id, firstName: fName, lastName: lName };
  }

  return [addTrainee, updateTrainee];
}
