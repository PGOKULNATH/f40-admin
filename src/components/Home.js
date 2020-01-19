import React, {Fragment, useState} from 'react';
import MyNavbar from './Navbar';
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound.js";
import HomeContent from './HomeContent';
import Profile from './Profile';
import Courses from './Courses';
import Notification from './Notification';
import Assessments from './Assessments';
import Attendance from './Attendance';

const Home = () => {
  const [j, setJ] = useState(true);

  const View = (Comp) => {
    setJ(true)
    return( <Comp />)
  }

  const Jumb = () => {
    if(j){
      return(
        <div className="jumbotron d-none d-md-block">
          <center>
            <div className="container">
              <img src="images.jpeg" alt="KCT" style={{float : 'left', width : '150px'}} />
              <img src="ece_logo.png" alt="ECE" style={{float : 'right', width : '150px'}} />
              <h1>Department of Electronics & Communication Engineering</h1>
              <h2>Kumaraguru College of Technology</h2>
            </div>
          </center>
        </div>
      )
    }
    else{
      return(<div />)
    }
  }

  const not = () => {
    setJ(false);
    return(<NotFound />)
  }
  return (
    <Fragment>
      <MyNavbar />
      <Jumb />
      <Switch>
        <Route exact path="/admin/" component={()=>View(HomeContent)} />
        <Route exact path={"/admin/Profile"} component={()=>View(Profile)} />
        <Route exact path={"/admin/Attendance"} component={()=>View(Attendance)} />
        <Route exact path={"/admin/Assessments"} component={()=>View(Assessments)} />
        <Route exact path={"/admin/Notification"} component={()=>View(Notification)} />
        <Route exact path={"/admin/Courses"} component={()=>View(Courses)} />
        <Route component={not} />
      </Switch>
    </Fragment>
  );
};

export default Home;
