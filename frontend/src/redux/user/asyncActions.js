import * as All from './UserAction';
import axios from 'axios';



const getCsrfToken = ()=>{

	const data = document.cookie;
	const csrf_data = data.split('=');
	return csrf_data[1];
}

export const sendLogin = user=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchUserRequest());
		const url = `/todo-api/login/`;
		const config = {
			method:'post',
			url:url,
			headers: {
				'x-CSRFToken': csrf
			},
			data:user
		}
		axios(config).then(response=>{
			console.log(response);
			dispatch(All.fetchUserSuccess(response.data));
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			dispatch(All.fetchUserFailure({status:status,data:data}));
		})
	}
}

export const fetchIsAuth = ()=>{
	return dispatch=>{
		dispatch(All.fetchUserRequest());
		
		const url = `/todo-api/check-auth/`;
		const config = {
			method:'get',
			url:url,
			headers: {
				'x-CSRFToken': getCsrfToken()
			}
			
		}
		axios(config).then(response=>{
			
			dispatch(All.fetchUserSuccess(response.data));
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			
			dispatch(All.fetchUserFailure({status:status,data:data}));
		});

	}
}

export const fetchLogout = ()=>{
	return dispatch=>{
		dispatch(All.fetchUserRequest());
		const url = '/todo-api/logout/';
		const config = {
			method:'get',
			url:url,
			headers: {
				'x-CSRFToken': getCsrfToken()
			}
			
		}
		axios(config).then(response=>{
			
			dispatch(All.fetchUserLogout());
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			dispatch(All.fetchUserFailure({status:status,data:data}));
		});

	}


}

export const fetchUserSignUp = user_info=>{

	return dispatch=>{
		dispatch(All.fetchUserRequest());
		const url = `/todo-api/signup/`;
		const config = {
			method:'post',
			url:url,
			headers: {
				'x-CSRFToken': getCsrfToken()
			},
			data:user_info
		}
		axios(config).then(response=>{
			console.log(response);
			dispatch(All.fetchUserSuccess(response.data));
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			console.log(data);
			dispatch(All.fetchUserFailure({status:status,data:data}));
		})


	}
}

export const updateUser = user_info=>{
	return dispatch=>{
		dispatch(All.fetchUserRequest());
		const url = `/todo-api/users/${user_info.id}/`;
		const config = {
			method:'put',
			url:url,
			headers: {
				'x-CSRFToken': getCsrfToken()
			},
			data:user_info

		}
		axios(config).then(response=>{
			const data = response.data;
			dispatch(All.fetchUserSuccess(data));
			console.log(data);
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			console.log(data);
			dispatch(All.fetchUserFailure({status:status,data:data}));
		})
	}
}

export const uploadAvatar = avatar=>{
	return dispatch=>{
		dispatch(All.fetchUserRequest());
		const url = `/todo-api/upload-avatar/`;
		const config = {
			method:'post',
			url:url,
			headers: {
				'x-CSRFToken': getCsrfToken()
			},
			data:avatar

		}
		axios(config).then(response=>{
			const data = response.data;
			dispatch(All.fetchUserSuccess(data));
			console.log(data);
		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			console.log(data);
			dispatch(All.fetchUserFailure({status:status,data:data}));
		})
	}
}