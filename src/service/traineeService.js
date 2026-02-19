
export function createTraineeService(storage) {
  function addTrainee(firstName, lastName) {
    let traineeId = Math.floor(Math.random() * 100000);

    const newTrainee = {
      id: traineeId,
      firstName: firstName,
      lastName: lastName,
    };
    const allTrainee = storage.loadTraineeData();

    allTrainee.push(newTrainee);

    storage.saveTraineeData(allTrainee);

    return newTrainee;
  }
  return [addTrainee];
}
