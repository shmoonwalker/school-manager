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
    const [, updateCourse] = createCourseService(mockStorage);

    expect(() => updateCourse(999, 'Updated Art', '2026-08-15')).toThrow(
      'ERROR: Course with ID 999 does not exist'
    );
  });
});
