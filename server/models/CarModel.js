import moment from 'moment';

class CarModel {

    constructor(){
        this.cars = [];
    }

    addNewCar(data){
        const newCar = {
            id: this.cars.length + 1,
            owner: data.body.owner,
            created_on: moment.now(),
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

    findOne(id){
        return this.cars.find( car => car.id === id);
    }

    update(id, data){
        const car_sold = this.findOne(id);
        if(!car_sold){
            return{
                status:false,
                message:" Car not available"
            }
        }
        const index = this.cars.indexOf(car_sold);
        this.cars[index].status = data['status'] || car_sold.status;
        this.cars[index].owner = data['owner'] || car_sold.owner;
        this.cars[index].state = data['state'] || car_sold.state;
        this.cars[index].status = data.body.change_status || car_sold.status;
        this.cars[index].price = data['price'] || car_sold.price;
        this.cars[index].manufacturer = data['manufacturer'] || car_sold.manufacturer;
        this.cars[index].model = data['model'] || car_sold.model;
        this.cars[index].body_type = data['body_type'] || car_sold.body_type;
        this.cars[index].created_on = moment.now()
        return{
            status:true,
            data:{
                id: car_sold.id,
                owner: this.cars[index].owner,
                created_on: this.cars[index].created_on,
                state: this.cars[index].state,
                status: this.cars[index].status,
                price:this.cars[index].price,
                new_price: data.body.new_price,
                manufacturer:this.cars[index].manufacturer,
                model:this.cars[index].model,
                body_type:this.cars[index].body_type
            }
        }
    }

    findOneCar(id){
        const specific_Car = this.cars.find( car => car.id === id);
        if(!specific_Car){
            return{
                status:false,
                message:" Car not available"
            }
        }
        const index = this.cars.indexOf(specific_Car);
        return {
            status:true,
            data:{
                id: specific_Car.id,
                owner: specific_Car.owner,
                created_on: this.cars[index].created_on,
                state: this.cars[index].state,
                status: this.cars[index].status,
                price:this.cars[index].price,
                manufacturer:this.cars[index].manufacturer,
                model:this.cars[index].model,
                body_type:this.cars[index].body_type
            }
        }
    }

    findUnsold(unsold){
        const find_unsold = this.cars.find(car => car.status === unsold);
        if(!find_unsold){
            return{
                status:false,
                error:"All cars are sold"
            }
        }
        // const allUnsoldCars = [];
        // this.find_unsold.push(allUnsoldCars);
        return {
            status:true,
            data: find_unsold
        }
    }
}

export default new CarModel;