import { allow } from 'graphql-shield';

export const permissions = {

  Query: {

    instructorById: allow,

    instructors: allow
  }
};