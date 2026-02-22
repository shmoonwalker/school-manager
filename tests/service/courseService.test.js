import { describe, expect, test } from 'vitest';
import { createCourseService } from '../../src/service/courseService';

describe('Course Service', () => {
  test('should add a course and return new course object', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      saveCourseData: (data) => {
        expect(data).toHaveLength(2);
        expect(data[1]).toMatchObject({
          name: 'Lessons Of History',
          startDate: '2018-10-02',
        });
      },
    };
    const [addCourse] = createCourseService(mockStorage);
    const newCourse = addCourse('Lessons Of History', '2018-10-02');

    expect(newCourse).toMatchObject({
      id: expect.any(Number),
      name: 'Lessons Of History',
      startDate: '2018-10-02',
      participants: [],
    });
  });
  test('should update a course and return updated course object', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      saveCourseData: (data) => {
        expect(data).toHaveLength(1);
        expect(data[0]).toMatchObject({
          id: 1,
          name: 'Updated Art',
          startDate: '2026-08-15',
        });
      },
    };
    const [, updateCourse] = createCourseService(mockStorage);
    const updated = updateCourse(1, 'Updated Art', '2026-08-15');

    expect(updated).toMatchObject({
      id: 1,
      name: 'Updated Art',
      startDate: '2026-08-15',
    });
  });

  test('should throw error when updating non-existent course', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      saveCourseData: () => {},
    };
    const [addCourse, updateCourse] = createCourseService(mockStorage);

    expect(() => updateCourse(999, 'Updated Art', '2026-08-15')).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });
  test('should delete a course and return deleted course object', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      saveCourseData: (data) => {
        expect(data).toHaveLength(0);
      },
    };
    const [addCourse, updateCourse, deleteCourse] =
      createCourseService(mockStorage);
    const deletedCourse = deleteCourse(1);

    expect(deletedCourse).toMatchObject({
      id: 1,
      courseName: 'Art',
    });
  });

  test('should throw error when deleting non-existent course', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      saveCourseData: () => {},
    };
    const [addCourse, updateCourse, deleteCourse] =
      createCourseService(mockStorage);

    expect(() => deleteCourse(999)).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });
  test('should add trainee to course and return trainee and course names', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: (data) => {
        expect(data[0].participants).toContain(101);
      },
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);
    const result = courseJoin(1, 101);

    expect(result).toMatchObject({
      traineeName: 'John Doe',
      courseName: 'Art',
    });
  });

  test('should throw error when joining non-existent course', () => {
    const mockStorage = {
      loadCourseData: () => [],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);

    expect(() => courseJoin(999, 101)).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });

  test('should throw error when trainee does not exist', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      loadTraineeData: () => [],
      saveCourseData: () => {},
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);

    expect(() => courseJoin(1, 999)).toThrow(
      'ERROR: Trainee with ID 999 does not exist'
    );
  });

  test('should throw error when trainee already joined the course', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [101] },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);

    expect(() => courseJoin(1, 101)).toThrow(
      'ERROR: Trainee already joined this course'
    );
  });

  test('should throw error when course is full', () => {
    const mockStorage = {
      loadCourseData: () => [
        {
          id: 1,
          name: 'Art',
          startDate: '2025-07-02',
          participants: Array(20).fill(1),
        },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);

    expect(() => courseJoin(1, 101)).toThrow('ERROR: The course is full.');
  });

  test('should throw error when trainee already enrolled in 5 courses', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
        { id: 2, name: 'Math', startDate: '2025-07-02', participants: [101] },
        {
          id: 3,
          name: 'Science',
          startDate: '2025-07-02',
          participants: [101],
        },
        {
          id: 4,
          name: 'History',
          startDate: '2025-07-02',
          participants: [101],
        },
        {
          id: 5,
          name: 'English',
          startDate: '2025-07-02',
          participants: [101],
        },
        { id: 6, name: 'PE', startDate: '2025-07-02', participants: [101] },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , courseJoin] = createCourseService(mockStorage);

    expect(() => courseJoin(1, 101)).toThrow(
      'ERROR: A trainee is not allowed to join more than 5 courses.'
    );
  });
  test('should allow trainee to leave a course and return course and trainee names', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [101] },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: (data) => {
        expect(data[0].participants).not.toContain(101);
      },
    };
    const [, , , , , courseLeave] = createCourseService(mockStorage);
    const result = courseLeave(1, 101);

    expect(result).toMatchObject({
      traineeName: 'John Doe',
      courseName: 'Art',
    });
  });

  test('should throw error when leaving non-existent course', () => {
    const mockStorage = {
      loadCourseData: () => [],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , , courseLeave] = createCourseService(mockStorage);

    expect(() => courseLeave(999, 101)).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });

  test('should throw error when trainee does not exist while leaving', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [101] },
      ],
      loadTraineeData: () => [],
      saveCourseData: () => {},
    };
    const [, , , , , courseLeave] = createCourseService(mockStorage);

    expect(() => courseLeave(1, 999)).toThrow(
      'ERROR: Trainee with ID 999 does not exist'
    );
  });

  test('should throw error when trainee not enrolled in the course', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      loadTraineeData: () => [{ id: 101, name: 'John Doe' }],
      saveCourseData: () => {},
    };
    const [, , , , , courseLeave] = createCourseService(mockStorage);

    expect(() => courseLeave(1, 101)).toThrow(
      'ERROR: The Trainee did not join the course'
    );
  });
  test('should return course by ID', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
        { id: 2, name: 'Math', startDate: '2025-07-02', participants: [] },
      ],
      loadTraineeData: () => [],
      saveCourseData: () => {},
    };
    const [, , , , , , getCourseById] = createCourseService(mockStorage);
    const course = getCourseById(1);

    expect(course).toMatchObject({
      id: 1,
      name: 'Art',
      startDate: '2025-07-02',
      participants: [],
    });
  });

  test('should throw error when getting non-existent course by ID', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-07-02', participants: [] },
      ],
      loadTraineeData: () => [],
    };
    const [, , , , , , getCourseById] = createCourseService(mockStorage);

    expect(() => getCourseById(999)).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });
  test('should return all courses sorted with computed fields', () => {
    const mockStorage = {
      loadCourseData: () => [
        {
          id: 1,
          name: 'Art',
          startDate: '2025-07-03',
          participants: Array(20).fill(1),
        },
        {
          id: 2,
          name: 'Math',
          startDate: '2025-07-02',
          participants: [1, 2, 3],
        },
      ],
      loadTraineeData: () => [],
      saveCourseData: () => {},
    };

    const [, , , , , , , courseGetAll ]= createCourseService(mockStorage);

    const courses = courseGetAll();

    expect(courses).toHaveLength(2);

    expect(courses[0].id).toBe(2);
    expect(courses[1].id).toBe(1);

    expect(courses[0]).toEqual({
      id: 2,
      name: 'Math',
      startDate: '2025-07-02',
      numberOfParticipants: 3,
      isFull: false,
    });

    expect(courses[1]).toEqual({
      id: 1,
      name: 'Art',
      startDate: '2025-07-03',
      numberOfParticipants: 20,
      isFull: true,
    });
  });
});
