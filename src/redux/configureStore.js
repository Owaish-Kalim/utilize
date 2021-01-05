import {createStore, combineReducers} from 'redux';
import { Orders } from './orders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            orders: Orders,
        })
    );

    return store;
}