import { Router } from "express";
import { login, singUp, updateUser } from "../controllers/user.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("/login", login);

routes.post("/signup", singUp);

routes.put("/:id", authenticationMiddleware, updateUser);

routes.get("/:id");

routes.patch("/:id");

export default routes;
