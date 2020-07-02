import "./utils/config";
import express = require("express");
import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import * as socketio from "socket.io";

import userRoutes from "./routes/user.route";
import workerRoutes from "./routes/worker.route";
import userDetailsRoutes from "./routes/userDetails.route";
import rankRoutes from "./routes/rank.route";
import notificationRoutes from "./routes/notification.route";

import { authenticationMiddleware } from "./middlewares/authentication.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

import { HooksRegistry } from "./hooks/hooks.registry";
import { ServiceRegistry } from "./services/service.registry";
import { createServer, Server } from "http";

const app = express();
const port: string = process.env.PORT || "3000";
const socketPingTimeout: number =
  (process.env.SOCKET_PING_INTERVAL as number | undefined) || 18000;
const socketPingInterval: number =
  (process.env.SOCKET_PING_TIMEOUT as number | undefined) || 5000;

const server: Server = createServer(app);
const io: socketio.Server = socketio.listen(server);

app.use(errorMiddleware);

app.use(json());
app.use("/user", userRoutes);
app.use("/worker", authenticationMiddleware, workerRoutes);
app.use("/userdetails", authenticationMiddleware, userDetailsRoutes);
app.use("/rank", authenticationMiddleware, rankRoutes);
app.use("/notification", authenticationMiddleware, notificationRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// Register events
new HooksRegistry(ServiceRegistry.getInstance().services, io);

server.listen(port);
