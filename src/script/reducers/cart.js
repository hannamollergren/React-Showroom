const cartReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_CART':
			return state = action.payload;
	
		default:
			return state;
	}

}
export default cartReducer;