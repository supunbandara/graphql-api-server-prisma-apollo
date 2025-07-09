import { rule } from "graphql-shield";

export const isAuthorized = rule()((obj, args, { authUser }, info) => {
  return authUser && true;
});

export const isUserAdmin = rule()(
  (obj, args, { authUser }, info) =>
    authUser && authUser.role === "ADMIN"
);
