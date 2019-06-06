import User from '../controllers/UserController';
import Car from '../controllers/CarController';
import express from 'express';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.create);
routes.post('/api/v1/auth/signin', User.login);
routes.post('/api/v1/car', Car.postCar);

export default routes;