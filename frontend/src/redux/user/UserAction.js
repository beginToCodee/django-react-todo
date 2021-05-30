import * as All from './UserTypes';



export const fetchUserRequest = ()=>{
	return {
		type:All.USER_FETCH_REQUEST
	}
}

export const fetchUserSuccess = user=>{

	return {
		type:All.USER_FETCH_SUCCESS,
		payload:user
	}
}

export const fetchUserFailure = error=>{
	return {
		type:All.USER_FETCH_FAILURE,
		payload:error
	}
}

export const fetchUserLogout = ()=>{
	return {
		type:All.FETCH_USER_LOGOUT
	}
}

