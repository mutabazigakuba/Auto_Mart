import PurchaseModel from '../models/PurchaseModel';
import Joi from 'joi';

const PurchaseController = {
    makeOrder(req, res) {
        const schema = {
            status: Joi.string().required(),
            price: Joi.number().required(),
            price_offered: Joi.number().required(),
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        const order = PurchaseModel.addNewOrder(req);
        if (order.status === false) {
            return res.status(401).send({
                "status": 401,
                "error": order.data
            })
        }
        return res.status(200).send({
            "status": 200,
            "data": [order]
        })
    },

    updateOrderPrice(req, res) {
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
        if (update_price.status === false) {
            return res.status(401).send({
                "status": 401,
                "error": update_price.message
            })
        }
        return res.status(200).send({
            "status": 200,
            "data": update_price.message
        })

    }

}

export default PurchaseController;