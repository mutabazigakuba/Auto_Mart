import moment from 'moment';

class PurchaseModel {

    constructor(){
        this.orders = [];
    }

    addNewOrder(data){
        const newOrder = {
            id: this.orders.length + 1,
            car_id: data.body.car_id,
            created_on: moment.now,
            status: data.body.status,
            price:data.body.price,
            price_offered:data.body.price_offered,
        }
        this.orders.push(newOrder);
        return newOrder;
    }
}

export default new PurchaseModel;