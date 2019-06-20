import moment from 'moment';

class CarModel {

    constructor() {
        this.cars = [
            {
                id: 1,
                owner: "Ronald",
                created_on: moment.now(),
                state: "new",
                status: "available",
                price: "5",
                manufacturer: "Toyota",
                model: "2019",
                body_type: "truck"
            }
        ];
    }

    addNewCar(data) {
        const newCar = {
            id: this.cars.length + 1,
            owner: data.body.owner,
            created_on: moment.now(),
            state: data.body.state,
            status: data.body.status,
            price: data.body.price,
            manufacturer: data.body.manufacturer,
            model: data.body.model,
            body_type: data.body.body_type
        }
        this.cars.push(newCar);
        return newCar;
    }

    findOne(id) {
        return this.cars.find(car => car.id === id);
    }

    updateCarPrice(id, data) {
        const car_sold = this.findOne(id);
        if (!car_sold) {
            return {
                status: false,
                message: " Car not available"
            }
        }
        return {
            status: true,
            data: [{
                id: car_sold.id,
                owner: car_sold.owner,
                created_on: moment.now(),
                state: car_sold.state,
                status: car_sold.status,
                price: data.body.price,
                manufacturer: car_sold.manufacturer,
                model: car_sold.model,
                body_type: car_sold.body_type
            }]
        }
    }

    markCarSold(id, data) {
        const car_sold = this.findOne(id);
        if (!car_sold) {
            return {
                status: false,
                message: " Car not available"
            }
        }
        return {
            status: true,
            data: [{
                id: car_sold.id,
                owner: car_sold.owner,
                created_on: moment.now(),
                state: car_sold.state,
                status: data.body.status,
                price: car_sold.price,
                manufacturer: car_sold.manufacturer,
                model: car_sold.model,
                body_type: car_sold.body_type
            }]
        }
    }

    findOneCar(id) {
        const specific_Car = this.cars.find(car => car.id === id);
        if (!specific_Car) {
            return {
                status: false,
                message: " Car not available"
            }
        }
        const index = this.cars.indexOf(specific_Car);
        return {
            status: true,
            data: [{
                id: specific_Car.id,
                owner: specific_Car.owner,
                created_on: this.cars[index].created_on,
                state: this.cars[index].state,
                status: this.cars[index].status,
                price: this.cars[index].price,
                manufacturer: this.cars[index].manufacturer,
                model: this.cars[index].model,
                body_type: this.cars[index].body_type
            }]
        }
    }

    findUnsold(available) {
        const find_unsold = this.cars.find(car => car.status === available);
        if (!find_unsold) {
            return {
                status: false,
                error: "All cars are sold"
            }
        }
        return {
            status: true,
            data: find_unsold
        }
    }

    priceRange(prices) {
        const minPrice = prices.min_price;
        const maxPrice = prices.max_price;
        const available = prices.status;
        const find_unsold_cars = this.cars.find(car => car.status === available);
        if (!find_unsold_cars) {
            return {
                status: false,
                data: "All cars are sold"
            }
        }
        const actual_car_price = find_unsold_cars.price;
        if (actual_car_price < maxPrice) {
            if(actual_car_price > minPrice){
                return  {
                    status: true,
                    data: find_unsold_cars
                }
            }
        }
        return {
            status: false,
            data: "Car within Price range not found"
        }
    }

    delete(id) {
        const car = this.findOne(id);
        if (!car) {
            return {
                status: false,
                message: "Car not  found"
            }
        }
        const index = this.cars.indexOf(car);
        this.cars.splice(index, 1);
        return {
            status: true,
            data: "Car Ad deleted successfully"
        };
    }

    findAll() {
        return this.cars;
    }
}

export default new CarModel;