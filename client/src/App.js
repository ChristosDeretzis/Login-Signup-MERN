import React, { useState, useEffect } from 'react';
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
  const [isAuth, setAuth] = useState(false);

  const checkAuth = () => {
     // Your auth logic here
     const cookies = new Cookies();
     const token = cookies.get('jwt');
     if(token){
        setAuth(true);
     }
  };

  useEffect(() => {
    checkAuth();
  });

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route exact path="/home" render={(props) =>
            isAuth ? <Home {...props} /> : <Redirect to="/" />
          }/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
    
  );
}

export default App;
