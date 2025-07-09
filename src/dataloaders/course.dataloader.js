import DataLoader from 'dataloader';
import { instructorService } from '../services/instructor.service.js';

export class CoursesByInstructorDataLoader extends DataLoader {

  constructor() {
    const batchLoader = async instructorIds => {
      const instructors = await instructorService.findInstructorsWithRecentCourses(instructorIds);
      return instructorIds.map(
          instructorId => instructors.filter(instructor => instructor.id === instructorId)[0].courses
      );
    };

    super(batchLoader);
  }

  static getInstance(context) {
    if (!context.coursesByInstructorDataLoader) {
      context.coursesByInstructorDataLoader = new CoursesByInstructorDataLoader();
    }

    return context.coursesByInstructorDataLoader;
  }

}