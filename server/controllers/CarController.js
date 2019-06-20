import CarModel from '../models/CarModel';
import Joi from 'joi';
import '@babel/polyfill';
import moment from 'moment';
import db from '../config/db'

const CarController = {
    async postCar(req, res) {
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
        const createQuery = `INSERT INTO
            cars(owner, created_on, state , status, price, manufacturer, model, body_type)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;
        const values = [
            req.body.owner,
            moment.now(),
            req.body.state,
            "available",
            req.body.price,
            req.body.manufacturer,
            req.body.model,
            req.body.body_type
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send({
                "status": 201,
                "data": rows
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                "status": 400,
                "error": error.message
            });
        }
    },

    async markSold(req, res) {
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
        const findOneQuery = 'SELECT * FROM cars WHERE id=$1';
        const updateOneQuery = `UPDATE cars SET status=$1 WHERE id=$2 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "Car not found"
                });
            }
            const values = [req.body.status, req.params.id];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send({
                "status": 200,
                "data": response.rows[0]
            });
        } catch (err) {
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            });
        }

    },

    async updatePrice(req, res) {
        const schema = {
            price: Joi.number().required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        const findOneQuery = 'SELECT * FROM cars WHERE id=$1';
        const updateOneQuery = `UPDATE cars SET price=$1 WHERE id=$2 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "Car not found"
                });
            }
            const values = [req.body.price, req.params.id];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send({
                "status": 200,
                "data": response.rows[0]
            });
        } catch (err) {
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            });
        }

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
                data: unSoldCars.data
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