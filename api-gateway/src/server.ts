import './utils/config';
import express = require('express');
import { json } from 'body-parser';
import {Request, Response, NextFunction} from 'express';
import userRoutes from './routes/user.route';
//import { authenticationMiddleware } from './middlewares/authentication.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { HooksRegistry } from './hooks/hooks.registry';
import { ServiceRegistry } from './services/service.registry';

const app = express();

app.use(errorMiddleware);

app.use(json());
app.use('/user', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

// Register events
new HooksRegistry(ServiceRegistry.getInstance().services);

app.listen(3000);