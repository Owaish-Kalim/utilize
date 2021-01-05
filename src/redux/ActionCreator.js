import * as ActionTypes from './ActionTypes';

export const addOrder = (name, email, product, quantity) => ({
    type: ActionTypes.ADD_ORDER,
    payload: {
        name: name,
        email: email,
        product:product,
        quantity:quantity
    }
});

export const deleteOrder = (id) => ({
    type: ActionTypes.REMOVE_ORDER,
    id: id
});

export const updateOrder = (index, name, email, product, quantity) => ({
    type: ActionTypes.UPDATE_ORDER,
    payload: {
        index: index,
        name: name,
        email: email,
        product:product,
        quantity:quantity
    }
});