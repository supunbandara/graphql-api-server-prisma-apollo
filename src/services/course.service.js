import { PrismaClient } from "@prisma/client";
import BaseService from "./base.service.js";

const prisma = new PrismaClient();

class CourseService extends BaseService {
  constructor() {
    super(prisma.course);
  }


  // Create course with connected instructors
  async createCourse(creatorId, editCourseReq) {
    const { instructorIds, ...courseData } = editCourseReq;

    return prisma.course.create({
      data: {
        ...courseData,
        creator: { connect: { id: creatorId } },
        instructors: {
          connect: instructorIds.map((id) => ({ id: Number(id) })),
        },
      },
      include: {
        instructors: true,
        creator: true,
      },
    });
  }

  // Update course + reset instructors
  async editCourse(id, editCourseReq) {
    const { instructorIds, ...courseData } = editCourseReq;

    // Disconnect old instructors and connect new
    await prisma.course.update({
      where: { id },
      data: {
        ...courseData,
        instructors: {
          set: [], // remove all
          connect: instructorIds.map((id) => ({ id: Number(id) })),
        },
      },
    });

    return prisma.course.findUnique({
      where: { id },
      include: {
        instructors: true,
        creator: true,
      },
    });
  }

  // Delete course and clean up relations
  async deleteCourse(id) {
    // Optional: fetch for return value
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructors: true,
        creator: true,
      },
    });

    if (course) {
      // Prisma handles relation cleanup
      await prisma.course.delete({ where: { id: Number(id) } });
    }

    return course;
  }

  // Get all courses by instructor
  async findByInstructor(instructorId) {
    return prisma.course.findMany({
      where: {
        instructors: {
          some: { id: instructorId },
        },
      },
    });
  }

  // Batch load courses with instructors (used in dataloader)
  async findCoursesWithInstructors(courseIds) {
    return prisma.course.findMany({
      where: {
        id: { in: courseIds },
      },
      include: {
        instructors: true,
      },
    });
  }
}

export const courseService = new CourseService();
