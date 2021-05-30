import * as All from './TodoActions';
import axios from 'axios';


const getCsrfToken = ()=>{

	const data = document.cookie;
	const csrf_data = data.split('=');
	return csrf_data[1];
}


export const fetchItems = ()=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTodoRequest());

		const url = `/todo-api/`;
		
		axios(url).then(response=>{
			const data = response.data;
			console.log(data);
			dispatch(All.fetchTodoSuccess(data));

			}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			
			dispatch(All.fetchTodoFailure({status:status,data:data}));
		})

	}
}

export const addItem = item=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTodoRequest());
		const url = `/todo-api/`;
		const config = {
			method:'post',
			url:url,
			headers: {
				'x-CSRFToken': csrf
			},
			data:item

		}
		axios(config).then(res=>{
			const data = res.data;
			dispatch(All.addTodoItem(data));

		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			
			dispatch(All.fetchTodoFailure({status:status,data:data}));
			// dispatch(All.fetchTodoFailure(error));
		})
		
	}
}

export const deleteItem = item_id=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTodoRequest());

		const url = `/todo-api/${item_id}/`;
		const config = {
			method:'delete',
			url:url,
			headers: {
				'x-CSRFToken': csrf
			}

		}
		axios(config).then(res=>{
			dispatch(All.deleteTodoItem(item_id));
		}).catch(error=>{
			dispatch(All.fetchTodoFailure(error));
		});
	}
}

export const updateItem = item=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTodoRequest());
		const url = `/todo-api/${item.id}/`;

		const config = {
			method:'put',
			url:url,
			headers: {
				'x-CSRFToken': csrf
			},
			data:item

		}
		axios(config).then(response=>{
			dispatch(All.editTodoItem(response.data));
		}).catch(error=>{
			dispatch(All.fetchTodoFailure(error));
		})

	}
}
