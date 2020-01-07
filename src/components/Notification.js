import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';

const Notification = () => {

  const dataContext = useContext(DataContext);
  var { notifications, notifications_loading, notifications_error, getNotifications } = dataContext;

  useEffect(() => {
    getNotifications();
    //eslint-disable-next-line
  },[]);

  const [add, setAdd] = useState({
    addTitle:'',
    addDesc:''
  })
  const [deleteId, setDeleteId] = useState(1)
  const [update, setUpdate] = useState({
    updateTitle:'',
    updateDesc:''
  });

  const {addTitle, addDesc} = add
  var {updateTitle, updateDesc} = update

  const [isAddModalOpen, toggleAddModal] = useState(false)
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)

  const onChangeAdd = e => setAdd({...add, [e.target.name] : e.target.value });
  const onChangeUpdate = e => setUpdate({...update, [e.target.name] : e.target.value });
  const onChangeDelete = e => setDeleteId(e.target.value)

  const onChangeTitle = async (e) => {
    setUpdate({...update, [e.target.name] : e.target.value });
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    var res = await axios.get(server + '/notificationdetails?title='+e.target.value, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc,
    })
  }

  const addTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    let notifi = {};
    notifi.title = addTitle;
    notifi.desc = addDesc;
    toggleAddModal(!isAddModalOpen);
    axios.post(server+'/addnotification',notifi,{headers})
    .then(() => {
      getNotifications()
      setAdd({
        addTitle:'',
        addDesc:''
      })
    });
  }

  const UpdateTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    if(updateTitle === ''){
      updateTitle = notifications[0].title
    }
    let notifi = {};
    notifi.title = updateTitle;
    notifi.desc = updateDesc;
    toggleUpdateModal(!isUpdateModalOpen);
    axios.post(server+'/notificationupdation',notifi,{headers})
    .then(() => {
      getNotifications()
      setUpdate({
        updateTitle:'',
        updateDesc:''
      })
    });
  }

  const DeleteTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const title = notifications[deleteId-1].title;
    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server+'/removenotification?title='+title, {headers})
    .then(() => {
      getNotifications()
      setDeleteId(1)
    });
  }

  const onClickUpdate = async () => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    toggleUpdateModal(!isUpdateModalOpen);
    var res = await axios.get(server + '/notificationdetails?title='+notifications[0].title, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc,
    })
  }

  if(notifications_loading){
    return <Loading/>
  }

  //any error can be handle by this
  else if(notifications_error){
    console.log(notifications_error)
    return <h1>Something goes wrong</h1>
  }

  return (
    <div className="container">
      <div className="row ml-1 mr-1">
        <div className="col-12 d-none d-md-block">
          <h3 className="float-left" >Notifications</h3>
          {notifications.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
          {notifications.length > 0 && <button onClick={onClickUpdate} className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary float-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <center className="col-12">
          <h3>Tasks</h3>
        </center>
        <center className="col-12">
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
          {notifications.length > 0 && <button onClick={onClickUpdate} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          {notifications.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
        </center>
      </div>
      <div className="row mt-2" style={{marginLeft:'5px'}}>
        {
          notifications.length > 0 && notifications.map(item =>
            <div className="col-12 mb-2" key={item._id} style={{border: '1px solid gray', boxShadow:'0px 0px 2px 2px gray', padding:'1px'}}>
              <h1>{item.title}</h1>
              <p> &nbsp; {item.desc}</p>
            </div>
          )
        }
      </div>

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
            <button type="button" className="btn btn-success" onClick={() => toggleAddModal(!isAddModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen = {isUpdateModalOpen} toggle = {() =>toggleUpdateModal(!isUpdateModalOpen)}>
        <ModalHeader toggle={() => toggleUpdateModal(!isUpdateModalOpen)}>Update Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {UpdateTask}>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Title </label>
              <div className="col-12">
                <select name="updateTitle" value={updateTitle} onChange={onChangeTitle} className="form-control">
                  {
                    notifications.map(notifi=>
                      <option key={notifi._id}>{notifi.title}</option>
                    )
                  }
                </select>
              </div>
            </div>
            <div className="form-group mt-3 row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Description</label>
              <div className="col-12"><textarea value={updateDesc} className="form-control" onChange={onChangeUpdate} name="updateDesc" rows="5"></textarea></div>
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
              <div className="col-12"><input type="number" min="1" max={notifications.length} onChange={onChangeDelete} className="form-control" id="deleteId" value={deleteId} name="deleteId"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleDeleteModal(!isDeleteModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default Notification;
