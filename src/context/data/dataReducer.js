import {
  GET_EVENTS,
  EVENTS_FAIL,
  GET_PROFILE,
  PROFILE_FAIL,
  GET_SMPROFILE,
  SMPROFILE_FAIL,
  GET_FMPROFILE,
  FMPROFILE_FAIL,
  GET_STUDENTS,
  STUDENTS_FAIL,
  GET_STUDENT_MENTORS,
  STUDENT_MENTOR_FAIL,
  GET_FACULTY_MENTOR,
  FACULTY_MENTOR_FAIL,
  GET_ATTENDANCE,
  ATTENDANCE_FAIL,
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

    case GET_PROFILE :
      return {
        ...state,
        profile : action.payload,
        profile_loading : false,
        profile_error : null
      };

    case PROFILE_FAIL :
      return {
        ...state,
        profile_error : action.payload,
        profile_loading : false
      }

    case GET_SMPROFILE :
      return {
        ...state,
        smprofile : action.payload,
        smprofile_loading : false,
        smprofile_error : null
      };

    case SMPROFILE_FAIL :
      return {
        ...state,
        smprofile_error : action.payload,
        smprofile_loading : false
      }

    case GET_FMPROFILE :
      return {
        ...state,
        fmprofile : action.payload,
        fmprofile_loading : false,
        fmprofile_error : null
      };

    case FMPROFILE_FAIL :
      return {
        ...state,
        fmprofile_error : action.payload,
        fmprofile_loading : false
      }

    case GET_STUDENTS :
      return {
        ...state,
        students : action.payload,
        students_loading : false,
        students_error : null
      };

    case STUDENTS_FAIL :
      return {
        ...state,
        students_error : action.payload,
        students_loading : false
      }

    case GET_STUDENT_MENTORS :
      return {
        ...state,
        smentors : action.payload,
        smentors_loading : false,
        smentors_error : null
      };

    case STUDENT_MENTOR_FAIL :
      return {
        ...state,
        smentors_error : action.payload,
        smentors_loading : false
      }

    case GET_FACULTY_MENTOR :
      return {
        ...state,
        fmentors : action.payload,
        fmentors_loading : false,
        fmentors_error : null
      };

    case FACULTY_MENTOR_FAIL :
      return {
        ...state,
        fmentors_error : action.payload,
        fmentors_loading : false
      }

    case GET_ATTENDANCE :
      return {
        ...state,
        attendance : action.payload,
        attendance_loading : false,
        attendance_error : null
      }

    case ATTENDANCE_FAIL :
      return {
        ...state,
        attendance_error : action.payload,
        attendance_loading : false
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
