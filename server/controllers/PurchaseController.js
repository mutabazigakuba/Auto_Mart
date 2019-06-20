import PurchaseModel from '../models/PurchaseModel';
import Joi from 'joi';
import db from '../config/db';
import moment from 'moment'

const PurchaseController = {
    async makeOrder(req, res) {
        const schema = {
            owner: Joi.string().required(),
            price: Joi.string().required(),
            price_offered: Joi.number().required(),
            status: Joi.required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }

        if (!(req.body.status == "available")) {
            return res.status(400).json({
                status: 400,
                message: 'Car not available'
            })
        }
        const createQuery = `INSERT INTO
            orders (car_id, created_on, status, price , price_offered )
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const values = [
            req.body.owner,
            moment.now(),
            "pending",
            req.body.price,
            req.body.price_offered
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

    async updatePrice(req, res) {

        const schema = {
            new_price_offered: Joi.number().required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }

        const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
        const updateOneQuery = `UPDATE orders SET price_offered=$1 WHERE id=$2 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({ 
                    "status": 404,
                    "error": "Order not found"
                });
            }
            const values = [ req.body.new_price_offered, req.params.id ];
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

    }

}

export default PurchaseController;