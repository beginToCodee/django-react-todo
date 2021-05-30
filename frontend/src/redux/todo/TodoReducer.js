
import * as All from './TodoTypes';


const initialState = {
	loading:false,
	items:[],
	error:{}
}



const todoReducer = (state=initialState,action)=>{

	switch (action.type){
		case All.FETCH_TODO_REQUEST:
			return {
				...state,
				loading:true
			}
		case All.FETCH_TODO_SUCCESS:
			return {
				loading:false,
				items:action.payload,
				error:{}
			}
		case All.FETCH_TODO_FAILURE:
			// console.log(action.payload);
			return {
				...state,
				loading:false,
				error:action.payload
			}
		case All.ADD_TODO_ITEM:
			return {
				loading:false,
				items:[action.payload,...state.items],
				error:{}
			}
		case All.EDIT_TODO_ITEM:
			return {
				loading:false,
				items:editTodoItem(action.payload,state.items),
				error:{}
			}
		case All.DELETE_TODO_ITEM:
			return {
				loading:false,
				items:deleteTodoItem(action.payload,state.items),
				error:{}
			}
		
		
		default:
			return state
	}
}

const editTodoItem=(update_item,items)=>{
	let temp = [];
	
	for(let item of items){
		if(item.id!==update_item.id){
			temp.push(item)
		}
		else{
			temp.push(update_item)
		}
	}
	return temp;


}

const deleteTodoItem = (id,items)=>{
	let temp = []
	for(let item of items){
		if(item.id!==id){
			temp.push(item)
		}
	}
	return temp;
}	


export default todoReducer;