import User from '../controllers/UserController';
import Car from '../controllers/CarController';
import Order from '../controllers/PurchaseController';
import express from 'express';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.create);
routes.post('/api/v1/auth/signin', User.login);
routes.post('/api/v1/car', Car.postCar);
routes.post('/api/v1/order', Order.makeOrder);

export default routes;