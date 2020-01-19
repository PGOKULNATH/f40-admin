import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import UserContext from '../context/user/UserContext';
import AlertContext from '../context/alert/alertContext';
import axios from 'axios';
import server from '../config/server';
import Header from './Header';
import Alerts from './Alerts';

const Login = props => {

  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const {setAlert} = alertContext;
  const {login, error, clearErrors} = userContext;

  useEffect(() => {

    if(error !== null){
      setAlert(error);
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error]);

  const [user, setUser] = useState({
    username : '',
    password : ''
  });
  const [person, setPerson] = useState('');
  const [newpwd, setnewpwd] = useState({
    otp : '',
    pwd : ''
  });

  const { username, password } = user;
  const { otp, pwd } = newpwd;

  const [isUserModalOpen, toggleUserModal] = useState(false)
  const [isnewpwdModalOpen, togglenewpwdModal] = useState(false)

  const onChange = event => setUser({...user, [event.target.name] : event.target.value});

  const onPersonChange = e => setPerson(e.target.value);
  const onnewpwdChange = e => setnewpwd({
    ...newpwd,
    [e.target.name] : e.target.value
  });

  const submitnewpwd = e => {
    e.preventDefault();
    let userpwd = {};
    userpwd.username = person;
    userpwd.password = pwd;
    userpwd.OTP = otp;
    axios.post(server + '/passwordchange',userpwd)
    .then(()=>{
      togglenewpwdModal(!isnewpwdModalOpen)
    })
    .catch(err => console.log(err))
  }

  const submitUser = e => {
    e.preventDefault();
    let user = {};
    user.username = person;
    axios.post(server + '/otprequest',user)
    .then(()=>{
      toggleUserModal(!isUserModalOpen)
      togglenewpwdModal(!isnewpwdModalOpen)
    })
    .catch((err)=>console.log(err))
  }

  const onSubmit = event => {
    event.preventDefault();
    if(username === '' || password === ''){
      setAlert('Please fill all the fields');
    }else {
      login({
        username,
        password
      });
    }
  };

  return(
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <Alerts />
            <form onSubmit = {onSubmit}
              style={{
                border : '1px solid gray',
                padding : '10px',
                borderRadius : '5px',
                boxShadow : '0px 0px 3px 3px gray'
              }}>
              <div className="form-group row">
                <label htmlFor="username" className="col-form-label col-12 col-md-2 h6">UserName </label>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="UserName"
                    value = {username}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-12 col-md-2 h6">Password </label>
                <div className="col-12 col-md-10">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password"
                    value = {password}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="col-12 col-md-4 offset-md-2">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>
            </form>
          </div>
        </div>
        <center>
          or <p style={{display : 'inline', color : '#07827e',cursor:'pointer'}} onClick={() => toggleUserModal(!isUserModalOpen)}>Forget Password</p>
        </center>
      </div>
      <Modal isOpen = {isUserModalOpen} toggle = {() =>toggleUserModal(!isUserModalOpen)}>
        <ModalHeader toggle={() => toggleUserModal(!isUserModalOpen)}>Forget Password</ModalHeader>
        <ModalBody>
          <form onSubmit = {submitUser}>
            <div className="form-group row">
              <label className="form-label col-12">User Name</label>
              <div className="col-12"><input type="text" required onChange={onPersonChange} className="form-control" value={person} name="person"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleUserModal(!isUserModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Submit</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isnewpwdModalOpen} toggle = {() =>togglenewpwdModal(!isnewpwdModalOpen)}>
        <ModalHeader toggle={() => togglenewpwdModal(!isnewpwdModalOpen)}>Change Password</ModalHeader>
        <ModalBody>
          <center className='h5' style={{color:'green'}}>Check Your Email for OTP</center>
          <form onSubmit = {submitnewpwd}>
            <div className="form-group row">
              <label className="form-label col-12">OTP</label>
              <div className="col-12"><input type="text" required onChange={onnewpwdChange} className="form-control" value={otp} name="otp"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12">New password</label>
              <div className="col-12"><input type="text" required onChange={onnewpwdChange} className="form-control" value={pwd} name="pwd"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => togglenewpwdModal(!isnewpwdModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Submit</button>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Login;
