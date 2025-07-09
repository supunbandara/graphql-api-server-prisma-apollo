import fs from "fs";
import { userService } from "../../services/user.service.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = fs.readFileSync(path.join(__dirname, "user.api.graphql"), "utf8");


export const resolvers = {
  Query: {
    userById: (obj, { id }, context, info) => {
      return userService.findById(id);
    },

    users: (obj, args, context, info) => {
      return userService.findAll();
    },
  },

  Mutation: {
    editUser: (obj, { id, editUserReq }, context, info) => {
      return userService.editUser(id, editUserReq);
    },

    deleteUser: (obj, { id }, context, info) => {
      return userService.deleteUser(id);
    },
  },
};
