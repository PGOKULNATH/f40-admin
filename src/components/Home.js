import React, {Fragment} from 'react';
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
  return (
    <Fragment>
      <MyNavbar />
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
      <Switch>
        <Route exact path="/" component={HomeContent} />
        <Route exact path={"/Profile"} component={Profile} />
        <Route exact path={"/Attendance"} component={Attendance} />
        <Route exact path={"/Assessments"} component={Assessments} />
        <Route exact path={"/Notification"} component={Notification} />
        <Route exact path={"/Courses"} component={Courses} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Home;
