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

    async displayOne(req, res) {
        const text = 'SELECT * FROM cars WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "Car not found"
                });
            }
            return res.status(200).send({
                "status": 200,
                "data": rows[0]
            });
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async displayUnsoldCars(req, res) {
        const queryLength = Object.entries(req.query).length;
        if (req.query.status === "available" && queryLength === 1) {
            const text = 'SELECT * FROM cars WHERE status = $1';
            try {
                const { rows } = await db.query(text, [req.query.status]);
                if (!rows[0]) {
                    return res.status(404).send({
                        "status": 404,
                        "error": "Car not found"
                    });
                }
                return res.status(200).send({
                    "status": 200,
                    "data": rows
                });
            } catch (error) {
                return res.status(400).send({
                    "status": 400,
                    "error": "server error"
                })
            }
        }

        if (req.query.status === "available" && req.query.min_price && req.query.max_price && queryLength === 3) {
            const text = 'SELECT * FROM cars WHERE status = $1';
            try {
                const { rows } = await db.query(text, [req.query.status]);
                if (!rows[0]) {
                    return res.status(404).send({
                        "status": 404,
                        "error": "Car not found"
                    });
                }
                const maxPrice = req.query.max_price;
                const minPrice = req.query.min_price;

                for (var i = 0; i < rows.length; i++) {
                    const actualCarPrice = rows[i].price;
                    if (actualCarPrice < maxPrice) {
                        if (actualCarPrice > minPrice) {
                            return res.status(200).send({
                                "status": 200,
                                "data": rows
                            });
                        }
                    }
                }
            } catch (err) {
                console.log(err)
                return res.status(400).send({
                    "status": 400,
                    "error": "server error"
                })
            }

        }
    },

    async deleteAd(req, res) {
        const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({
                    "status": 404,
                    "error": "Car not found",
                });
            }
            return res.status(204).send({
                "status": 204,
                "data": "Deleted Successfully"
            });
        } catch (error) {
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            });
        }

    },

    async viewAll(req, res) {
        const findAllQuery = 'SELECT * FROM cars';
        try {
            const { rows } = await db.query(findAllQuery);
            return res.status(200).send({ 
                "status": 200,
                "data": rows
             });
        } catch (error) {
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            });
        }
    }

}

export default CarController;