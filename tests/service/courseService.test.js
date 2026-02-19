import { describe, expect, test } from 'vitest';
import { createCourseService } from '../../src/service/courseService';

describe('Course Service', () => {
  test('should add a course and return new course object', () => {
    const mockStorage = {
      loadCourseData: () => [
        { id: 1, name: 'Art', startDate: '2025-01-02', participants: [] },
      ],
      saveCourseData: (data) => {
        expect(data).toHaveLength(2);
        expect(data[1]).toMatchObject({
          name: 'Lessons Of History',
          startDate: '2018-10-02',
          participants: [],
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
});
