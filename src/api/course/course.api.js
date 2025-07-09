import fs from "fs";
import { UserDataLoader } from "../../dataloaders/user.dataloader.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { InstructorByCourseDataLoader } from "../../dataloaders/instructor.dataloader.js";
import { courseService } from "../../services/course.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = fs.readFileSync(path.join(__dirname, "course.api.graphql"), "utf8");

export const resolvers = {
  Query: {
    courseById: (obj, { id }, context, info) => {
      return courseService.findById(id);
    },

    coursesByInstructor: (obj, { instructorId }, context, info) => {
      return courseService.findByInstructor(instructorId);
    },

    courses: (obj, { first, offset }, context, info) => {
      return courseService.findAll(first, offset);
    },
  },

  Mutation: {
    createCourse: (obj, { editCourseReq }, { authUser }, info) => {
      return courseService.createCourse(authUser.id, editCourseReq);
    },

    editCourse: (obj, { id, editCourseReq }, context, info) => {
      return courseService.editCourse(id, editCourseReq);
    },

    deleteCourse: (obj, { id }, context, info) => {
      return courseService.deleteCourse(id);
    },
  },

  Course: {
    creator: ({ creatorId }, args, context, info) => {
      const userDataLoader = UserDataLoader.getInstance(context);

      return userDataLoader.load(creatorId);
    },

    instructors: ({ id }, args, context, info) => {
      const instructorByCourseDataLoader =
        InstructorByCourseDataLoader.getInstance(context);

      return instructorByCourseDataLoader.load(id);
    },
  },
};
