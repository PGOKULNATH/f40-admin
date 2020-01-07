import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserContext from '../context/user/UserContext';
import DataContext from '../context/data/dataContext';

const MyNavbar = () => {

  const userContext = useContext(UserContext);
  const {user, logout} = userContext;

  const dataContext = useContext(DataContext);
  const { getEvents, getNotifications, getAssessments, getCourses } = dataContext;

  useEffect(()=>{
    getEvents();
    getNotifications();
    getAssessments();
    getCourses();
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
          <Link className="nav-link" style={{color : 'white'}} to={"/"}>Home</Link>
          <Link className="nav-link" to={"/Profile"} style={{color : 'white'}}>Profile</Link>
          <Link className="nav-link" to={"/Assessments"} style={{color : 'white'}}>Assessments</Link>
          <Link className="nav-link" to={"/Notification"} style={{color : 'white'}}>Notification</Link>
          <Link className="nav-link" to={"/Courses"} style={{color : 'white'}}> Courses </Link>
        </Nav>
      </Navbar.Collapse>
      <span className="navbar-text mr-2" style={{color : 'white'}}>Hi {user}!</span>
      <Link className="btn btn-outline-danger" to = {"/"} onClick={() => logout()}> Logout </Link>
    </Navbar>
  );
};

export default MyNavbar;
