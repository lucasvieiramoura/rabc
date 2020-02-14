import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import Login  from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'


class App extends Component{
  render() {
    return(
      <Router>
        <div className="App">
          <Navbar/>          
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile" component={Profile}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
