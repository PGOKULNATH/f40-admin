import {
  GET_EVENTS,
  EVENTS_FAIL,
  GET_ASSESSMENTS,
  ASSESSMENTS_FAIL,
  GET_COURSES,
  COURSES_FAIL,
  GET_NOTIFICATIONS,
  NOTIFICATINOS_FAIL
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_EVENTS :
      return {
        ...state,
        events : action.payload,
        events_loading : false,
        events_error : null
      };

    case EVENTS_FAIL :
      return {
        ...state,
        events_error : action.payload,
        events_loading : false
      }

    case GET_ASSESSMENTS :
      return {
        ...state,
        assessments : action.payload,
        assessments_loading : false,
        assessments_error : null
      }

    case ASSESSMENTS_FAIL :
      return {
        ...state,
        assessments_error : action.payload,
        assessments_loading : false
      }

    case GET_COURSES :
      return {
        ...state,
        courses : action.payload,
        courses_loading : false,
        courses_error : null
      }

    case COURSES_FAIL :
      return {
        ...state,
        courses_error : action.payload,
        courses_loading : false
      }

    case GET_NOTIFICATIONS :
      return {
        ...state,
        notifications : action.payload,
        notifications_loading : false,
        notifications_error : null
      }

    case NOTIFICATINOS_FAIL :
      return {
        ...state,
        notifications_error : action.payload,
        notifications_loading : false
      }

    default : return state;
  }
}
