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
});
