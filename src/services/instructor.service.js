import { PrismaClient } from "@prisma/client";
import BaseService from "./base.service.js";

const prisma = new PrismaClient();

class InstructorService extends BaseService {
  constructor() {
    super(prisma.instructor);
  }

  // Create a new instructor and associate it with the current creator
  async createInstructor(creatorId, editInstructorReq) {
    editInstructorReq.creatorId = creatorId;

    console.log('editInstructorReq', editInstructorReq)

    const instructor = await prisma.instructor.create({
      data: editInstructorReq,
    });

    return instructor;
  }

  // Update an instructor by ID
  async editInstructor(id, editInstructorReq) {
    await prisma.instructor.update({
      where: { id: Number(id) },
      data: editInstructorReq,
    });

    return this.findById(id);
  }

  // Delete instructor and return the deleted record (useful for UI feedback)
  async deleteInstructor(id) {
    const instructor = await this.findById(id);

    await prisma.instructor.delete({
      where: { id: Number(id) },
    });

    return instructor;
  }

  // Batch load instructors with their recent course associations
  async findInstructorsWithRecentCourses(instructorIds) {
    return prisma.instructor.findMany({
      where: { id: { in: instructorIds } },
      include: { courses: true },
    });
  }
}

export const instructorService = new InstructorService();
