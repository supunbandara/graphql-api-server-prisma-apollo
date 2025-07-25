import { allow } from "graphql-shield";
import { isAuthorized } from "../utils/shield.js";

export const permissions = {
  Query: {
    "*": isAuthorized,
    sayHello: allow,
  },

  Mutation: {
    "*": isAuthorized,
    sayHello: allow,
  },
};
