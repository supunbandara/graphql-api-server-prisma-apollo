import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import depthLimit from "graphql-depth-limit";
import { ApolloServer } from "@apollo/server";
import { apiExplorer } from "./api/index.js";
import { verify } from "./utils/jwt.js";
import { logger } from "./utils/logging.js";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const port = process.env.PORT || 8080;

async function startServer() {
  try {
    const schema = await apiExplorer.getSchema();

    const apolloServer = new ApolloServer({
      schema,
      formatError: (error) => {
        logger.error(error);
        return error;
      },
      validationRules: [depthLimit(5)],
      debug: true,
    });

    await apolloServer.start();

    const app = express();

    // Middleware setup
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // GraphQL endpoint with proper context
    app.use(
      "/graphql",
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => {
          const authUser = verify(req, res); // Extract authUser from JWT
          return { authUser }; // Now accessible in resolvers & shield
        },
      })
    );

    // Start listening
    app.listen({ port }, () => {
      logger.info(`Server ready at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
  }
}

startServer();
