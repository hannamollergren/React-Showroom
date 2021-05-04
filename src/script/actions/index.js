export const getProducts = (list) => {
	return {
		type: 'GET_PRODUCTS',
		payload: list
	}
}

export const getCart = (list) => {
	return {
		type: 'GET_CART',
		payload: list
	}
}

export const isAuthenticated = () => {
	return {
		type: 'IS_AUTHENTICATED'
	}
}
