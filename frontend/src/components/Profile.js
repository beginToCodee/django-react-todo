import React,{useEffect,useState} from 'react';
import {Col,Row,Form,Button,Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {updateUser,uploadAvatar} from '../redux/user/asyncActions';






const Profile = props=>{
	const [user,setUser] = useState({profile:{}});
	const [image,setImage] = useState({
		obj:null,
		url:''
	});
	const [submit,setSubmit] = useState({
		msg:"",
		status:false
	});
	const [upload,setUpload] = useState({
		msg:"",
		status:false
	});



	useEffect(()=>{
		if(!isEmptyObject(props.data.user) && !props.data.loading){
			setUser(props.data.user);
			setImage(state=>{
				return {
					...state,
					url:props.data.user.profile.avatar
				}
			});
		}
		if(upload.status && !props.data.loading){
			const msg = "successfully upload avatar";
			setUpload({
				status:false,
				msg:msg
			});
		}
		if(submit.status && !props.data.loading){
			const msg = "Succesfully update the your profile";
			setSubmit({
				msg:msg,
				status:false
			})

		}
	},[props.data.loading]);

	const isEmptyObject = obj=>{
		for(let key in obj){
			return false;
		}
		return true;
	}
	const image_style = {
		
		"height":"200px",
		"width":"200px",

	}
	const handleChange = e=>{
		const name = e.target.name;
		const value = e.target.value;
		if(name.split("-").length<2){
			setUser(state=>{
				return {
					...state,
					[name]:value
				}
			});
		}else{
			setUser(state=>{
				return{
					...state,
					'profile':{
						...state.profile,
						[name.split('-')[1]]:value
					}
				}
			});
		}
	}

	const handleSubmit = e=>{
		e.preventDefault();
		props.updateUser(user);
		setSubmit({
			msg:'',
			status:true
		});
	}

	const handleChangeAvatar = e=>{
		const temp = e.target.files[0];
		const temp_url = URL.createObjectURL(e.target.files[0]);
		setImage({obj:temp,url:temp_url});
		setUpload(state=>{
			return {
				msg:'',
				status:true
			}
		});
		
		
	}

	const handleUploadImage = e=>{
		e.preventDefault();
		const formData = new FormData();
		formData.append('avatar',image.obj,image.obj.name);
		props.uploadAvatar(formData);
		

	}

	

	return (
			<div className="Profile p-4 mt-3">
				<Row>
					<Col lg={8}>
						{submit.msg?<div className="alert alert-info">{submit.msg}</div>:null}
						<Form onSubmit={handleSubmit}>
							<Form.Row>
							    <Col>
							      <Form.Group controlId="formBasicFirstName">
								    	<Form.Label>First Name</Form.Label>
								    	<Form.Control type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
									</Form.Group>							    </Col>
							    <Col>
							      <Form.Group controlId="formBasicLastName">
								    	<Form.Label>Last Name</Form.Label>
								    	<Form.Control type="text" placeholder="Last Name" name="last_name" value={user.last_name} onChange={handleChange} />
									</Form.Group>							    </Col>
							 </Form.Row>
							
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
						    <Form.Text className="text-muted">
						      
						    </Form.Text>
						  </Form.Group>
						  <Form.Row>
						    <Col>
						      <Form.Group controlId="formBasicContact">
								<Form.Label>Contact No : </Form.Label>
								<Form.Control type="text" placeholder="Enter Contact No" name="profile-contact"  value={user.profile.contact} onChange={handleChange} />
								</Form.Group>
						    </Col>
						    <Col>
						      <Form.Group controlId="formBasicLastName">
								    	<Form.Label>Address :</Form.Label>
								    	<Form.Control type="text" placeholder="Enter Your Address" name="profile-address" value={user.profile.address} onChange={handleChange} />
								</Form.Group>
						    </Col>
						  </Form.Row>
							  <Form.Group controlId="exampleForm.ControlTextarea1">
							    <Form.Label>Bio</Form.Label>
							    <Form.Control as="textarea" rows={3} placeholder="Enter Your Bio" name="profile-bio"  value={user.profile.bio} onChange={handleChange} />
							  </Form.Group>
						  
						 
						  <Button variant="primary" type="submit">
						    Save
						  </Button>
						</Form>
					</Col>
					<Col lg={4}>
						<div className="ImageContainer mb-2">
							<img src={image.url} class="img-fluid rounded" alt="..." style={image_style} />
						</div>
						{upload.msg?<h6 className="text-success">{upload.msg}</h6>:null}
						<Form onSubmit={handleUploadImage}>
							  <Form.Group>
							    <Form.File id="exampleFormControlFile1" onChange={handleChangeAvatar}/>
							  </Form.Group>
							  <Button type="submit" variant="outline-primary" size="sm" disabled={!upload.status}>Upload</Button>
						</Form>

				

					
					</Col>
				</Row>
			</div>
		)
}

const mapStateToProps = state=>{
	return {
		data:state.user
	}
}
const mapDispatchToProps = dispatch=>{
	return {
		updateUser:data=>dispatch(updateUser(data)),
		uploadAvatar:data=>dispatch(uploadAvatar(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);