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
        const mark_sold = CarModel.update(req, req);
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
    },

    updatePrice (req, res){
        const find = CarModel.findOne(parseInt(req.params.id));
        if(!find){
            return res.status(401).send({
                status: 401,
                Error: "Car with that price not found",
            })
        }
        const update_price = CarModel.update(parseInt(req.params.id), req)
        return res.status(200).send({
            status: 200,
            data: update_price.data
        })
    },

    displayOne(req, res){
        const spec_car = CarModel.findOneCar(parseInt(req.params.id));
        if(spec_car.status === false){
            return res.status(401).send({
                status: 401,
                Error: spec_car.message,
            })
        }
        return res.status(200).send({
            status: 200,
            data: spec_car.data
        })
    },

    displayUnsoldCars(req, res){
        const un_sold_cars = CarModel.findUnsold(req.params.status);
        if(un_sold_cars.status === false){
            return res.status(401).send({
                status:402,
                error:un_sold_cars.message
            })
        }
        return res.status(200).send({
            status:200,
            data: un_sold_cars.data
        })
    },

    deleteAd(req, res){
        const spec_car = CarModel.delete(parseInt(req.params.id));
        if(spec_car.status === false){
            return res.status(401).send({
                status: 401,
                Error: spec_car.message,
            })
        }
        return res.status(200).send({
            status: 200,
            data: spec_car.data
        })
    }

}

export default CarController;