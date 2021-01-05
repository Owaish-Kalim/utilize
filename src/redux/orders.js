import { ORDERS } from '../shared/orders';
import * as ActionTypes from './ActionTypes';

export const Orders = (state = ORDERS, action) => {
    console.log(1)
    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            console.log(action.payload)
            var order = action.payload;
            order.id = state.length;
            console.log("Order: ", order);
            return state.concat(order);
        case ActionTypes.REMOVE_ORDER:
            console.log(3)
            return state.filter(function(index) {
                return index.id !== action.id;
            });
        case ActionTypes.UPDATE_ORDER:
            console.log("yaha")
            state.map((order) => {
                if(order.id === action.payload.id)
                {
                    order.name = action.payload.name;
                    order.email = action.payload.email;
                    order.product = action.payload.product;
                    order.quantity = action.payload.quantity;
                }
                return order
            });
            return state;
        default:
          return state;
      }
};