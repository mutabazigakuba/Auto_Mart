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
            price_offered:data.body.price_offered
        }
        this.orders.push(newOrder);
        return newOrder;
    }

    updatePriceOfOrder(id,data){
        const order = this.orders.find(order => order.id === id);
        if(!order){
            return{
                status: false,
                message: "order does not exist"
            }
        }
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
                car_id: this.order.car_id,
                created_on: moment.now,
                status: this.order.status,
                price:this.order.price,
                old_price_offered:this.order.price,
                new_price_offered:data['new_price']
            }
        }
    }
}

export default new PurchaseModel;