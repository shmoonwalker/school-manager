import { describe, expect, test } from 'vitest';
import { createTraineeService } from '../../src/service/traineeService.js';

describe('Trainee Service', () => {
  test('should add a trainee and return the new trainee object', () => {
    const mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'Jane', lastName: 'Smith' }],
      saveTraineeData: (data) => {
        expect(data).toHaveLength(2);
        expect(data[1]).toMatchObject({
          firstName: 'John',
          lastName: 'Doe',
        });
      },
    };

    const [addTrainee] = createTraineeService(mockStorage);
    const newTrainee = addTrainee('John', 'Doe');

    expect(newTrainee).toMatchObject({
      id: expect.any(Number),
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('should update a trainee and return the updated trainee object', () => {
    const mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'Jane', lastName: 'Smith' }],
      saveTraineeData: (data) => {
        expect(data).toHaveLength(1);
        expect(data[0]).toMatchObject({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
        });
      },
    };

    const [addTrainee, updateTrainee] = createTraineeService(mockStorage);
    const updatedTrainee = updateTrainee(1, 'John', 'Doe');

    expect(updatedTrainee).toMatchObject({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('should delete a trainee and return the deleted trainee object', () => {
    const mockStorage = {
      loadTraineeData: () => [
        { id: 1, firstName: 'Jane', lastName: 'Smith' },
        { id: 2, firstName: 'John', lastName: 'Doe' },
      ],
      saveTraineeData: (data) => {
        expect(data).toHaveLength(1);
        expect(data[0]).toMatchObject({
          id: 1,
          firstName: 'Jane',
          lastName: 'Smith',
        });
      },
    };

    const [addTrainee, updatedTrainee, deleteTrainee] =
      createTraineeService(mockStorage);
    const deletedTrainee = deleteTrainee(2);

    expect(deletedTrainee).toMatchObject({
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('should throw an error when deleting a non-existent trainee', () => {
    const mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'Jane', lastName: 'Smith' }],
      saveTraineeData: () => {},
    };

    const [addTrainee, updatedTrainee, deleteTrainee] =
      createTraineeService(mockStorage);

    expect(() => deleteTrainee(999)).toThrow(
      'ERROR: Trainee with ID 999 does not exist'
    );
  });
  test('should get a trainee by ID', () => {
    const mockStorage = {
      loadTraineeData: () => [
        { id: 1, firstName: 'Jane', lastName: 'Smith' },
        { id: 2, firstName: 'John', lastName: 'Doe' },
      ],
      saveTraineeData: () => {},
    };

    const [addTrainee, updatedTrainee, deleteTrainee, getTraineeById] =
      createTraineeService(mockStorage);
    const trainee = getTraineeById(2);

    expect(trainee).toMatchObject({
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
    });
  });
  test('should get all trainees sorted by last name and return the total count', () => {
    const mockStorage = {
      loadTraineeData: () => [
        { id: 1, firstName: 'Jane', lastName: 'Smith' },
        { id: 2, firstName: 'John', lastName: 'Doe' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson' },
      ],
      saveTraineeData: () => {},
    };

    const [
      addTrainee,
      updatedTrainee,
      deleteTrainee,
      getTraineeById,
      getAllTrainee,
    ] = createTraineeService(mockStorage);
    const [sortedTrainees, totalCount] = getAllTrainee();

    expect(sortedTrainees).toEqual([
      { id: 2, firstName: 'John', lastName: 'Doe' },
      { id: 3, firstName: 'Alice', lastName: 'Johnson' },
      { id: 1, firstName: 'Jane', lastName: 'Smith' },
    ]);
    expect(totalCount).toBe(3);
  });
});
