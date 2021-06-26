import React, { useEffect, useState } from 'react';
import ToDo from './ToDo';
import SignUp from './SignUp';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import axios from 'axios';
import { handleError } from './HelperFunctions';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  useEffect(() => {
    let tokenFromLocalStorage = localStorage.getItem('token');

     if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);

        let options = {
          method: 'get',
          url: '/user',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
          }
      };
      axios(options)
      .then((res) => setUser(res.data))
      .catch((err) => handleError(err, setErrorMsg));
      }
  });

  function handleLogOut() {
    localStorage.removeItem('token');
    setToken(null);
  }

  if (!token) {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/signup'>
              <SignUp/>
            </Route>
            <Route path='/login'>
              <Login setToken={setToken}/>
            </Route>
            <Route path='*'>
              <Login setToken={setToken}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
      );
  } 
    return (
      <>
      <BrowserRouter>
        <Navbar handleLogOut={handleLogOut} user={user}/>
        <Switch>
          <Route exact path='/'>
            <ToDo token={token}/>
          </Route>
          <Route path='*'>
            <ToDo token={token}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
    );
};

export default App;
