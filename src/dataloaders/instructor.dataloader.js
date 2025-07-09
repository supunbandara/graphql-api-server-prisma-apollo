import DataLoader from 'dataloader';
import { courseService } from '../services/course.service.js';

export class InstructorByCourseDataLoader extends DataLoader {

  constructor() {
    const batchLoader = async courseIds => {
      const courses = await courseService.findCoursesWithInstructors(courseIds);
      return courseIds.map(
          courseId => courses.filter(course => course.id === courseId)[0].instructors
      );
    };

    super(batchLoader);
  }

  static getInstance(context) {
    if (!context.instructorByCourseDataLoader) {
      context.instructorByCourseDataLoader = new InstructorByCourseDataLoader();
    }

    return context.instructorByCourseDataLoader;
  }

}