
import * as All from './TodoTypes';

export  const fetchTodoRequest = ()=>{
	return {
		type:All.FETCH_TODO_REQUEST
	}
}



export const fetchTodoSuccess = items=>{

	return {
		type:All.FETCH_TODO_SUCCESS,
		payload:items
	}
}

export const fetchTodoFailure = error=>{
	return {
		type:All.FETCH_TODO_FAILURE,
		payload:error
	}
}

export const addTodoItem = item=>{
	return {
		type:All.ADD_TODO_ITEM,
		payload:item
	}
}
export const deleteTodoItem = item_id=>{
	return {
		type:All.DELETE_TODO_ITEM,
		payload:item_id
	}
}

export const editTodoItem = item=>{
	return {
		type:All.EDIT_TODO_ITEM,
		payload:item
	}
}

