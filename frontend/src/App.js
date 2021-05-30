import React from 'react';
import TodoContainer from './components/TodoContainer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {Provider} from 'react-redux';
import store from './redux/store';



const App = ()=>{
  
  return (
  		    
          <Provider store={store}>
            <div className="App">
              <Switch>

              <Route path="/todo">
                <TodoContainer />

              </Route>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp}/>
              <Route>
                <Redirect exact to="/todo"/>
              </Route>

              </Switch>           
           
          </div>
          </Provider>

    )
}

export default App;