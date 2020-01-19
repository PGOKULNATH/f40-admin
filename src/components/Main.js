import React, {Fragment, useContext} from 'react';
import Home from './Home';
import Login from './Login';
import UserContext from '../context/user/UserContext';
import setAuthToken from '../utils/setAuthToken';

if(localStorage.atoken){
  setAuthToken(localStorage.atoken);
}

function Main() {

  const userContext = useContext(UserContext);

  const { user, token } = userContext;

  return (
    <Fragment>
      {
        user === null || token === null ? <Login /> : <Home />
      }
    </Fragment>
  );
}

export default Main;
