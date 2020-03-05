import { Router } from 'express';
import { singUp } from '../controllers/user.controller';

const routes = Router();

routes.post('/login');

routes.post('/signup', singUp);

routes.get('/:id');

routes.patch('/:id');


export default routes;