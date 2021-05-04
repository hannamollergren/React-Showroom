const productListReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_PRODUCTS':
			return state = action.payload;
	
		default:
			return state;
	}

}
export default productListReducer;