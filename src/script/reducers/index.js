import productListReducer from './productList';
import cartReducer from './cart';
import favoritesReducer from './favorites';
import usersReducer from './users';
import isAuthenticatedReducer from './isAuthenticated';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
	productList: productListReducer,
	cart: cartReducer, 
	favorites: favoritesReducer,
	users: usersReducer,
	isAuthenticated: isAuthenticatedReducer
}) 

export default allReducers;