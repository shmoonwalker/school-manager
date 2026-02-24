import { describe, expect, test } from 'vitest';
import { createTraineeService } from '../../src/service/traineeService.js';
describe('traineeService', () => {
  let mockStorage;

  test('addTrainee should create a new trainee with unique ID', () => {
    mockStorage = {
      loadTraineeData: () => [],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [addTrainee] = createTraineeService(mockStorage);
    const trainee = addTrainee('John', 'Doe');

    expect(trainee).toHaveProperty('id');
    expect(trainee.firstName).toBe('John');
    expect(trainee.lastName).toBe('Doe');
  });

  test('updateTrainee should update trainee details', () => {
    mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [, updateTrainee] = createTraineeService(mockStorage);
    const updated = updateTrainee(1, 'Jane', 'Smith');

    expect(updated.firstName).toBe('Jane');
    expect(updated.lastName).toBe('Smith');
  });

  test('updateTrainee should throw error for non-existent trainee', () => {
    mockStorage = {
      loadTraineeData: () => [],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [, updateTrainee] = createTraineeService(mockStorage);

    expect(() => updateTrainee(999, 'Jane', 'Smith')).toThrow(
      'ERROR: Trainee with ID 999 does not exist'
    );
  });

  test('deleteTrainee should remove trainee', () => {
    mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [, , deleteTrainee] = createTraineeService(mockStorage);
    const deleted = deleteTrainee(1);

    expect(deleted.id).toBe(1);
  });

  test('deleteTrainee should throw error for non-existent trainee', () => {
    mockStorage = {
      loadTraineeData: () => [],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [, , deleteTrainee] = createTraineeService(mockStorage);

    expect(() => deleteTrainee(999)).toThrow(
      'ERROR: Trainee with ID 999 does not exist'
    );
  });

  test('getTraineeById should return trainee with courses', () => {
    mockStorage = {
      loadTraineeData: () => [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      loadCourseData: () => [
        { name: 'JavaScript', participants: [1] },
        { name: 'React', participants: [1] },
      ],
      saveTraineeData: () => {},
    };
    const [, , , getTraineeById] = createTraineeService(mockStorage);
    const result = getTraineeById(1);

    expect(result.trainee.firstName).toBe('John');
    expect(result.coursesHaveTraineeId).toContain('JavaScript');
    expect(result.coursesHaveTraineeId).toContain('React');
  });

  test('getAllTrainee should return sorted trainees by last name', () => {
    mockStorage = {
      loadTraineeData: () => [
        { id: 1, firstName: 'John', lastName: 'Zebra' },
        { id: 2, firstName: 'Jane', lastName: 'Apple' },
      ],
      saveTraineeData: () => {},
      loadCourseData: () => [],
    };
    const [, , , , getAllTrainee] = createTraineeService(mockStorage);
    const trainees = getAllTrainee();

    expect(trainees[0].lastName).toBe('Apple');
    expect(trainees[1].lastName).toBe('Zebra');
  });
});
