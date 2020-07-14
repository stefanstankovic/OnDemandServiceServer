import { Router } from "express";
import {
  login,
  logout,
  singUp,
  updateUser,
} from "../controllers/user.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("/login", login);

routes.post("/logout", logout);

routes.post("/signup", singUp);

routes.put("/:id", authenticationMiddleware, updateUser);

routes.get("/:id");

routes.patch("/:id");

export default routes;
