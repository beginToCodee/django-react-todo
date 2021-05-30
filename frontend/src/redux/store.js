import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoReducer from './todo/TodoReducer';
import userReducer from './user/UserReducer';


const rootReducer = combineReducers({
	user:userReducer,
	todo:todoReducer
})

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));


export default store;