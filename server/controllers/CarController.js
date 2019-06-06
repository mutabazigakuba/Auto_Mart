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

}

export default CarController;