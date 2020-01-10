import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {

  switch(action.type){

    case LOGIN_SUCCESS :
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', action.payload.username);
      return {
        ...state,
        token : action.payload.token,
        user : action.payload.username,
        loading : false
      }

    case LOGIN_FAIL :
      localStorage.clear()
      return {
        ...state,
        token : null,
        loading : false,
        user : null,
        error : action.payload
      }

    case LOGOUT :
      localStorage.clear()
      return {
        ...state,
        token : null,
        loading : false,
        user : null,
        error : null
      }

    case CLEAR_ERRORS :
      return {
        ...state,
        error : null
      }

    default : return state;
  }
};
