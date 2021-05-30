import React,{useState,useEffect} from 'react';
import {Modal} from 'react-bootstrap';




const ViewDetail = props=>{

	const [show, setShow] = useState(false);

	useEffect(()=>{
		if(props.show){
			setShow(true);
		}
	},[props.show]);

	const handleClose = () => {
		setShow(false);
		props.closeFunc();
	}
	// const handleShow = () => setShow(true);


	return (
	    <>
	      <Modal show={show} onHide={handleClose} centered>
	        <Modal.Header closeButton>
	          <Modal.Title>
	          	<span className="text-capitalize">
	          		{props.todo.title}
	          	</span>
	          </Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	
	  
	       		<div className="p-3">
	       			{props.todo.description}
	       		</div>
	        	
	        	<br />
	        	<br />
	        </Modal.Body>
	      </Modal>
	    </>
	    )
}


export default ViewDetail;