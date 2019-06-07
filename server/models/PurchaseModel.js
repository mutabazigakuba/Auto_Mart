import moment from 'moment';
import { stringify } from 'querystring';

class PurchaseModel {

    constructor(){
        this.orders = [];
    }

    addNewOrder(data){
        const newOrder = {
            id: this.orders.length + 1,
            car_id: data.body.car_id,
            created_on: moment.now(),
            status: data.body.status,
            price:data.body.price,
            price_offered:data.body.price_offered
        }
        this.orders.push(newOrder);
        return newOrder;
    }

    findOne(id){
         return this.orders.find(order => order.id === id);
    }

    updatePriceOfOrder(id,data){
        const order = this.findOne(id);
        const index = this.orders.indexOf(order);
        const order_status = this.orders[index].status;
        if(!order_status == "pending"){
            return {
                status: false,
                message: "Order cannot be changed"
            }
        }
        this.orders[index].price_offered = data['price_offered'] || order.price_offered;
        this.orders[index].car_id = data['car_id'] || order.car_id;
        this.orders[index].status = data['status'] || order.status;
        this.orders[index].price = data['price'] || order.price
        return {
            status: true,
            data: {
                id:order.id,
                car_id:this.orders[index].car_id,
                created_on: moment.now(),
                status: this.orders[index].status,
                old_price_offered:order.price,
                new_price_offered:data.body.new_price_offered
            }
        }
    }
}

export default new PurchaseModel;