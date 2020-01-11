import React, { useReducer } from 'react';
import axios from 'axios';
import DataContext from './dataContext';
import DataReducer from './dataReducer';
import server from '../../config/server';
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

const DataState = props => {

  const initialState = {
    events : null ,
    profile : null,
    smprofile : null,
    fmprofile : null,
    students : null,
    smentors : null,
    fmentors : null,
    attendance : null,
    assessments : null,
    courses : null,
    notifications : null,
    events_loading : true,
    profile_loading : true,
    smprofile_loading : true,
    fmprofile_loading : true,
    students_loading : true,
    smentors_loading : true,
    fmentors_loading : true,
    attendance_loading : true,
    assessments_loading : true,
    courses_loading : true,
    notifications_loading : true,
    events_error : null,
    profile_error : null,
    smprofile_error : null,
    fmprofile_error : null,
    students_error : null,
    smentors_error : null,
    fmentors_error : null,
    attendance_error : null,
    assessments_error : null,
    courses_error : null,
    notifications_error : null
  }

  const [state, dispatch] = useReducer(DataReducer, initialState);

  const getEvents = async () => {

    try {
      const res =  await axios.get(server + "/getallevents");

      dispatch({
        type : GET_EVENTS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : EVENTS_FAIL, payload : err});
    }
  }

  const getProfile = () => {

    axios.get(server + '/studentprofiledetails?rollNo=' + localStorage.getItem('student'))
    .then((res) => dispatch({
      type : GET_PROFILE,
      payload : res.data
    })).catch((err) => dispatch({type : PROFILE_FAIL, payload : err}))

  }

  const getsmProfile = () => {

    axios.get(server + '/mentorprofiledetails?rollNo=' + localStorage.getItem('smentor'))
    .then((res) => dispatch({
      type : GET_SMPROFILE,
      payload : res.data
    })).catch((err) => dispatch({type : SMPROFILE_FAIL, payload : err}))

  }

  const getfmProfile = () => {

    axios.get(server + '/mentorprofiledetails?rollNo=' + localStorage.getItem('fmentor'))
    .then((res) => dispatch({
      type : GET_FMPROFILE,
      payload : res.data
    })).catch((err) => dispatch({type : FMPROFILE_FAIL, payload : err}))

  }

  const getStudents = async () => {

    try {
      const res =  await axios.get(server + "/students");

      dispatch({
        type : GET_STUDENTS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : STUDENTS_FAIL, payload : err});
    }
  }

  const getSmentors = async () => {

    try {
      const res =  await axios.get(server + "/studentmentors");

      dispatch({
        type : GET_STUDENT_MENTORS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : STUDENT_MENTOR_FAIL, payload : err});
    }
  }

  const getFmentors = async () => {

    try {
      const res =  await axios.get(server + "/facultymentors");

      dispatch({
        type : GET_FACULTY_MENTOR,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : FACULTY_MENTOR_FAIL, payload : err});
    }
  }

  const getAttendance = async () => {

    try {
      const res =  await axios.get(server + '/studentattendance?rollNo=' + localStorage.getItem('student'));
      dispatch({
        type : GET_ATTENDANCE,
        payload : res.data.dates
      });
    }

    catch(err) {
        dispatch({type : ATTENDANCE_FAIL, payload : err});
    }
  }

  const getAssessments = async () => {

    try {
      const res =  await axios.get(server + "/allassessments");
      dispatch({
        type : GET_ASSESSMENTS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : ASSESSMENTS_FAIL, payload : err});
    }
  }

  const getCourses = async () => {

    try {
      const res =  await axios.get(server + '/getallcourses');
      dispatch({
        type : GET_COURSES,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : COURSES_FAIL, payload : err});
    }
  }

  const getNotifications = async () => {

    try {
      const res =  await axios.get(server + '/getallnotifications');
      dispatch({
        type : GET_NOTIFICATIONS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : NOTIFICATINOS_FAIL, payload : err});
    }
  }

  return(
    <DataContext.Provider
      value = {{
        events : state.events,
        profile : state.profile,
        smprofile : state.smprofile,
        fmprofile : state.fmprofile,
        students : state.students,
        smentors : state.smentors,
        fmentors : state.fmentors,
        attendance : state.attendance,
        assessments : state.assessments,
        courses : state.courses,
        notifications : state.notifications,
        events_loading : state.events_loading,
        profile_loading : state.profile_loading,
        smprofile_loading : state.smprofile_loading,
        fmprofile_loading : state.fmprofile_loading,
        students_loading : state.students_loading,
        smentors_loading : state.smentors_loading,
        fmentors_loading : state.fmentors_loading,
        attendance_loading : state.attendance_loading,
        assessments_loading : state.assessments_loading,
        courses_loading : state.courses_loading,
        notifications_loading : state.notifications_loading,
        events_error : state.events_error,
        profile_error : state.profile_error,
        smprofile_error : state.smprofile_error,
        fmprofile_error : state.fmprofile_error,
        students_error : state.students_error,
        smentors_error : state.smentors_error,
        fmentors_error : state.fmentors_error,
        attendance_error : state.attendance_error,
        assessments_error : state.assessments_error,
        courses_error : state.courses_error,
        notifications_error : state.notifications_error,
        getEvents,
        getProfile,
        getsmProfile,
        getfmProfile,
        getStudents,
        getSmentors,
        getFmentors,
        getAttendance,
        getAssessments,
        getCourses,
        getNotifications
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
