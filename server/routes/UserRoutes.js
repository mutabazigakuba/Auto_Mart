import User from '../controllers/UserController';
import express from 'express';

const routes = express.Router();

routes.post('/api/v1/auth/signup/', User.create);

export default routes;