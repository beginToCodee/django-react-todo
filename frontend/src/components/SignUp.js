import React,{useState,useEffect} from 'react';
import {Form,Button,Spinner} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchUserSignUp,fetchIsAuth} from '../redux/user/asyncActions';



const SignUp = props=>{

	const [user_info,setUserInfo] = useState({
		'username':'',
		'password':'',
		're_password':''
	});
	const [errors,setErrors] = useState({});
	const [initial,setInitial] = useState(true);
	const history = useHistory();
	useEffect(()=>{
		if(initial && !props.user.isLoggedIn){
			props.fetchIsAuth();
			setInitial(false);
		}
		else if(props.user.isLoggedIn){
			history.push('/todo');
		}
		else if(!isEmptyObj(props.user.error)){
			setErrors(props.user.error.data);
		}

	},[props.user.isLoggedIn,props.user.error]);
	const isEmptyObj = obj=>{
		for(let key in obj){
			
			return false;
		}
		return true;
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
		e.preventDefault();
		props.fetchUserSignUp(user_info);
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
	const getSignUpButton = ()=>{
		return(
				<Button variant="success" type="submit">
			    Create An Account
			  </Button>
			)
	}


	return (
			<div className="Signup shadow p-3 mb-5 bg-body rounded">
				<h3 className="text-center text-info p-2 border">Create An User Account</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicUsername">
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
				   <Form.Group controlId="formBasicRePassword">
				    <Form.Label>Re Password</Form.Label>
				    <Form.Control type="password" placeholder="Enter confirm password" name="re_password" value={user_info.re_password} onChange={handleChange} />
				    <Form.Text className="text-danger">
				      {errors.re_password}
				    </Form.Text>
				  </Form.Group>
				  {props.user.loading?getLoadingInfo():getSignUpButton()}
				</Form>
				<hr/>
			<Link to="/login" >Do You want to login?</Link>
				
			</div>
		)
}


// fetchUserSignUp

const mapStateToProps = state=>{

	return {
		user:state.user
	}
}


const mapDispatchToProps = dispatch=>{

	return {
		fetchUserSignUp:data=>dispatch(fetchUserSignUp(data)),
		fetchIsAuth:()=>dispatch(fetchIsAuth())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);