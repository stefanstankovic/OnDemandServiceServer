import { Router } from 'express';
import { login, singUp } from '../controllers/user.controller';

const routes = Router();

routes.post('/login', login);

routes.post('/signup', singUp);

routes.get('/:id');

routes.patch('/:id');


export default routes;