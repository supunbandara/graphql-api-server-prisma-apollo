import { allow } from "graphql-shield";

export const permissions = {
  Query: {
    courseById: allow,

    coursesByInstructor: allow,

    courses: allow,
  },
};
