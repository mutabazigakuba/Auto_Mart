import CarModel from '../models/CarModel';

const CarController = {
    postCar(req, res){
        if(!req.body.price || !req.body.manufacturer || !req.body.model){
            return res.status(400).send({
                "status": 400,
                "Error": "There is an empty field!"
            });
        }
        const car = CarModel.addNewCar(req);
        return res.status(200).send({
            "status":200,
            "data": car
        })
    },

    markSold(req, res){
        const mark_sold = CarModel.soldCar(req, req);
        if(mark_sold.status === false){
            return res.status(401).send({
                status: 401,
                Error: mark_sold.message,
            })
        }
        return res.status(200).send({
            status: 200,
            data: mark_sold.data
        })
    }

}

export default CarController;