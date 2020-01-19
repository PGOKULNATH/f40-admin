import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import server from '../../config/server';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const UserState = props => {

  const initialState = {
    token : localStorage.getItem('atoken'),
    loading : true,
    user : localStorage.getItem('auser'),
    error : null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async formData => {
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    };

    try{

      const res =  await axios.post(server + "/validateuser", formData, config);
      if(res.data.type === 'admin' || res.data.type === 'super-admin')
      {
        dispatch({
          type : LOGIN_SUCCESS,
          payload : {...formData, token : res.data.token}
        });

        if(localStorage.atoken){
          setAuthToken(localStorage.atoken);
        }
      }
      else{
        dispatch({
          type : LOGIN_FAIL,
          payload : 'UnAuthorized access. Repeated trials will blacklist your account.'
        });
      }

    }

    catch (err){

      dispatch({
        type : LOGIN_FAIL,
        payload : err.response.data.msg
      });

    }
  };

  const logout = () => dispatch({type : LOGOUT});

  const clearErrors = () => dispatch({type : CLEAR_ERRORS});

  return(
    <UserContext.Provider
      value = {{
        token : state.token,
        loading : state.loading,
        user : state.user,
        error : state.error,
        login,
        logout,
        clearErrors
      }} >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
