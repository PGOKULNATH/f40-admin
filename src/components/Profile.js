import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, CustomInput} from 'reactstrap';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import { Card, Table } from "react-bootstrap";
import DataContext from '../context/data/dataContext';
import AlertContext from '../context/alert/alertContext';
import Alerts from './Alerts';

const Profile = () => {

  //get details from context
  const dataContext = useContext(DataContext);
  const {
    profile, profile_loading, profile_error, getProfile,
    attendance, attendance_loading, attendance_error, getAttendance,
    students, students_loading, students_error, getStudents
  } = dataContext;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;

  //this will load student details if localStorage have student
  useEffect(() => {
    if(localStorage.getItem('student') !== null){
      getProfile();
      getAttendance();
    }
    getStudents();

    //eslint-disable-next-line
  },[localStorage.getItem('student')])

  //set a person we are going to update
  const [person, setPerson] = useState('');

  //the persons profile updation state
  const [profileAdd, setProfileAdd] = useState({
    addRollNo : ''
  })
  const [profileUpdate, setProfileUpdate] = useState({
    rollNo : '',
    name : '',
    mailId : '',
    batch : '',
    studentMentorName : '',
    studentMentorMail : '',
    studentMentorPhone: '',
    facultyMentorName : '',
    facultyMentorMail : '',
    facultyMentorPhone: ''
  });

  //the persons achievement updation state
  const [achievementAdd, setAchievementAdd] = useState('')
  const [achiveDeleteId, setAchiveDeleteId] = useState(1)

  //the persons attendance updation state
  const [attendanceUpdate, setAttendanceUpdate] = useState({
    attDate:'',
    attValue:'Present'
  })

  //extract data from profile state
  const {addRollNo} = profileAdd

  //extract data from attendance state
  const {attDate, attValue} = attendanceUpdate

  //toggle Profile Modals
  const [isProfileAddModalOpen, toggleProfileAddModal] = useState(false)
  const [isProfileUpdateModalOpen, toggleProfileUpdateModal] = useState(false)

  //toggle Achievement Modals
  const [isAchieveAddModalOpen, toggleAchieveAddModal] = useState(false)
  const [isAchieveDeleteModalOpen, toggleAchieveDeleteModal] = useState(false)

  //toggle Attendance Modals
  const [isAttendanceUpdateModalOpen, toggleAttendanceUpdateModal] = useState(false)

  //onChange student to be updated
  const onPersonChange = e => setPerson(e.target.value);

  //onChange Profile Form
  const onChangeProfileAdd = e => setProfileAdd({
    addRollNo : e.target.value
  });
  const onChangeProfileUpdate = e => setProfileUpdate({
    ...profileUpdate,
    [e.target.name] : e.target.value
  });

  //onchange Achievement Form
  const onChangeAchieveAdd = e => setAchievementAdd(e.target.value)
  const onChangeAchieveDelete = e => setAchiveDeleteId(e.target.value)

  //onChange Attendance Form
  const onChangeAttendanceUpdate = e => setAttendanceUpdate({
    ...attendanceUpdate,
    [e.target.name] : e.target.value
  });

  //set update model when click update profile button
  const onClickProfile = () => {
    if(localStorage.getItem('student') !== null){
      toggleProfileUpdateModal(!isProfileUpdateModalOpen);
      setProfileUpdate({
        rollNo : profile.rollNo,
        name : profile.name,
        mailId : profile.mailId,
        batch : profile.batch,
        studentMentorName : profile.studentMentorName,
        studentMentorMail : profile.studentMentorMail,
        studentMentorPhone: profile.studentMentorPhone,
        facultyMentorName : profile.facultyMentorName,
        facultyMentorMail : profile.facultyMentorMail,
        facultyMentorPhone: profile.facultyMentorPhone
      })
    }
  }

  // this will set localStorage to the person searched
  const getPerson = (e) =>{
    e.preventDefault();
    const user = students.filter((student)=>person===student);
    if(user.length > 0){
      localStorage.setItem('student',person);
      getProfile();
      getAttendance();
    }
    else{
      setAlert("Student not found");
      setPerson('')
    }
  }

  //
  const onClickClear = () => {
    localStorage.removeItem('student');
    setPerson('');
    getStudents();
    getDetails();
  }

  //this will call all the details functions if student present in the localStorage
  const getDetails = () => {
    if(localStorage.getItem('student') === null)
    {
      return <>{showStudents()}</>
    }

    return(
      <>
        {showProfile()}
        {showAttendance()}
      </>
    )
  }

  //function to create profile
  const addProfile = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    toggleProfileAddModal(!isProfileAddModalOpen);
    let user = {};
    user.username = addRollNo;
    user.password = addRollNo;
    user.type = 'student';
    axios.post(server + '/createuser',user,{headers})
    .then(() => {
      axios.post(server+'/addprofile',formData,{headers})
      .then(()=>{
        setProfileAdd({
          addRollNo : ''
        })
        localStorage.setItem('student',addRollNo);
        getProfile();
        getAttendance();
      })
    })
    .catch(err => setAlert(err))
  }

  //function to update profile
  const updateProfile = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    toggleProfileUpdateModal(!isProfileUpdateModalOpen);
    axios.post(server+'/studentprofiledetailsupdation',formData,{headers})
    .then(() => {

      setTimeout(()=>{
        getProfile()
      },2000)

      setProfileUpdate({
        rollNo : '',
        name : '',
        mailId : '',
        batch : '',
        studentMentorName : '',
        studentMentorMail : '',
        studentMentorPhone: '',
        facultyMentorName : '',
        facultyMentorMail : '',
        facultyMentorPhone: ''
      })
    });
  }

  //function to delete profile
  const deleteProfile = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    axios.get(server+'/removestudentprofiledetails?rollNo='+localStorage.getItem('student'), {headers})
    .then(()=>{
      axios.delete(server+'/user?username='+localStorage.getItem('student'),{headers})
      .then(()=>{
        onClickClear();
      })
    })
  }

  //function to add achievement
  const addAchievement = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const achieve = {'achievement' : achievementAdd};
    toggleAchieveAddModal(!isAchieveAddModalOpen);
    axios.post(server+'/addachievement?rollNo='+localStorage.getItem('student'), achieve, {headers})
    .then(() => {
      setTimeout(() => {
        getProfile()
      },1000)
      setAchievementAdd('')
    });
  }

  //function to delete achievement
  const deleteAchievement = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const id = {'id':achiveDeleteId-1};
    toggleAchieveDeleteModal(!isAchieveDeleteModalOpen);
    axios.post(server+'/removeachievement?rollNo='+localStorage.getItem('student'), id, {headers})
    .then(() => {
      getProfile()
      setAchiveDeleteId(1)
    });
  }

  //function to update attendance
  const updateAttendance = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    let att = {};
    let day = attDate.slice(8,10), month = attDate.slice(5,7) , year = attDate.slice(0,4);
    att.date = day+'/'+month+'/'+year;
    if(attValue === 'Absent'){
      att.value = false;
    }
    else{
      att.value = true;
    }
    toggleAttendanceUpdateModal(!isAttendanceUpdateModalOpen);
    axios.post(server+'/changeattendance?rollNo='+localStorage.getItem('student'),att,{headers})
    .then(() => {
      getAttendance();
      setAttendanceUpdate({
        attDate : '',
        attValue :'Present'
      })
    });
  }

  //function to show students RollNo
  const showStudents = () => {
    if(students_loading){
        return <Loading/>
      }

    else if(students_error){
      console.log(students_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="row">
        <ol>
          {students.map((student,i)=><li key={i}>{student}</li>)}
        </ol>
      </div>
    );
  }

  // function to show achievements
  const Achievements = (achievements) => {
    if (achievements === undefined || achievements.length === 0) {
      return null;
    }
    return (
      <Card className="col-12" >
          <ol>
            {achievements.map((data,i) => {
              return <li key={i}>{data}</li>;
            })}
          </ol>
      </Card>
    );
  };

  //function to show profile
  const showProfile = () => {
    if(profile_loading){
        return <Loading/>
      }

    else if(profile_error){
      console.log(profile_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="container">
        <center>
          <h1>{localStorage.getItem('student')} Profile</h1>
        </center>

        <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
          <Card className="col-12 col-md-6">
            <center>
              {
                profile && <img
                  className="card-img rounded-circle top"
                  style={{ width: "250px", height: "300px" }}
                  src={server + profile.id}
                  alt={profile.name}
                />
              }
            </center>
          </Card>
          <div className="col-10 offset-2 col-md-5 offset-md-1">
            <div>
              <p></p><br />
              <p><b>Name: </b>{profile.name}</p>
              <p><b>RollNo:</b>{profile.rollNo}</p>
              <p><b>Batch:</b>{profile.batch}</p>
              <p><b>Email:</b>{profile.mailId}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-cente" style={{ border: "1px solid black", margin: "10px", padding: "5px"}}>
          <Card className="col-12 col-md-6">
            <div>
            <h3>Student Mentor Details</h3>
              <p><b>Name:</b>{profile.studentMentorName}</p>
              <p><b>Email:</b>{profile.studentMentorMail}</p>
              <p><b>Contact No.:</b>{profile.studentMentorPhone}</p>
            </div>
          </Card>
          <Card className="col-12 col-md-6">
            <div>
              <h3>Faculty Mentor Details</h3>
              <p><b>Name:</b>{profile.facultyMentorName}</p>
              <p><b>Email:</b>{profile.facultyMentorMail}</p>
              <p><b>Contact No.:</b>{profile.facultyMentorPhone}</p>
            </div>
          </Card>
        </div>

        <div className="row" style={{ border: "1px solid black", margin: "10px", padding: "5px" }}>

          <div className="col-12 d-none d-md-block">
            <h3 className="float-left">Achievements</h3>
            <button type="button" className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" onClick={() => toggleAchieveDeleteModal(!isAchieveDeleteModalOpen)}>Delete</button>
            <button type="button" className="btn btn-success float-right bold pl-4 pr-4 mr-1 font-weight-bold" onClick={() => toggleAchieveAddModal(!isAchieveAddModalOpen)}>Add</button>
          </div>

          <div className="col-12 d-md-none">
            <center className="h3">Achievements</center>
          </div>

          <center className="col-12 md-1 d-md-none">
            <button type="button" className="btn btn-success bold pl-4 pr-4 mr-1 font-weight-bold" onClick={() => toggleAchieveAddModal(!isAchieveAddModalOpen)}>Add</button>
            <button type="button" className="btn btn-danger bold pl-3 pr-3 font-weight-bold" onClick={() => toggleAchieveDeleteModal(!isAchieveDeleteModalOpen)}>Delete</button>
          </center>

          <div className="col-12">
            {Achievements(profile.achievements)}
          </div>

        </div>

        <Modal isOpen = {isAchieveAddModalOpen} toggle = {() =>toggleAchieveAddModal(!isAchieveAddModalOpen)}>
          <ModalHeader toggle={() => toggleAchieveAddModal(!isAchieveAddModalOpen)}>Add Achievement</ModalHeader>
          <ModalBody>
            <form onSubmit = {addAchievement}>
              <div className="form-group row">
                <label className="form-label col-12" htmlFor="achievement">Achievement</label>
                <div className="col-12"><input type="text" onChange={onChangeAchieveAdd} className="form-control" id="achievement" value={achievementAdd} name="achievementAdd"/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => toggleAchieveAddModal(!isAchieveAddModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
            </form>
          </ModalBody>
        </Modal>

        <Modal isOpen = {isAchieveDeleteModalOpen} toggle = {() =>toggleAchieveDeleteModal(!isAchieveDeleteModalOpen)}>
          <ModalHeader toggle={() => toggleAchieveDeleteModal(!isAchieveDeleteModalOpen)}>Delete Achievement</ModalHeader>
          <ModalBody>
            <form onSubmit = {deleteAchievement}>
              <div className="form-group row">
                <label className="form-label col-12" htmlFor="deleteAchiveId">Id Number</label>
                <div className="col-12"><input type="number" min="1" max={profile.achievements.length} onChange={onChangeAchieveDelete} className="form-control" id="deleteAchiveId" value={achiveDeleteId} name="deleteAchiveId"/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => toggleAchieveDeleteModal(!isAchieveDeleteModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }

  // showing attendance
  const showAttendance = () => {
    if(attendance_loading){
      return <Loading/>
    }

    else if(attendance_error){
      console.log(attendance_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="container" style={{fontSize: '22px'}}>
        <div className="row ml-1 mr-1">
          <div className="col-12">
            <h3 className="float-left" >Attendance</h3>
            <button onClick={() => toggleAttendanceUpdateModal(!isAttendanceUpdateModalOpen)} className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>
          </div>
        </div>
        <center className="row">
          <Table size bordered className="col-10 offset-1">
            <thead>
              <tr>
                <th>Date</th>
                <th>Present/Absent</th>
              </tr>
            </thead>
            <tbody>
              {
                attendance.map((data) => {
                  if(data.value){
                    return(<tr key={data._id} style={{backgroundColor:'rgba(0,255,0,0.2)'}}><td>{data.date}</td><td>P</td></tr>);
                  }
                    return(<tr key={data._id} style={{backgroundColor:'rgba(255,0,0,0.2)'}}><td>{data.date}</td><td>A</td></tr>);
                })
              }
            </tbody>
          </Table>
        </center>

        <Modal isOpen = {isAttendanceUpdateModalOpen} toggle = {() =>toggleAttendanceUpdateModal(!isAttendanceUpdateModalOpen)}>
          <ModalHeader toggle={() => toggleAttendanceUpdateModal(!isAttendanceUpdateModalOpen)}>Update Attendance</ModalHeader>
          <ModalBody>
            <form onSubmit = {updateAttendance}>
              <div className="form-group row">
                <label className="form-label col-12">Date</label>
                <div className="col-12"><input type="date" onChange={onChangeAttendanceUpdate} className="form-control" value={attDate} name="attDate"/></div>
              </div>
              <div className="form-group row">
                <label className="form-label col-12">Attendance</label>
                <div className="col-12">
                  <select  className="form-control" onChange={onChangeAttendanceUpdate} value={attValue} name="attValue">
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => toggleAttendanceUpdateModal(!isAttendanceUpdateModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Update</button>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <form onSubmit={getPerson}>
            <div className="form-group row">
              <div className="col-6">
                <input type="search" required value={person} name="person" onChange={onPersonChange} placeholder="Roll No..." className="form-control" style={{borderRadius : '20px', boxShadow : '0px 0px 5px gray'}}/>
              </div>
              <div className="col-6">
                <button type="submit"  className="btn btn-primary col-5" style={{borderRadius:'15px'}}> Search </button>
                {localStorage.getItem('student') !== null && <button type="button" onClick={onClickClear} className="btn btn-dark col-5 ml-1" style={{borderRadius:'15px'}}> Clear </button>}
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-6 d-none d-md-block">
          {localStorage.getItem('student') !== null && <button onClick={deleteProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
          {localStorage.getItem('student') !== null && <button onClick={onClickProfile} className="btn btn-success float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          <button onClick={() => toggleProfileAddModal(!isProfileAddModalOpen)} className="btn btn-primary float-md-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
        <div className="col-12 d-md-none">
          <center>
            <button onClick={() => toggleProfileAddModal(!isProfileAddModalOpen)} className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
            {localStorage.getItem('student') !== null && <button onClick={() => toggleProfileUpdateModal(!isProfileUpdateModalOpen)} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
            localStorage.getItem('student') !== null<button onClick={deleteProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
          </center>
        </div>
      </div>
      <Alerts />
      {getDetails()}

      <Modal isOpen = {isProfileAddModalOpen} toggle = {() =>toggleProfileAddModal(!isProfileAddModalOpen)}>
        <ModalHeader toggle={() => toggleProfileAddModal(!isProfileAddModalOpen)}>Add Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {addProfile}>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
              <div className="col-12"><input type="text" onChange={onChangeProfileAdd} className="form-control" name="rollNo"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Name: </label>
              <div className="col-12"><input type="text" className="form-control" name="name"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Mail Id: </label>
              <div className="col-12"><input type="email" className="form-control" name="mailId"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Batch: </label>
              <div className="col-12"><input type="text" className="form-control" placeholder="2017-2021" name="batch"/></div>
            </div>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Profile Picture: </label>
              <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Name: </label>
              <div className="col-12"><input type="text" className="form-control" name="studentMentorName"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Mail: </label>
              <div className="col-12"><input type="email" className="form-control" name="studentMentorMail"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Phone: </label>
              <div className="col-12"><input type="number" className="form-control" name="studentMentorPhone"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Name: </label>
              <div className="col-12"><input type="text" className="form-control" name="facultyMentorName"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Mail: </label>
              <div className="col-12"><input type="email" className="form-control" name="facultyMentorMail"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Phone: </label>
              <div className="col-12"><input type="number" className="form-control" name="facultyMentorPhone"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleProfileAddModal(!isProfileAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isProfileUpdateModalOpen} toggle = {() =>toggleProfileUpdateModal(!isProfileUpdateModalOpen)}>
        <ModalHeader toggle={() => toggleProfileUpdateModal(!isProfileUpdateModalOpen)}>Update Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {updateProfile}>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
              <div className="col-12"><input type="text" onChange={onChangeProfileUpdate} value={profileUpdate.rollNo} className="form-control" name="rollNo"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Name: </label>
              <div className="col-12"><input type="text" onChange={onChangeProfileUpdate} value={profileUpdate.name} className="form-control" name="name"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Mail Id: </label>
              <div className="col-12"><input type="email" onChange={onChangeProfileUpdate} value={profileUpdate.mailId} className="form-control" name="mailId"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Batch: </label>
              <div className="col-12"><input type="text" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.batch} name="batch"/></div>
            </div>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Profile Picture: </label>
              <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Name: </label>
              <div className="col-12"><input type="text" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.studentMentorName} name="studentMentorName"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Mail: </label>
              <div className="col-12"><input type="email" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.studentMentorMail} name="studentMentorMail"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Student Mentor Phone: </label>
              <div className="col-12"><input type="number" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.studentMentorPhone} name="studentMentorPhone"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Name: </label>
              <div className="col-12"><input type="text" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.facultyMentorName} name="facultyMentorName"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Mail: </label>
              <div className="col-12"><input type="email" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.facultyMentorMail} name="facultyMentorMail"/></div>
            </div>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Faculty Mentor Phone: </label>
              <div className="col-12"><input type="number" className="form-control" onChange={onChangeProfileUpdate} value={profileUpdate.facultyMentorPhone} name="facultyMentorPhone"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleProfileUpdateModal(!isProfileUpdateModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Update</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  )
};

export default Profile;
