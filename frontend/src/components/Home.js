import React,{useEffect} from 'react';
import TodoAddForm from './TodoAddForm';
import TodoList from './TodoList';

import {Row,Col} from 'react-bootstrap';



const Home = props=>{
	
	
	return(
			<React.Fragment>
				
				<Row>
					<Col lg={5}>
						<TodoAddForm/>
					</Col>
					<Col lg={7}>
						<TodoList />
					</Col>
				</Row>	
			</React.Fragment>
		)
}


export default Home;