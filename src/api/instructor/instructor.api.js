import fs from "fs";
import { UserDataLoader } from "../../dataloaders/user.dataloader.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { instructorService } from "../../services/instructor.service.js";
import { CoursesByInstructorDataLoader } from "../../dataloaders/course.dataloader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = fs.readFileSync(path.join(__dirname, "instructor.api.graphql"), "utf8");

export const resolvers = {

  Query: {

    instructorById: (obj, { id }, context, info) => {
      return instructorService.findById(id);
    },

    instructors: (obj, { first, offset }, context, info) => {
      return instructorService.findAll(first, offset);
    }
  },

  Mutation: {

    createInstructor: (obj, { editInstructorReq }, { authUser }, info) => {
      return instructorService.createInstructor(authUser.id, editInstructorReq);
    },

    editInstructor: (obj, { id, editInstructorReq }, context, info) => {
      return instructorService.editInstructor(id, editInstructorReq);
    },

    deleteInstructor: (obj, { id }, context, info) => {
      return instructorService.deleteInstructor(id);
    }
  },

  Instructor: {

    creator: ({ creatorId }, args, context, info) => {
      const userDataLoader = UserDataLoader.getInstance(context);

      return userDataLoader.load(creatorId);
    },

    courses: ({ id }, args, context, info) => {
      const coursesByInstructorDataLoader = CoursesByInstructorDataLoader.getInstance(context);

      return coursesByInstructorDataLoader.load(id);
    }
  }
};
