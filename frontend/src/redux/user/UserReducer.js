import * as All from './UserTypes';



const intialState = {
	loading:false,
	user:{},
	isLoggedIn:false,
	error:{}
}

const userReducer = (state=intialState,action)=>{

	switch(action.type){
		case All.USER_FETCH_REQUEST:
			return {
				...state,
				loading:true
			}
		case All.USER_FETCH_SUCCESS:
			return {
				loading:false,
				user:action.payload,
				isLoggedIn:true,
				error:{}
			}
		case All.USER_FETCH_FAILURE:
			return {
				loading:false,
				user:{},
				isLoggedIn:false,
				error:action.payload
			}

		case All.FETCH_USER_LOGOUT:
			return {
				loading:false,
				isLoggedIn:false,
				user:{},
				error:{}
			}
		default:
			return state
	}
}

export default userReducer;