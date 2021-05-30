import React,{useState,useEffect} from 'react';
import {Form,Button,Spinner} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';

import * as All from '../redux/user/asyncActions';
import {connect} from 'react-redux';
// import {,Button} from 'react-bootstrap';
import {fetchIsAuth} from '../redux/user/asyncActions';



const Login = (props)=>{
	const [user_info,setUserInfo] = useState({username:'',password:''});
	

	
	const [msg,setMsg] = useState({});
	const [errors,setError] = useState({});
	const history = useHistory();
	const [initial,setInitial] = useState(true);
	useEffect(()=>{
		const state = history.location.state;
		if(initial && state){
			setMsg(state)
			setInitial(false);
		}
		else if(initial && (state===undefined)){
			props.fetchIsAuth();
			setInitial(false);

		}
		else if(props.user.isLoggedIn) {
			history.push('/todo');
		}
		else if(!isEmptyObj(props.user.error) && !initial){
			setError(props.user.error.data);

		}

		else{
			setMsg({});
		}
		
		

	},[props.user.isLoggedIn,props.user.error]);
	const isEmptyObj = obj=>{
		for(let key in obj){
			
			return false;
		}
		return true;
	}

	const getLoadingInfo = ()=>{

		return (
				<Button variant="primary" disabled>
				    <Spinner
				      as="span"
				      animation="grow"
				      size="sm"
				      role="status"
				      aria-hidden="true"
				    />
				    Loading...
				  </Button>
			);
	}
	const getLoginButton = ()=>{
		return(
				<Button variant="primary" type="submit">
			    Login
			  </Button>
			)
	}
	const handleChange = e=>{
		const name = e.target.name;
		const value = e.target.value;

		setUserInfo(state=>{
			return {
				...state,
				[name]:value
			}
		});
	}

	const handleSubmit = e=>{
		setMsg({});
		e.preventDefault();
		props.sendLogin(user_info);


	}

	return (
		<div className="shadow p-3 mb-5 bg-body rounded Login">
			<h3 className="text-center text-info p-2 border">Login Here</h3>
			{msg.message?<div className={`alert alert-${msg.message_type}`}>{msg.message}</div>:null}
			<Form onSubmit={handleSubmit}>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Username</Form.Label>
			    <Form.Control type="text" placeholder="Enter username" name="username" value={user_info.username} onChange={handleChange} />
			    <Form.Text className="text-danger">
			      {errors.username}
			    </Form.Text>
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" name="password" value={user_info.password} onChange={handleChange} />
			    <Form.Text className="text-danger">
			     {errors.password}
			    </Form.Text>

			  </Form.Group>
			  {props.user.loading?getLoadingInfo():getLoginButton()}
			</Form>
			
			<hr/>
			<Link to="/signup">SignUp Here</Link>

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
		sendLogin:data=>dispatch(All.sendLogin(data)),
		fetchIsAuth:()=>dispatch(fetchIsAuth())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);