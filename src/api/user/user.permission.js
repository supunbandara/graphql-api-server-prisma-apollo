import { isAuthorized, isUserAdmin } from "../../utils/shield.js";

export const permissions = {
  Query: {
    userById: isAuthorized,

    users: isAuthorized,
  },

  Mutation: {
    editUser: isUserAdmin,

    deleteUser: isUserAdmin,
  },
};
