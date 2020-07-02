import { JwtAuth, JwtAuthOptions } from "../utils/auth";
import { RequestHandler } from "express";
import { isUndefined } from "lodash";

export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const jwtAuthOptions: JwtAuthOptions = {
    secret: !isUndefined(process.env.JWT_SECRET)
      ? process.env.JWT_SECRET
      : "aaaabbbbccc123",
    getToken: (req): string | null => {
      // @ts-ignore
      var token =
        req?.session?.access_token ||
        req?.cookies?.access_token ||
        req?.headers["x-access-token"];
      if (token) {
        return token;
      }
      return null;
    },
    authRequest: true,
  };

  const jwtAuth = new JwtAuth(jwtAuthOptions);

  jwtAuth.authorize(req, res, next);
};
