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
        const queryLength = Object.entries(req.query).length;

        if(req.query.status === "available" && queryLength === 1){
            const un_sold_cars = CarModel.findUnsold(req.query.status);
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
        }
        
        if( req.query.status === "available" && req.query.min_price && req.query.max_price && queryLength === 3){
            const priceRange = CarModel.priceRange(req.query);
            if(priceRange.status === false){
                return res.status(401).send({
                    status:401,
                    error:priceRange.data
                })
            }
            return res.status(200).send({
                status:200,
                data: priceRange.data
            })
        }

        return res.status(200).send({
            status: 404,
            data: "Status should be available"
        })
        
    }

}

export default CarController;