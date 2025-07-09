import fs from "fs";
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-scalars";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = fs.readFileSync(path.join(__dirname, "root.api.graphql"), "utf8");

export const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`;
    },
  },

  Mutation: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`;
    },
  },
};