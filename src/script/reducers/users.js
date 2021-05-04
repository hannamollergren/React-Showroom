const usersReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_USERS':
			return state;
	
		default:
			return state;
	}
}
export default usersReducer;