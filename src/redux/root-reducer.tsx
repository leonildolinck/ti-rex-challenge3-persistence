import { combineReducers }  from 'redux'

import userReducer from '../components/user/reducer';
import cartReducer from '../components/cart/reducer';

const rootReducer = combineReducers({ userReducer, cartReducer });

export default rootReducer