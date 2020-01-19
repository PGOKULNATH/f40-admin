import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserContext from '../context/user/UserContext';
import DataContext from '../context/data/dataContext';

const MyNavbar = () => {

  const userContext = useContext(UserContext);
  const {user, logout} = userContext;

  const dataContext = useContext(DataContext);
  const {
     getEvents, getNotifications, getAssessments, getCourses, getAttendance,
     getStudents, getSmentors, getFmentors,
     getProfile, getsmProfile, getfmProfile,
  } = dataContext;

  useEffect(()=>{
    getEvents();
    getNotifications();
    getAssessments();
    getCourses();
    getStudents();
    getSmentors();
    getFmentors();
    if(localStorage.getItem('astudent') !== null){
      getProfile();
      getAttendance();
    }
    else if(localStorage.getItem('asmentor') !== null){
      getsmProfile();
    }
    else if(localStorage.getItem('afmentor') !== null){
      getfmProfile();
    }
    //eslint-disable-next-line
  },[])

  return (
    <Navbar bg="primary" expand="sm">
      <Navbar.Toggle
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto" >
          <Link className="nav-link" style={{color : 'white'}} to={"/admin/"}>Home</Link>
          <Link className="nav-link" to={"/admin/Profile"} style={{color : 'white'}}>Profile</Link>
          <Link className="nav-link" to={"/admin/Attendance"} style={{color : 'white'}}>Attendance</Link>
          <Link className="nav-link" to={"/admin/Assessments"} style={{color : 'white'}}>Assessments</Link>
          <Link className="nav-link" to={"/admin/Notification"} style={{color : 'white'}}>Notification</Link>
          <Link className="nav-link" to={"/admin/Courses"} style={{color : 'white'}}> Courses </Link>
        </Nav>
      </Navbar.Collapse>
      <span className="navbar-text mr-2" style={{color : 'white'}}>Hi {user}!</span>
      <Link className="btn btn-outline-danger" to = {"/admin/"} onClick={() => logout()}> Logout </Link>
    </Navbar>
  );
};

export default MyNavbar;
