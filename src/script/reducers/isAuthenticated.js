const isAuthenticatedReducer = (state = false, action) => {
	switch (action.type) {
		case 'IS_AUTHENTICATED':
			return state = true;
	
		default:
			return state;
	}

}
export default isAuthenticatedReducer;