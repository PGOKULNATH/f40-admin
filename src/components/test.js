import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';

const HomeContent = () => {

  const dataContext = useContext(DataContext);
  const { events, events_loading, events_error, getEvents } = dataContext;

  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  },[]);

  const [add, setAdd] = useState({
    addTopic:'',
    addTasktype:'Daily',
    addDate:'',
    addTime:''
  })
  const [deleteId, setDeleteId] = useState(1)
  const [update, setUpdate] = useState({
    updateId:1,
    updateDate:'',
    updateTime:''
  });

  const {addTopic, addTasktype, addDate, addTime} = add
  const {updateId, updateDate, updateTime} = update

  const [isAddModalOpen, toggleAddModal] = useState(false)
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)

  const onChangeAdd = e => setAdd({...add, [e.target.name] : e.target.value });
  const onChangeUpdate = e => setUpdate({...update, [e.target.name] : e.target.value });
  const onChangeDelete = e => setDeleteId(e.target.value)

  const addTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();

    toggleAddModal(!isAddModalOpen);
    axios.post(server+'/addtask',{headers})
    .then(() => {
      getEvents()
      setAdd({
        addTopic:'',
        addTasktype:'Daily',
        addDate:'',
        addTime:''
      })
    });
  }

  const UpdateTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();

    toggleUpdateModal(!isUpdateModalOpen);
    axios.post(server+'/modifytask?rollNo='+localStorage.getItem('user'),{headers})
    .then(() => {
      getEvents()
      setUpdate({
        updateId : 1,
        updateDate : '',
        updateTime : ''
      })
    });
  }

  const DeleteTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();

    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server+'/removetask', {headers})
    .then(() => {
      getEvents()
      setDeleteId(1)
    });
  }

  if(events_loading){
    return <Loading/>
  }

  //any error can be handle by this
  else if(events_error){
    console.log(events_error)
    return <h1>Something goes wrong</h1>
  }

  return (
    <div className="container">
      <div className="row ml-1 mr-1">
        <div className="col-12 d-none d-md-block">
          <h3 className="float-left" >Tasks</h3>
          <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>
          <button onClick={() => toggleUpdateModal(!isUpdateModalOpen)} className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary float-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <center className="col-12">
          <h3>Tasks</h3>
        </center>
        <center className="col-12">
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
          <button onClick={() => toggleUpdateModal(!isUpdateModalOpen)} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>
          <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>
        </center>
      </div>
      <div className="row">
        {
          events.map(item =>
            <div className="col-12 col-md-6" style={{border: '1px solid gray', boxShadow:'0px 0px 2px 2px gray', padding:'1px'}} key={item._id}>
              <div className="h3 bg-primary text-light">{item.title} :</div>
              <img src={server+item.id} alt={item.title} width = "100%"/>
              <p style={{textAlign : 'justify'}}> &nbsp; {item.desc}</p>
            </div>
          )
        }
      </div>

      <Modal isOpen = {isAddModalOpen} toggle = {() =>toggleAddModal(!isAddModalOpen)}>
        <ModalHeader toggle={() => toggleAddModal(!isAddModalOpen)}>Add Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {addTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTopic">Topic</label>
              <div className="col-12"><input type="text" onChange={onChangeAdd} className="form-control" id="addTopic" name="addTopic"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTaskType">Task Type</label>
              <div className="col-12">
                <select onChange={onChangeAdd} className="form-control" id="addTasktype" name="addTasktype">
                  <option value="Daily">Daily</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addDate">Deadline Date</label>
              <div className="col-12"><input type="date" onChange={onChangeAdd} className="form-control" id="addDate" name="addDate"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTime">Deadline Time</label>
              <div className="col-12"><input type="time" onChange={onChangeAdd} className="form-control" id="addTime" name="addTime"/></div>
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
              <label className="form-label col-12" htmlFor="updateId">Id Number</label>
              <div className="col-12"><input type="number" min="1" max={events.length} onChange={onChangeUpdate} className="form-control" id="updateId" value={updateId} name="updateId"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateDate">Deadline Date</label>
              <div className="col-12"><input type="date" onChange={onChangeUpdate} className="form-control" id="updateDate" name="updateDate"/></div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateTime">Deadline Time</label>
              <div className="col-12"><input type="time" onChange={onChangeUpdate} className="form-control" id="updateTime" name="updateTime"/></div>
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
              <div className="col-12"><input type="number" min="1" max={events.length} onChange={onChangeDelete} className="form-control" id="deleteId" value={deleteId} name="deleteId"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleDeleteModal(!isDeleteModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default HomeContent;
