import React,{useEffect,useState} from 'react';
import '../App.css';

import TodoHeader from './TodoHeader';
import Home from './Home';
import {Switch,Route,useRouteMatch,useHistory} from 'react-router-dom';

import EditTodo from './EditTodo';
import Profile from './Profile';
// import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchIsAuth} from '../redux/user/asyncActions';





const TodoContainer = props=>{
	let { path, url } = useRouteMatch();
	const [initial,setInitial] = useState(true);
	const history = useHistory();
	useEffect(()=>{
		if(initial){
			props.fetchIsAuth();
			setInitial(false);
		}
		else{
			if(!isEmptyObj(props.user.error)){
				const path = '/login';
				
				const state = {
					message :"user first login required",
					message_type:"danger"
				}
				history.push(path,state);
			}
		}

	},[props.user.error]);
	const isEmptyObj = obj=>{
		for(let key in obj){
			
			return false;
		}
		return true;
	}
	return (
		<div className="TodoContainer shadow p-3 mb-5 bg-body rounded">
			<TodoHeader/>	
			
			<Switch>
				<Route exact path={path} component={Home}/>
				
				<Route path={`${path}/edit-todo`} component={EditTodo} />
				<Route path={`${path}/profile`} component ={Profile}/>
			</Switch>
		</div>
		)
}

const mapStateToProps = state=>{
	return {
		user:state.user
	}
}

const mapDispatchToProps = dispatch=>{
	return {
		fetchIsAuth:()=>dispatch(fetchIsAuth())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoContainer);