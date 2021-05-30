import React,{useState,useEffect} from 'react';
import {Form,Button,Spinner} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import * as All from '../redux';
import {connect} from 'react-redux';




const EditTodo = props=>{

	const [todo,setTodo] = useState({
		title:'',
		description:'',
		complete:false
	});
	const [msg,setMsg] = useState('');
	const history = useHistory();
	const [submit,setSubmit] = useState(false); 
	const [errors,setErrors] = useState({});


	useEffect(()=>{
		if(history.location.state && (submit === false)){
			setTodo(history.location.state);

		}
		if(history.location.state===undefined){
			history.push("/todo");
		}
		if(isEmptyObj(props.todo.error)){
			
			if(submit){
				setMsg("Successfully Update Todo Plan");
				setSubmit(false);
			}

			setErrors({});

		}
		else{

			setErrors(props.todo.error.data);
			setMsg('');
		}		
	},[props.todo.loading]);
	const isEmptyObj = obj=>{
		for(let key in obj){
			
			return false;
		}
		return true;
	}

	const handleSubmit = e=>{
		e.preventDefault();
		props.editItem(todo);
		setSubmit(true);
	}
	const handleChange = e=>{
		const name = e.target.name;
		const value = e.target.value;

		setTodo(state=>{
			return{
				...state,
				[name]:value
			}
		})
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
	const getUpdateButton = ()=>{
		return(
				<Button variant="primary" type="submit">
					    Update
					  </Button>
			)
	}



	return (
		<div className=" row">
				<div className="col-6 mx-auto mt-5 p-3 rounded border">
					<h4 className="text-info p-2 border border-info rounded text-center">Update Plan</h4>
					{msg?<div className="alert alert-success text-center">{msg}</div>:null}
				
				<Form onSubmit={handleSubmit}>
					  <Form.Group controlId="formBasicEmail">
					    <Form.Label>Title</Form.Label>
					    <Form.Control type="text" name="title" placeholder="Enter todo title" value={todo.title} onChange={handleChange} />
					    <Form.Text className="text-muted">
					      {errors.title}
					    </Form.Text>
					  </Form.Group>

					  <Form.Group controlId="exampleForm.ControlTextarea1">
					    <Form.Label>Description</Form.Label>
					    <Form.Control as="textarea" name="description" placeholder="Enter todo description" value={todo.description} onChange={handleChange} rows={3} />
					    <Form.Text className="text-muted">
					      {errors.description}
					    </Form.Text>

					  </Form.Group>
					  <Form.Group controlId="formBasicCheckbox">
					    <Form.Check type="checkbox" label="Complete" checked={todo.complete} onChange={e=>{
					    	const value = e.target.checked;
					    	setTodo(state=>{
					    		return {
					    			...state,
					    			complete:value
					    		}
					    	})
					    	}} />
					  </Form.Group>
					  {props.todo.loading?getLoadingInfo():getUpdateButton()}
					  </Form>

				</div>
		</div>
		)
}


const mapStateToProps = state=>{

	return {
		todo:state.todo
	}
}

const mapDispatchToProps = dispatch=>{

	return {
		editItem:data=>dispatch(All.updateItem(data))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(EditTodo);