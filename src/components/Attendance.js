import React, {useState, useContext, useEffect} from 'react';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';
import AlertContext from '../context/alert/alertContext';
import Alerts from './Alerts';

const Attendance = () => {

  //get details from context
  const dataContext = useContext(DataContext);
  const {
    students, students_loading, students_error, getStudents,
  } = dataContext;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;

  useEffect(()=>{
    getStudents();
    //eslint-disable-next-line
  },[])

  const [att, setAtt ] = useState({})

  const [date, setDate] = useState('');

  const onChangeDate = e => setDate(e.target.value);
  const onChangeatt = e =>setAtt({
      ...att,
      [e.target.name] : !att[e.target.name]
    })

  const postAtt = (e) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    e.preventDefault();
    let attendance = {};
    let day = date.slice(8,10), month = date.slice(5,7) , year = date.slice(0,4);
    attendance.date = day+'/'+month+'/'+year;
    students.map(student => {
      if(att[student]===undefined){
        attendance[student] = false
      }
      else{
        attendance[student] = att[student]
      }
    })

    axios.get(server + '/studentattendance?rollNo=' + students[0],{headers})
    .then((res)=>{
      let a = res.data.dates.filter((data) => data.date === attendance.date )
      if(a.length > 0){
        setAlert('Date already present')
      }
      else{
        axios.post(server + '/postattendance',attendance,{headers})
        .then(()=>{
          setDate('')
        })
      }
    })
  }

  const createform = () => {
    if(students_loading){
        return <Loading/>
      }

    else if(students_error){
      console.log(students_error);
      return <h1>Something goes wrong</h1>
    }

    return(
      students.map((student,i)=>{
        return(
            <div className="form-group col-md-6" key={i}>
              <label className="col-4" style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} >{student}:</label>
              <div className="col-4 form-check-inline">
                <input type="checkbox" onChange={onChangeatt} className="form-check-input col-2" name={student} />
                <label className="form-check-label text-primary" style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} >Present</label>
              </div>
            </div>
        )
      })
    )

  }

  return(
    <div className="container">
      <div className="row">
        <center className="col-12">
          <h1>Post Attendance</h1>
        </center>
      </div>
      <Alerts />
      <form onSubmit={postAtt}>
        <div className="form-group row">
          <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px'}} className="col-12 col-md-1 form-label ml-md-3">Date: </label>
          <div className="col-12 col-md-8"><input type="date" required className="form-control" value={date} onChange={onChangeDate} name="date"/></div>
        </div>
        <div className="form-row">
          {createform()}
        </div>
        <div className="row">
          <div className="col-12 offset-md-1 col-md-8">
            <button type="submit" className="btn ml-md-3 btn-primary bold btn-block pl-4 pr-4">Post Attendance</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Attendance;
