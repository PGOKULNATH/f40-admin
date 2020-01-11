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
    smprofile, smprofile_loading, smprofile_error, getsmProfile,
    fmprofile, fmprofile_loading, fmprofile_error, getfmProfile,
    attendance, attendance_loading, attendance_error, getAttendance,
    students, students_loading, students_error, getStudents,
    smentors, smentors_loading, smentors_error, getSmentors,
    fmentors, fmentors_loading, fmentors_error, getFmentors
  } = dataContext;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;

  //this will load student details if localStorage have student
  useEffect(() => {
    if(localStorage.getItem('type') !== null){
      setPerson({
        ...person,
        type : localStorage.getItem('type')
      })
    }
    if(localStorage.getItem('student') !== null){
      getProfile();
      getAttendance();
    }
    else if(localStorage.getItem('smentor') !== null){
      getsmProfile();
    }
    else if(localStorage.getItem('fmentor') !== null){
      getfmProfile();
    }
    getStudents();
    getSmentors();
    getFmentors();

    //eslint-disable-next-line
  },[])

  //set a person we are going to update
  const [person, setPerson] = useState({
    username : '',
    type : 'Student'
  });

  const {username, type} = person;

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

  //the persons profile updation state
  const [smprofileAdd, setsmProfileAdd] = useState({
    addsmRollNo : ''
  })
  const [smprofileUpdate, setsmProfileUpdate] = useState({
    rollNo : '',
    name : '',
    mailId : '',
    batch : ''
  });

  //the persons profile updation state
  const [fmprofileAdd, setfmProfileAdd] = useState({
    addfmRollNo : ''
  })
  const [fmprofileUpdate, setfmProfileUpdate] = useState({
    rollNo : '',
    name : '',
    mailId : '',
    batch : ''
  });

  //the persons achievement updation state
  const [achievementAdd, setAchievementAdd] = useState('')
  const [achiveDeleteId, setAchiveDeleteId] = useState(1)

  //the persons achievement updation state
  const [menteesRollNo, setMenteesRollNo] = useState('')
  const [menteesDeleteId, setMenteesDeleteId] = useState(1)

  //the persons attendance updation state
  const [attendanceUpdate, setAttendanceUpdate] = useState({
    attDate:'',
    attValue:'Present'
  })

  //extract data from profile state
  const {addRollNo} = profileAdd

  //extract data from profile state
  const {addsmRollNo} = smprofileAdd

  //extract data from profile state
  const {addfmRollNo} = fmprofileAdd

  //extract data from attendance state
  const {attDate, attValue} = attendanceUpdate

  const [isAddModalOpen, toggleAddModal] = useState(false)

  //toggle Profile Modals
  const [isProfileAddModalOpen, toggleProfileAddModal] = useState(false)
  const [isProfileUpdateModalOpen, toggleProfileUpdateModal] = useState(false)

  //toggle Profile Modals
  const [issmProfileAddModalOpen, togglesmProfileAddModal] = useState(false)
  const [issmProfileUpdateModalOpen, togglesmProfileUpdateModal] = useState(false)

  //toggle Profile Modals
  const [isfmProfileAddModalOpen, togglefmProfileAddModal] = useState(false)
  const [isfmProfileUpdateModalOpen, togglefmProfileUpdateModal] = useState(false)

  //toggle Achievement Modals
  const [isAchieveAddModalOpen, toggleAchieveAddModal] = useState(false)
  const [isAchieveDeleteModalOpen, toggleAchieveDeleteModal] = useState(false)

  //toggle Achievement Modals
  const [isMenteesAddModalOpen, toggleMenteesAddModal] = useState(false)
  const [isMenteesDeleteModalOpen, toggleMenteesDeleteModal] = useState(false)

  //toggle Attendance Modals
  const [isAttendanceUpdateModalOpen, toggleAttendanceUpdateModal] = useState(false)

  //onChange person we are going to be updated
  const onPersonChange = e => setPerson({
    ...person,
    [e.target.name] : e.target.value
  });

  //onChange Profile Form
  const onChangeProfileAdd = e => setProfileAdd({
    addRollNo : e.target.value
  });
  const onChangeProfileUpdate = e => setProfileUpdate({
    ...profileUpdate,
    [e.target.name] : e.target.value
  });

  //onChange Profile Form
  const onChangesmProfileAdd = e => setsmProfileAdd({
    addsmRollNo : e.target.value
  });
  const onChangesmProfileUpdate = e => setsmProfileUpdate({
    ...smprofileUpdate,
    [e.target.name] : e.target.value
  });

  //onChange Profile Form
  const onChangefmProfileAdd = e => setfmProfileAdd({
    addfmRollNo : e.target.value
  });
  const onChangefmProfileUpdate = e => setfmProfileUpdate({
    ...fmprofileUpdate,
    [e.target.name] : e.target.value
  });

  //onchange Achievement Form
  const onChangeAchieveAdd = e => setAchievementAdd(e.target.value)
  const onChangeAchieveDelete = e => setAchiveDeleteId(e.target.value)

  //onchange Mentees Form
  const onChangeMenteesAdd = e => setMenteesRollNo(e.target.value)
  const onChangeMenteesDelete = e => setMenteesDeleteId(e.target.value)

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

  const deleteUser = () => {
    if(type === 'Student'){
      const user = students.filter((student)=>username===student);
      if(user.length > 0){
        axios.delete(server + '/user?username='+username)
        .then(()=>getStudents())
      }
      else{
        setAlert("Student not found");
      }
    }
    else if(type === 'Student Mentor'){
      const user = smentors.filter((student)=>username===student);
      if(user.length > 0){
        axios.delete(server + '/user?username='+username)
        .then(()=>getSmentors())
      }
      else{
        setAlert("Student Mentor not found");
      }
    }
    else if(type === 'Faculty Mentor'){
      const user = fmentors.filter((student)=>username===student);
      if(user.length > 0){
        axios.delete(server + '/user?username='+username)
        .then(()=>getFmentors())
      }
      else{
        setAlert("Faculty Mentor not found");
      }
    }
    setPerson({...person,username:''})
  }

  //function to create profile
  const addProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
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
        localStorage.setItem('type',type);
        getProfile();
        getAttendance();
      })
    })
    .catch(err => setAlert(err))
  }

  //function to update profile
  const updateProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
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

  //set update model when click update profile button
  const onClicksmProfile = () => {
    if(localStorage.getItem('smentor') !== null){
      togglesmProfileUpdateModal(!issmProfileUpdateModalOpen);
      setsmProfileUpdate({
        rollNo : smprofile.rollNo,
        name : smprofile.name,
        mailId : smprofile.mailId,
        batch : smprofile.batch
      })
    }
  }

  //function to create profile
  const addsmProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    togglesmProfileAddModal(!issmProfileAddModalOpen);
    let user = {};
    user.username = addsmRollNo;
    user.password = addsmRollNo;
    user.type = 'student-mentor';
    axios.post(server + '/createuser',user,{headers})
    .then(() => {
      axios.post(server+'/addmentorprofile',formData,{headers})
      .then(()=>{
        setsmProfileAdd({
          addsmRollNo : ''
        })
        localStorage.setItem('smentor',addsmRollNo);
        localStorage.setItem('type',type);
        getsmProfile();
      })
    })
    .catch(err => setAlert(err))
  }

  //function to update profile
  const updatesmProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    togglesmProfileUpdateModal(!issmProfileUpdateModalOpen);
    axios.post(server+'/mentorprofiledetailsupdation',formData,{headers})
    .then(() => {

      setTimeout(()=>{
        getsmProfile()
      },2000)

      setsmProfileUpdate({
        rollNo : '',
        name : '',
        mailId : '',
        batch : '',
      })
    });
  }

  //function to delete profile
  const deletesmProfile = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    axios.get(server+'/removementorprofiledetails?rollNo='+localStorage.getItem('smentor'), {headers})
    .then(()=>{
      axios.delete(server+'/user?username='+localStorage.getItem('smentor'),{headers})
      .then(()=>{
        onClickClear();
      })
    })
  }

  //set update model when click update profile button
  const onClickfmProfile = () => {
    if(localStorage.getItem('fmentor') !== null){
      togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen);
      setfmProfileUpdate({
        rollNo : fmprofile.rollNo,
        name : fmprofile.name,
        mailId : fmprofile.mailId,
        batch : fmprofile.batch
      })
    }
  }

  //function to create profile
  const addfmProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    togglefmProfileAddModal(!isfmProfileAddModalOpen);
    let user = {};
    user.username = addfmRollNo;
    user.password = addfmRollNo;
    user.type = 'faculty-mentor';
    axios.post(server + '/createuser',user,{headers})
    .then(() => {
      axios.post(server+'/addmentorprofile',formData,{headers})
      .then(()=>{
        setfmProfileAdd({
          addfmRollNo : ''
        })
        localStorage.setItem('smentor',addfmRollNo);
        localStorage.setItem('type',type);
        getfmProfile();
      })
    })
    .catch(err => setAlert(err))
  }

  //function to update profile
  const updatefmProfile = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    var formData = new FormData(event.target);
    togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen);
    axios.post(server+'/mentorprofiledetailsupdation',formData,{headers})
    .then(() => {

      setTimeout(()=>{
        getfmProfile()
      },2000)

      setfmProfileUpdate({
        rollNo : '',
        name : '',
        mailId : '',
        batch : '',
      })
    });
  }

  //function to delete profile
  const deletefmProfile = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    axios.get(server+'/removementorprofiledetails?rollNo='+localStorage.getItem('fmentor'), {headers})
    .then(()=>{
      axios.delete(server+'/user?username='+localStorage.getItem('fmentor'),{headers})
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

  //function to add achievement
  const addMentees = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const mentee = {'rollNo' : menteesRollNo};
    toggleMenteesAddModal(!isMenteesAddModalOpen);
    let user;
    if(localStorage.getItem('type') === 'Student Mentor'){
      user = localStorage.getItem('smentor')
    }
    else if(localStorage.getItem('type') === 'Faculty Mentor'){
      user = localStorage.getItem('fmentor')
    }
    axios.post(server+'/addmentee?rollNo='+user, mentee, {headers})
    .then(() => {
      setTimeout(() => {
        if(localStorage.getItem('type') === 'Student Mentor'){
          getsmProfile()
        }
        else if(localStorage.getItem('type') === 'Faculty Mentor'){
          getfmProfile()
        }
      },1000)
      setMenteesRollNo('')
    });
  }

  //function to delete mentee
  const deleteMentees = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const id = {'id':menteesDeleteId-1};
    let user;
    if(localStorage.getItem('type') === 'Student Mentor'){
      user = localStorage.getItem('smentor')
    }
    else if(localStorage.getItem('type') === 'Faculty Mentor'){
      user = localStorage.getItem('fmentor')
    }
    toggleMenteesDeleteModal(!isMenteesDeleteModalOpen);
    axios.post(server+'/removementee?rollNo='+user, id, {headers})
    .then(() => {
      if(localStorage.getItem('type') === 'Student Mentor'){
        getsmProfile()
      }
      else if(localStorage.getItem('type') === 'Faculty Mentor'){
        getfmProfile()
      }
    });
    setMenteesDeleteId(1)
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

  // function to show achievements
  const Achievements = (achievements) => {
    if (achievements === undefined || achievements.length === 0) {
      return null;
    }
    return (
      <div className="row justify-content-center">
        <Card className="col-11" >
          <ol>
          {
            achievements.map((data,i) => {
              return <li key={i}>{data}</li>;
            })
          }
          </ol>
        </Card>
      </div>
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
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>{localStorage.getItem('student')} Profile</h1>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            {localStorage.getItem('student') !== null && <button onClick={deleteProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            {localStorage.getItem('student') !== null && <button onClick={onClickProfile} className="btn btn-success float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          </div>
          <div className="col-12 d-md-none">
            <center>
              {localStorage.getItem('student') !== null && <button onClick={() => toggleProfileUpdateModal(!isProfileUpdateModalOpen)} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
              {localStorage.getItem('student') !== null && <button onClick={deleteProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            </center>
          </div>
        </div>

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

        <div className="row" style={{ margin: "8px", padding: "5px" }}>

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

        <Modal isOpen = {isProfileUpdateModalOpen} toggle = {() =>toggleProfileUpdateModal(!isProfileUpdateModalOpen)}>
          <ModalHeader toggle={() => toggleProfileUpdateModal(!isProfileUpdateModalOpen)}>Update Student Profile</ModalHeader>
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

  const showmentees = () => {
    return(
      <>
      <div className="row">
        <div className="col-12 col-md-6">
          <h1>Mentees</h1>
        </div>
        <div className="col-12 col-md-6 d-none d-md-block">
          <button onClick={() => toggleMenteesDeleteModal(!isMenteesDeleteModalOpen)} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>
          <button onClick={() => toggleMenteesAddModal(!isMenteesAddModalOpen)} className="btn btn-primary float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Add</button>
        </div>
        <div className="col-12 d-md-none">
          <center>
            <button onClick={() => toggleMenteesDeleteModal(!isMenteesDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>
            <button onClick={() => toggleMenteesAddModal(!isMenteesAddModalOpen)} className="btn btn-primary bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Add</button>
          </center>
        </div>
      </div>
      <div className="row justify-content-center">
        <Card className="col-11">
          <ol>
            {
              (localStorage.getItem('type') === 'Student Mentor') ? (
                (smprofile.mentees && smprofile.mentees.length > 0) ? (
                  smprofile.mentees.map((mentee,i)=><li key={i}>{mentee}</li>)
                ) : null
              ) : (
                (localStorage.getItem('type') === 'Faculty Mentor') ? (
                  (fmprofile.mentees && fmprofile.mentees.length > 0) ? (
                    fmprofile.mentees.map((mentee,i)=><li key={i}>{mentee}</li>)
                  ) : null
                ) : null
              )
            }
          </ol>
        </Card>
      </div>

      <Modal isOpen = {isMenteesAddModalOpen} toggle = {() =>togglesmProfileUpdateModal(!isMenteesAddModalOpen)}>
        <ModalHeader toggle={() => toggleMenteesAddModal(!isMenteesAddModalOpen)}>Add Mentees Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {addMentees}>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
              <div className="col-12"><input type="text" onChange={onChangeMenteesAdd} value={menteesRollNo} className="form-control" name="rollNo"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleMenteesAddModal(!isMenteesAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isMenteesDeleteModalOpen} toggle = {() =>toggleMenteesDeleteModal(!isMenteesDeleteModalOpen)}>
        <ModalHeader toggle={() => toggleMenteesDeleteModal(!isMenteesDeleteModalOpen)}>Delete Mentees Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {deleteMentees}>
            <div className="form-group row">
              <label className="form-label col-12">Id Number</label>
              <div className="col-12"><input type="number" min="1" max={localStorage.getItem('type')==='Student Mentor' ? smprofile.mentees.length : (localStorage.getItem('type') === 'Faculty Mentor' ? fmprofile.mentees.length : 1) } onChange={onChangeMenteesDelete} className="form-control" value={menteesDeleteId} name="menteesDeleteId"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleMenteesDeleteModal(!isMenteesDeleteModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
          </form>
        </ModalBody>
      </Modal>

      </>
    );
  }

  //function to show student mentor profile
  const showStudentMentorProfile = () => {
    if(smprofile_loading){
        return <Loading/>
      }

    else if(smprofile_error){
      console.log(smprofile_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>{localStorage.getItem('smentor')} Profile</h1>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            {localStorage.getItem('smentor') !== null && <button onClick={deletesmProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            {localStorage.getItem('smentor') !== null && <button onClick={onClicksmProfile} className="btn btn-success float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          </div>
          <div className="col-12 d-md-none">
            <center>
              {localStorage.getItem('smentor') !== null && <button onClick={() => togglesmProfileUpdateModal(!issmProfileUpdateModalOpen)} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
              localStorage.getItem('smentor') !== null<button onClick={deletesmProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            </center>
          </div>
        </div>

        <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
          <Card className="col-12 col-md-6">
            <center>
              {
                smprofile && <img
                  className="card-img rounded-circle top"
                  style={{ width: "250px", height: "300px" }}
                  src={server + smprofile.id}
                  alt={smprofile.name}
                />
              }
            </center>
          </Card>
          <div className="col-10 offset-2 col-md-5 offset-md-1">
            <div>
              <p></p><br />
              <p><b>Name: </b>{smprofile.name}</p>
              <p><b>RollNo:</b>{smprofile.rollNo}</p>
              <p><b>Batch:</b>{smprofile.batch}</p>
              <p><b>Email:</b>{smprofile.mailId}</p>
            </div>
          </div>
        </div>

        {showmentees()}

        <Modal isOpen = {issmProfileUpdateModalOpen} toggle = {() =>togglesmProfileUpdateModal(!issmProfileUpdateModalOpen)}>
          <ModalHeader toggle={() => togglesmProfileUpdateModal(!issmProfileUpdateModalOpen)}>Update Student Mentor Profile</ModalHeader>
          <ModalBody>
            <form onSubmit = {updatesmProfile}>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
                <div className="col-12"><input type="text" onChange={onChangesmProfileUpdate} value={smprofileUpdate.rollNo} className="form-control" name="rollNo"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Name: </label>
                <div className="col-12"><input type="text" onChange={onChangesmProfileUpdate} value={smprofileUpdate.name} className="form-control" name="name"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Mail Id: </label>
                <div className="col-12"><input type="email" onChange={onChangesmProfileUpdate} value={smprofileUpdate.mailId} className="form-control" name="mailId"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Batch: </label>
                <div className="col-12"><input type="text" className="form-control" onChange={onChangesmProfileUpdate} value={smprofileUpdate.batch} name="batch"/></div>
              </div>
              <div className ="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Profile Picture: </label>
                <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => togglesmProfileUpdateModal(!issmProfileUpdateModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Update</button>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }

  //function to show student mentor profile
  const showFacultyMentorProfile = () => {
    if(fmprofile_loading){
        return <Loading/>
      }

    else if(fmprofile_error){
      console.log(fmprofile_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>{localStorage.getItem('fmentor')} Profile</h1>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            {localStorage.getItem('fmentor') !== null && <button onClick={deletefmProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            {localStorage.getItem('fmentor') !== null && <button onClick={onClickfmProfile} className="btn btn-success float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          </div>
          <div className="col-12 d-md-none">
            <center>
              {localStorage.getItem('fmentor') !== null && <button onClick={() => togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen)} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
              localStorage.getItem('fmentor') !== null<button onClick={deletefmProfile} className="btn btn-danger float-md-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Delete</button>}
            </center>
          </div>
        </div>

        <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
          <Card className="col-12 col-md-6">
            <center>
              {
                fmprofile && <img
                  className="card-img rounded-circle top"
                  style={{ width: "250px", height: "300px" }}
                  src={server + fmprofile.id}
                  alt={fmprofile.name}
                />
              }
            </center>
          </Card>
          <div className="col-10 offset-2 col-md-5 offset-md-1">
            <div>
              <p></p><br />
              <p><b>Name: </b>{fmprofile.name}</p>
              <p><b>RollNo:</b>{fmprofile.rollNo}</p>
              <p><b>Email:</b>{fmprofile.mailId}</p>
            </div>
          </div>
        </div>

        {showmentees()}

        <Modal isOpen = {isfmProfileUpdateModalOpen} toggle = {() =>togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen)}>
          <ModalHeader toggle={() => togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen)}>Update Faculty Mentor Profile</ModalHeader>
          <ModalBody>
            <form onSubmit = {updatefmProfile}>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
                <div className="col-12"><input type="text" onChange={onChangefmProfileUpdate} value={fmprofileUpdate.rollNo} className="form-control" name="rollNo"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Name: </label>
                <div className="col-12"><input type="text" onChange={onChangefmProfileUpdate} value={fmprofileUpdate.name} className="form-control" name="name"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Mail Id: </label>
                <div className="col-12"><input type="email" onChange={onChangefmProfileUpdate} value={fmprofileUpdate.mailId} className="form-control" name="mailId"/></div>
              </div>
              <div className="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Batch: </label>
                <div className="col-12"><input type="text" className="form-control" onChange={onChangefmProfileUpdate} value={fmprofileUpdate.batch} name="batch"/></div>
              </div>
              <div className ="form-group row">
                <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Profile Picture: </label>
                <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => togglefmProfileUpdateModal(!isfmProfileUpdateModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Update</button>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }

  const getPerson = (e) =>{
    e.preventDefault();
    if(type === 'Student'){
      const user = students.filter((student)=>username===student);
      if(user.length > 0){
        localStorage.setItem('student',username);
        localStorage.setItem('type',type);
        getProfile();
        getAttendance();
      }
      else{
        setAlert("Student not found");
      }
    }
    else if(type === 'Student Mentor'){
      const user = smentors.filter((student)=>username===student);
      if(user.length > 0){
        localStorage.setItem('smentor',username);
        localStorage.setItem('type',type);
        getsmProfile();
      }
      else{
        setAlert("Student Mentor not found");
      }
    }
    else if(type === 'Faculty Mentor'){
      const user = fmentors.filter((student)=>username===student);
      if(user.length > 0){
        localStorage.setItem('fmentor',username);
        localStorage.setItem('type',type);
        getfmProfile();
      }
      else{
        setAlert("Faculty Mentor not found");
      }
    }
  }

  const onClickClear = () => {
    if(localStorage.getItem('student') !== null){
      localStorage.removeItem('student')
      localStorage.removeItem('type')
    }
    if(localStorage.getItem('smentor') !== null){
      localStorage.removeItem('smentor')
      localStorage.removeItem('type')
    }
    if(localStorage.getItem('fmentor') !== null){
      localStorage.removeItem('fmentor')
      localStorage.removeItem('type')
    }
    getStudents();
    getSmentors();
    getFmentors();
  }


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

  const showSmentors = () => {
    if(smentors_loading){
        return <Loading/>
      }

    else if(smentors_error){
      console.log(smentors_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="row">
        <ol>
          {smentors.map((student,i)=><li key={i}>{student}</li>)}
        </ol>
      </div>
    );
  }

  const showFmentors = () => {
    if(fmentors_loading){
        return <Loading/>
      }

    else if(fmentors_error){
      console.log(fmentors_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      <div className="row">
        <ol>
          {fmentors.map((student,i)=><li key={i}>{student}</li>)}
        </ol>
      </div>
    );
  }

  const getDetails = () => {
    if(localStorage.getItem('student') !== null){
      return(
        <>
          {showProfile()}
          {showAttendance()}
        </>
      )
    }
    else if(localStorage.getItem('smentor') !== null){
      return(
        <>
          {showStudentMentorProfile()}
        </>
      )
    }
    else if(localStorage.getItem('fmentor') !== null){
      return(
        <>
          {showFacultyMentorProfile()}
        </>
      )
    }
    return(
      <div className="row ml-md-5">
        <div className="col-12 col-sm-6 col-md-4">
          <h3>Students</h3>
          {showStudents()}
        </div>
        <div className="col-12 d-sm-none d-md-block col-md-4">
          <h3>Student Mentors</h3>
          {showSmentors()}
        </div>
        <div className="col-12 d-sm-none d-md-block col-md-4">
          <h3>Faculty Mentors</h3>
          {showFmentors()}
        </div>
        <div className="col-12 d-none d-sm-block d-md-none col-sm-6">
          <h3>Student Mentors</h3>
          {showSmentors()}
          <h3>Faculty Mentors</h3>
          {showFmentors()}
        </div>
      </div>
    )
  }

  return(
    <div className="container">
      <div className="row justify-content-center">
        {(localStorage.getItem('student') !== null || localStorage.getItem('smentor') !== null || localStorage.getItem('staff') !==null ) && <h1>{type}</h1>}
      </div>
      <div className="row m-1">
        <div className="col-12 d-none d-md-block">
          <form onSubmit={getPerson}>
            <div className="form-group row">
              <div className="col-12 col-md-4">
                <input type="text" required value={username} name="username" onChange={onPersonChange} placeholder="Roll No..." className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}}/>
              </div>
              <div className="col-4 col-md-3">
                {
                  (localStorage.getItem('student') !== null || localStorage.getItem('smentor') !== null || localStorage.getItem('staff') !==null ) ?
                  <select value={type} disabled name="type" className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}} onChange={onPersonChange}>
                    <option>Student</option>
                    <option>Student Mentor</option>
                    <option>Faculty Mentor</option>
                  </select> :
                  <select value={type} name="type" className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}} onChange={onPersonChange}>
                    <option>Student</option>
                    <option>Student Mentor</option>
                    <option>Faculty Mentor</option>
                  </select>
                }
              </div>
              <div className="col-8 col-md-5">
                {(localStorage.getItem('student') === null && localStorage.getItem('smentor') === null && localStorage.getItem('fmentor') === null ) &&  <button type="button" onClick={deleteUser} className="btn btn-danger col-4 ml-1 float-right">Delete</button>}
                {(localStorage.getItem('student') === null && localStorage.getItem('smentor') === null && localStorage.getItem('fmentor') === null ) &&  <button type="button" onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-success col-3 ml-1 float-right">Add</button>}
                {(localStorage.getItem('student') !== null || localStorage.getItem('smentor') !== null || localStorage.getItem('fmentor') !==null ) && <button type="button" onClick={onClickClear} className="btn btn-dark col-4 ml-1 float-right"> Back </button>}
                <button type="submit"  className="btn btn-primary float-right mr-1 col-4"> Search </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 d-md-none">
          <p/>
          <form onSubmit={getPerson}>
            <div className="form-group row">
              <div className="col-12">
                <input type="text" required value={username} name="username" onChange={onPersonChange} placeholder="Roll No..." className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-4">
                {
                  (localStorage.getItem('student') !== null || localStorage.getItem('smentor') !== null || localStorage.getItem('staff') !==null ) ?
                  <select value={type} disabled name="type" className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}} onChange={onPersonChange}>
                    <option>Student</option>
                    <option>Student Mentor</option>
                    <option>Faculty Mentor</option>
                  </select> :
                  <select value={type} name="type" className="form-control" style={{borderRadius : '5px', boxShadow : '0px 0px 2px gray'}} onChange={onPersonChange}>
                    <option>Student</option>
                    <option>Student Mentor</option>
                    <option>Faculty Mentor</option>
                  </select>
                }
              </div>
              <div className="col-8">
                {(localStorage.getItem('student') === null && localStorage.getItem('smentor') === null && localStorage.getItem('fmentor') === null ) &&  <button type="button" onClick={deleteUser} className="btn btn-danger col-4 ml-1 float-right">Delete</button>}
                {(localStorage.getItem('student') === null && localStorage.getItem('smentor') === null && localStorage.getItem('fmentor') === null ) &&  <button type="button" onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-success col-3 ml-1 float-right">Add</button>}
                {(localStorage.getItem('student') !== null || localStorage.getItem('smentor') !== null || localStorage.getItem('staff') !==null ) && <button type="button" onClick={onClickClear} className="btn btn-dark float-right col-5 ml-1"> Clear </button>}
                <button type="submit"  className="btn btn-primary float-right col-4"> Search </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Alerts />

      {getDetails()}

      <Modal isOpen = {isAddModalOpen} toggle = {() =>toggleAddModal(!isAddModalOpen)}>
        <ModalHeader toggle={() => toggleAddModal(!isAddModalOpen)}>Add Profile</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="offset-3 col-6">
              <button type="submit" className="btn btn-primary col-12 m-1" onClick={() => {toggleProfileAddModal(!isProfileAddModalOpen);toggleAddModal(!isAddModalOpen)}}>Student</button>
            </div>
            <div className="offset-3 col-6">
              <button type="button" className="btn btn-success col-12 m-1" onClick={() => {togglesmProfileAddModal(!issmProfileAddModalOpen);toggleAddModal(!isAddModalOpen)}}>Student Mentor</button>
            </div>
            <div className="offset-3 col-6">
              <button type="button" className="btn btn-dark col-12 m-1" onClick={() => {togglefmProfileAddModal(!isfmProfileAddModalOpen);toggleAddModal(!isAddModalOpen)}}>Faculty Mentor</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isProfileAddModalOpen} toggle = {() =>toggleProfileAddModal(!isProfileAddModalOpen)}>
        <ModalHeader toggle={() => toggleProfileAddModal(!isProfileAddModalOpen)}>Add Student Profile</ModalHeader>
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

      <Modal isOpen = {issmProfileAddModalOpen} toggle = {() =>togglesmProfileAddModal(!issmProfileAddModalOpen)}>
        <ModalHeader toggle={() => togglesmProfileAddModal(!issmProfileAddModalOpen)}>Add Student Mentor Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {addsmProfile}>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Roll No: </label>
              <div className="col-12"><input type="text" onChange={onChangesmProfileAdd} className="form-control" name="rollNo"/></div>
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
            <button type="button" className="btn btn-success" onClick={() => togglesmProfileAddModal(!issmProfileAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isfmProfileAddModalOpen} toggle = {() =>togglefmProfileAddModal(!isfmProfileAddModalOpen)}>
        <ModalHeader toggle={() => togglefmProfileAddModal(!isfmProfileAddModalOpen)}>Add Faculty Mentor Profile</ModalHeader>
        <ModalBody>
          <form onSubmit = {addfmProfile}>
            <div className="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 form-label">Username: </label>
              <div className="col-12"><input type="text" onChange={onChangefmProfileAdd} className="form-control" name="rollNo"/></div>
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
            <button type="button" className="btn btn-success" onClick={() => togglefmProfileAddModal(!isfmProfileAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  )
}

export default Profile;
