import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import * as All from '../redux';
import {connect} from 'react-redux';
import {Form,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import ViewDetail from './ViewDetail';


const TableList = props=>{

	const [items,setItems] = useState([]);
	const [complete,setComplete] = useState(false);
	const [initial,setInitial] = useState(true);
	const history = useHistory();
	const [detail,setDetail] = useState({});
	const [view,setView] = useState(false);

	useEffect(()=>{
	if((items.length ===0) && (initial)){
			props.fetchItems();
			setInitial(false);
		}
		
		setItems(props.items);
	},[props.items]);

	const handleCloseView = ()=>{
		setView(false);
	}
	const isEmptyObject = obj=>{
		// console.log(obj);
		for(let key in obj){

			return false
		}
		return true;
	}
	const editTodoFunc = data=>{
		const path = '/todo/edit-todo'
		history.push(path,data);
	}

	const getInCompleteList = ()=>{
		let index = 0;

		const list = items.map(item=>{
			if(item.complete ===false){
				index +=1;
				return (
					<tr key={item.id}>
						<td>{index}</td>
						<td>{item.title}</td>
						<td>
							<Button variant="outline-danger mx-2" size="sm" onClick={e=>{
								props.deleteItem(item.id);
								}}>delete</Button>
							<Button variant="outline-primary" size="sm" onClick={e=>editTodoFunc(item)}>edit</Button>
							<Button variant="outline-primary mx-2" size="sm" onClick={e=>{
								setDetail(item);
								setView(true);
							}}>view</Button>
						</td>
					</tr>
					)
			}
			
		});
		// console.log(list);
		return list;
	}
	const getCompleteList = ()=>{
		let index = 0;

		const list = items.map(item=>{
			if(item.complete){
				index +=1;
				return (
					<tr key={item.id}>
						<td>{index}</td>
						<td>{item.title}</td>
						<td>
							<Button variant="outline-primary mx-2" size="sm" onClick={e=>{
								setDetail(item);
								setView(true);
							}}>view</Button>

						</td>
					</tr>
					)
			}
			
		});
		// console.log(list);
		return list;
	}
	

	return (
			<div className="TodoTable">
				  <div className="mt-4 mb-3">
				  	<Form.Check 
				    type="switch"
				    id="custom-switch"
				    label={complete?"Complete":"Incomplete"}
				    checked = {complete}
				    onChange = {e=>setComplete(e.target.checked)}
				  />
				  </div>
				
				<Table responsive="sm">
				    <thead>
				      <tr>
				        <th>Sno.</th>
				        <th>Title</th>
				        <th>Action</th>
				      </tr>
				    </thead>
				    <tbody>
				      	{complete?getCompleteList():getInCompleteList()}	     
				    </tbody>
				  </Table>
				  <ViewDetail todo={detail} show={view} closeFunc={handleCloseView}/>
			</div>
		)
}



const mapStateToProps = state=>{
	return {
		items:state.todo.items,
		
	}
}

const mapDispatchToProps = dispatch=>{

	return {
		fetchItems:()=>dispatch(All.fetchItems()),
		deleteItem:item_id=>dispatch(All.deleteItem(item_id))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TableList);
