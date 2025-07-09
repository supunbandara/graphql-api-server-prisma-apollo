import fs from "fs";
import { sign } from "../../utils/jwt.js";
import path from "path";
import { fileURLToPath } from "url";
import { userService } from "../../services/user.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = fs.readFileSync(path.join(__dirname, "auth.api.graphql"), "utf8");

export const resolvers = {
  Query: {
    authUser: (obj, args, { authUser }, info) => {
      return userService.findById(authUser.id);
    },
  },

  Mutation: {
    login: async (obj, { email, password }, context, info) => {
      const user = await userService.login(email, password);

      if (!user) {
        return {
          success: false,
          message: "Invalid credentials!",
          token: undefined,
        };
      }

      const token = sign(user);

      return {
        success: true,
        message: "Success!",
        token,
      };
    },

    signup: async (obj, { signupReq }, context, info) => {
      if (await userService.findByEmail(signupReq.email)) {
        return {
          success: false,
          message: "Email address exists!",
          user: undefined,
        };
      }

      const user = await userService.createUser(signupReq);

      return {
        success: true,
        message: "Success!",
        user,
      };
    },

    updatePersonalInfo: (obj, { fullName }, { authUser }, info) => {
      return userService.editUser(authUser.id, {
        fullName,
      });
    },
  },
};
