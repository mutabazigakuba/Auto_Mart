import User from '../controllers/UserController';
import Car from '../controllers/CarController';
import Order from '../controllers/PurchaseController';
import express from 'express';
import Auth from '../auth/authentication';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.create);
routes.post('/api/v1/auth/signin', User.login);
routes.post('/api/v1/car/', Car.postCar);
routes.post('/api/v1/order/', Auth.verifyToken, Order.makeOrder);
routes.patch('/api/v1/order/:id/price', Auth.verifyToken, Order.updatePrice);
routes.patch('/api/v1/car/:id/status', Auth.verifyToken, Car.markSold);
routes.patch('/api/v1/car/:id/price', Auth.verifyToken, Car.updatePrice);
routes.get('/api/v1/car/:id/', Auth.verifyToken, Car.displayOne);
routes.get('/api/v1/car', Auth.verifyToken, Car.displayUnsoldCars);
routes.delete('/api/v1/car/:id/', Auth.verifyToken, Car.deleteAd);
routes.get('/api/v1/cars/', Auth.verifyToken, Car.viewAll);
routes.get('/', (req,res) =>{
    res.send("Welcome to Auto Mart");
});

export default routes;