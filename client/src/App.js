import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  console.log(jwt);

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to={"/home"} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
    
  );
}

export default App;
