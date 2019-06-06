import User from '../controllers/UserController';
import express from 'express';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.create);
routes.post('/api/v1/auth/signin', User.login);

export default routes;