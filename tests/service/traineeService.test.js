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
});
