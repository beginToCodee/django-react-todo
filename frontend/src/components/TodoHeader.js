import React,{useEffect,useState} from 'react';
import {Navbar,Button} from 'react-bootstrap';
import '../App.css';
import {NavLink,useRouteMatch,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchLogout} from '../redux/user/asyncActions';



const TodoHeader = props=>{

	const {path,url} = useRouteMatch();
	const history = useHistory();
	const [logout,setLogout] = useState(false);
	const style = {
		color:"#4dffff",
		backgroundColor:"#666666",
		borderRadius:"10px"
	}
	useEffect(()=>{
		if(!props.user.isAuth && logout){
			console.log(logout);
			const state = {
					message:"User Successfully Logout",
					"message_type":"info"
				}
			history.push('/login',state);

		}
		
	},[props.user.isLoggedIn]);
	
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
		  <NavLink exact className="nav-link" activeStyle={style} to={`${url}`}>Home</NavLink>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		  	<div className="nav ml-auto">
		  		<li className="nav-item mr-3">
		  			<NavLink className="nav-link" activeStyle={style} to={`${url}/profile`}>Profile</NavLink>
		  		</li>
		  		<li className="nav-item">
		  			<Button className="nav-link" activeStyle={style} onClick={e=>{props.fetchLogout();setLogout(true);}} variant="outline-info">Logout</Button>
		  		</li>
		  	</div>
		    
		      
		  </Navbar.Collapse>
		</Navbar>
		)
}

const mapStateToProps = state=>{
	return {
		user:state.user
	}
}
const mapDispatchToProps = dispatch=>{
	return {
		fetchLogout:()=>dispatch(fetchLogout())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoHeader);