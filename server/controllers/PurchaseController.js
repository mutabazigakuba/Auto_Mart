import PurchaseModel from '../models/PurchaseModel';

const PurchaseController = {
    makeOrder(req, res){
        if(!req.body.price || !req.body.price_offered){
            return res.status(400).send({
                "status": 400,
                "Error": "There is an empty field!"
            });
        }
        const order = PurchaseModel.addNewOrder(req);
        return res.status(200).send({
            "status":200,
            "data": order
        })
    },

}

export default PurchaseController;