import User from '../controllers/UserController';
import Car from '../controllers/CarController';
import Order from '../controllers/PurchaseController';
import express from 'express';

const routes = express.Router();

routes.post('/api/v1/auth/signup', User.create);
routes.post('/api/v1/auth/signin', User.login);
routes.post('/api/v1/car/', Car.postCar);
routes.post('/api/v1/order/', Order.makeOrder);
routes.patch('/api/v1/order/:id/price', Order.updatePrice);
routes.patch('/api/v1/car/:id/status', Car.markSold);
routes.patch('/api/v1/car/:id/price', Car.updatePrice);
routes.get('/api/v1/car/:id/', Car.displayOne);
routes.get('/api/v1/car', Car.displayUnsoldCars);
routes.delete('/api/v1/car/:id/', Car.deleteAd);
routes.get('/api/v1/cars/', Car.viewAll);
routes.get('/', (req,res) =>{
    res.send("Welcome to Auto Mart");
});

export default routes;