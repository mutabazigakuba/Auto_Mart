import CarModel from '../models/CarModel';
import Joi from 'joi';

const CarController = {
    postCar(req, res) {
        const schema = {
            owner: Joi.string().required(),
            state: Joi.string().required(),
            price: Joi.number().required(),
            manufacturer: Joi.string().required(),
            model: Joi.string().required(),
            body_type: Joi.string().required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        const car = CarModel.addNewCar(req);
        return res.status(201).send({
            "status": 201,
            "data": car
        })
    },

    markSold(req, res) {
        const find = CarModel.findOne(parseInt(req.params.id));
        const schema = {
            status: Joi.string().required()
        };
        const result = Joi.validate(req.body, schema)
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        if (find.status === false) {
            return res.status(400).send({
                "status": 400,
                "error": find.message,
            })
        }
        const mark_sold = CarModel.markCarSold(parseInt(req.params.id), req)
        return res.status(205).send({
            "status": 205,
            "data": mark_sold.data
        })
    },

    updateCarPrice(req, res) {
        const schema = {
            new_price: Joi.number().required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        const find = CarModel.findOne(parseInt(req.params.id));
        if (!find) {
            return res.status(401).send({
                "status": 401,
                "error": "Car with that price not found",
            })
        }
        const update_price = CarModel.updateCarPrice(parseInt(req.params.id), req)
        return res.status(200).send({
            "status": 200,
            "data": update_price.data
        })
    },

    displayOne(req, res) {
        const spec_car = CarModel.findOneCar(parseInt(req.params.id));
        if (spec_car.status === false) {
            return res.status(401).send({
                "status": 401,
                "error": spec_car.message,
            })
        }
        return res.status(200).send({
            "status": 200,
            "data": spec_car.data
        })
    },

    displayUnsoldCars(req, res) {
        const queryLength = Object.entries(req.query).length;
        if (req.query.status === "available" && queryLength === 1) {
            const unSoldCars = CarModel.findUnsold(req.query.status);
            if (unSoldCars.status === false) {
                return res.status(402).send({
                    status: 402,
                    error: unSoldCars.message
                })
            }
            return res.status(200).send({
                status: 200,
                data: [unSoldCars.data]
            })
        }

        if (req.query.status === "available" && req.query.min_price && req.query.max_price && queryLength === 3) {
            const priceRange = CarModel.priceRange(req.query);
            if (priceRange.status === false) {
                return res.status(401).send({
                    status: 401,
                    error: priceRange.data
                })
            }
            return res.status(200).send({
                status: 200,
                data: priceRange.data
            })
        }
    },

    deleteAd(req, res) {
        const spec_car = CarModel.delete(parseInt(req.params.id));
        if (spec_car.status === false) {
            return res.status(404).send({
                "status": 404,
                "error": spec_car.message,
            })
        }
        return res.status(200).send({
            "status": 200,
            "data": spec_car.data
        })
    },

    viewAll(req, res) {
        const cars = CarModel.findAll();
        return res.status(200).send({
            "status": 200,
            "data": cars
        });
    }

}

export default CarController;