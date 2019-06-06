import moment from 'moment';

class CarModel {

    constructor(){
        this.cars = [];
    }

    addNewCar(data){
        const newCar = {
            id: this.cars.length + 1,
            owner: data.body.owner,
            created_on: moment.now,
            state: data.body.state,
            status: data.body.status,
            price:data.body.price,
            manufacturer:data.body.manufacturer,
            model:data.body.model,
            body_type:data.body.body_type
        }
        this.cars.push(newCar);
        return newCar;
    }
}

export default new CarModel;