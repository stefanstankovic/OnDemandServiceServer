import './utils/config';
import express = require('express');
import { json } from 'body-parser';
import {Request, Response, NextFunction} from 'express';
import userRoutes from './routes/user.route';
//import { authenticationMiddleware } from './middlewares/authentication.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { HooksRegistry } from './hooks/hooks.registry';
import { ServiceRegistry } from './services/service.registry';
import { createServer, Server } from 'http';

import * as socketio from 'socket.io';

const app = express();
const port : string           = process.env.PORT || "3000";
const socketPingTimeout : number    = process.env.SOCKET_PING_INTERVAL as number | undefined || 18000;
const socketPingInterval : number   = process.env.SOCKET_PING_TIMEOUT as number | undefined ||  5000;

const server : Server               = createServer(app);
const io : socketio.Server          = socketio(server,
                                    {
                                        pingTimeout : socketPingTimeout,
                                        pingInterval : socketPingInterval
                                    });

app.use(errorMiddleware);

app.use(json());
app.use('/user', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

// Register events
new HooksRegistry(ServiceRegistry.getInstance().services, io);

server.listen(port);