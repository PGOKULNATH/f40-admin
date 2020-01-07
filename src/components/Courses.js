import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';
import { Accordion,Button } from "react-bootstrap";

const Courses = () => {

  const dataContext = useContext(DataContext);
  const { courses, courses_loading, courses_error, getCourses } = dataContext;

  useEffect(() => {
    getCourses();
    //eslint-disable-next-line
  },[]);

  const [add, setAdd] = useState({
    addTitle:'',
    addDesc:'',
    addPrice:'',
    addFinancialaid:'Yes',
    addLink:''
  })
  const [deleteId, setDeleteId] = useState(1)
  const [update, setUpdate] = useState({
    updateTitle:'',
    updateDesc:'',
    updatePrice:'',
    updateFinancialaid:'Yes',
    updateLink:''
  });

  const {addTitle, addDesc, addPrice, addFinancialaid, addLink} = add
  const {updateTitle, updateDesc, updatePrice, updateFinancialaid, updateLink} = update

  const [isAddModalOpen, toggleAddModal] = useState(false)
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)

  const onChangeAdd = e => setAdd({...add, [e.target.name] : e.target.value });
  const onChangeUpdate = e => setUpdate({...update, [e.target.name] : e.target.value });
  const onChangeDelete = e => setDeleteId(e.target.value)

  const onChangeTitle = async (e) => {
    setUpdate({...update, [e.target.name] : e.target.value });
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    var res = await axios.get(server + '/coursedetails?title='+e.target.value, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc,
      updatePrice:res.data.price,
      updateFinancialaid:res.data.financialaid,
      updateLink:res.data.link
    })
  }

  const addTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    let course = {};
    course.title = addTitle;
    course.desc = addDesc;
    course.price = addPrice;
    course.financialaid = addFinancialaid;
    course.link = addLink;
    toggleAddModal(!isAddModalOpen);
    axios.post(server+'/addcourse',course,{headers})
    .then(() => {
      getCourses()
      setAdd({
        addTitle:'',
        addDesc:'',
        addPrice:'',
        addFinancialaid:'Yes',
        addLink:''
      })
    });
  }

  const UpdateTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    let course = {};
    course.title = updateTitle;
    course.desc = updateDesc;
    course.price = updatePrice;
    course.financialaid = updateFinancialaid;
    course.link = updateLink;
    toggleUpdateModal(!isUpdateModalOpen);
    axios.post(server+'/courseupdation',course,{headers})
    .then(() => {
      getCourses()
      setUpdate({
        updateTitle:'',
        updateDesc:'',
        updatePrice:'',
        updateFinancialaid:'Yes',
        updateLink:''
      })
    });
  }

  const DeleteTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const title = courses[deleteId-1].title;
    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server+'/removecourse?title='+title, {headers})
    .then(() => {
      getCourses()
      setDeleteId(1)
    });
  }

  const onClickUpdate = async () => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    toggleUpdateModal(!isUpdateModalOpen);
    var res = await axios.get(server + '/coursedetails?title='+courses[0].title, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc,
      updatePrice:res.data.price,
      updateFinancialaid:res.data.financialaid,
      updateLink:res.data.link
    })
  }

  if(courses_loading){
      return <Loading/>
    }

  else if(courses_error){
    console.log(courses_error);
    return <h1>Something goes wrong</h1>
  }

  return(
    <div className="container">
      <div className="row ml-1 mr-1">
        <div className="col-12 d-none d-md-block">
          <h3 className="float-left" >Tasks</h3>
          {courses.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
          {courses.length >0 && <button onClick={onClickUpdate} className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary float-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <center className="col-12">
          <h3>Courses</h3>
        </center>
        <center className="col-12">
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
          {courses.length > 0 && <button onClick={onClickUpdate} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          {courses.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
        </center>
      </div>
      <Accordion className= "container">
        {
          courses.length > 0 && courses.map((item,i) => {
            return(<div className ="row" key={item._id} style={{border:'1px solid #3f99d9',margin:'10px',borderRadius:'5px',boxShadow:'0px 0px 2px 2px #57ebe4'}}>
              <div className="col-12" style={{padding:'0px',margin:'0px'}}>
                <Accordion.Toggle as={Button} eventKey={item._id} className="col-12" style={{fontSize : '20px', padding:'15px'}}>
                  <p style={{float : 'left'}}>{i+1}. {item.title}</p>
                  <p className="badge badge-success" style={{float : 'right', fontSize : '20px', padding : '10px 20px', backgroundColor : '#34e02b'}}>{item.price}</p>
                </Accordion.Toggle>
              </div>
              <Accordion.Collapse eventKey={item._id} className="col-12" style={{padding:'10px',margin:'5px'}}>
                <div className="col-12">
                  <p style={{textAlign : 'justify', padding:'2px', fontWeight:'bold', fontSize:'25px'}}>Description : </p>
                  <p>{item.desc}</p>
                  <p style={{padding:'2px', fontWeight:'bold', fontSize:'25px'}}>Financial Aid available :  {item.financialaid === 'Yes' ? <span style={{color : 'green'}}>Yes</span> : (item.financialaid === 'No' ? <span style={{color : 'red'}}>No</span> : <span style={{color : '#deed05'}}>Not Required</span> ) } </p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{backgroundColor : '#99087c', color:'white', fontSize : '20px'}} className="btn btn-block">Go to Course</a>
                </div>
              </Accordion.Collapse>
            </div>
          )})
        }
      </Accordion>

      <Modal isOpen = {isAddModalOpen} toggle = {() =>toggleAddModal(!isAddModalOpen)}>
        <ModalHeader toggle={() => toggleAddModal(!isAddModalOpen)}>Add Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {addTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTitle">Title</label>
              <div className="col-12"><input type="text" onChange={onChangeAdd} className="form-control" id="addTitle" name="addTitle"/></div>
            </div>
            <div className="form-group mt-3 row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Description</label>
              <div className="col-12"><textarea className="form-control" onChange={onChangeAdd} name="addDesc" rows="5"></textarea></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addFinancialaid">Financialaid</label>
              <div className="col-12">
                <select onChange={onChangeAdd} className="form-control" id="addFinancialaid" name="addFinancialaid">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Not Required">Not Required</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addPrice">Price</label>
              <div className="col-12"><input type="text" onChange={onChangeAdd} className="form-control" id="addPrice" value={addPrice} name="addPrice"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addLink">Link</label>
              <div className="col-12"><input type="text" onChange={onChangeAdd} className="form-control" id="addLink" name="addLink"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleAddModal(!isAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isUpdateModalOpen} toggle = {() =>toggleUpdateModal(!isUpdateModalOpen)}>
        <ModalHeader toggle={() => toggleUpdateModal(!isUpdateModalOpen)}>Update Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {UpdateTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTitle">Title</label>
              <div className="col-12">
                <select onChange={onChangeTitle} value={updateTitle} className="form-control" id="updateTitle" name="updateTitle">
                  {
                    courses.map(course=>
                      <option key={course._id}>{course.title}</option>
                    )
                  }
                </select>
              </div>
            </div>
            <div className="form-group mt-3 row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Description</label>
              <div className="col-12"><textarea className="form-control" value={updateDesc} onChange={onChangeUpdate} name="updateDesc" rows="5"></textarea></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateFinancialaid">Financialaid</label>
              <div className="col-12">
                <select onChange={onChangeUpdate} value={updateFinancialaid} className="form-control" id="updateFinancialaid" name="updateFinancialaid">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Not Required">Not Required</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updatePrice">Price</label>
              <div className="col-12"><input type="text" onChange={onChangeUpdate} className="form-control" id="updatePrice" value={updatePrice} name="updatePrice"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateLink">Link</label>
              <div className="col-12"><input type="text" onChange={onChangeUpdate} value={updateLink} className="form-control" id="updateLink" name="updateLink"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleUpdateModal(!isUpdateModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Update</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isDeleteModalOpen} toggle = {() =>toggleDeleteModal(!isDeleteModalOpen)}>
        <ModalHeader toggle={() => toggleDeleteModal(!isDeleteModalOpen)}>Delete Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {DeleteTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="deleteId">Id Number</label>
              <div className="col-12"><input type="number" min="1" max={courses.length} onChange={onChangeDelete} className="form-control" id="deleteId" value={deleteId} name="deleteId"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleDeleteModal(!isDeleteModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default Courses;
