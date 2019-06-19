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

    updatePrice(req, res) {
        const find = PurchaseModel.findOne(parseInt(req.params.id));
        if (!find) {
            return res.status(401).send({
                "status": 401,
                "error": "Order not found",
            })
        }
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
        const update_price = PurchaseModel.updatePriceOfOrder(parseInt(req.params.id), req);
        return res.status(200).send({
            "status": 200,
            "data": update_price.message
        })
    }

}

export default PurchaseController;