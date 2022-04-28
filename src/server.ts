import express from "express";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { User } from "./schemas/userSchema";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import connect from "./utils/dbconnect";
import authChecker from "./utils/auth";
import Context from "./types/context";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { verifyJWT } from "./utils/tokens";
import dotenv from "dotenv";
dotenv.config();

const serve = async () => {
  // buid schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  const app = express();
  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJWT<User>(ctx.req.cookies.accessToken);
        context.user = user;
      }

      return context;
    },

    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 8000 }, () => {
    console.log("Server at http://localhost:8000");
  });

  connect();
};

serve();
