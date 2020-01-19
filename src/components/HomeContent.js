import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, CustomInput} from 'reactstrap';
import Error from './Error';
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

  const [deleteId, setDeleteId] = useState(1)
  const [update, setUpdate] = useState({
    updateTitle:'',
    updateDesc:''
  });

  const {updateTitle, updateDesc} = update

  const [isAddModalOpen, toggleAddModal] = useState(false)
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)

  const onChangeDelete = e => setDeleteId(e.target.value)
  const onChangeUpdate = e => setUpdate({...update, 'updateDesc' : e.target.value });

  const onChangeTitle = async (e) => {
    setUpdate({...update, 'updateTitle' : e.target.value });
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('atoken')};
    var res = await axios.get(server + '/eventdetails?title='+e.target.value, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc
    })
  }

  const addTask = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('atoken')};
    event.preventDefault();
    var formData = new FormData(event.target);
    toggleAddModal(!isAddModalOpen);
    axios.post(server+'/addevent',formData,{headers})
    .then(() => {
      getEvents()
    });
  }

  const UpdateTask = (event) => {
    const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('atoken')};
    event.preventDefault();
    var formData = new FormData(event.target);
    toggleUpdateModal(!isUpdateModalOpen);
    axios.post(server+'/eventupdation',formData,{headers})
    .then(() => {
      getEvents()
    });
  }

  const DeleteTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('atoken')};
    event.preventDefault();
    const title = events[deleteId-1].title;
    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server+'/removeevent?title='+title, {headers})
    .then(() => {
      getEvents()
      setDeleteId(1)
    });
  }

  const onClickUpdate = async () => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('atoken')};
    toggleUpdateModal(!isUpdateModalOpen);
    var res = await axios.get(server + '/eventdetails?title='+events[0].title, {headers});
    setUpdate({
      updateTitle:res.data.title,
      updateDesc:res.data.desc
    })
  }

  if(events_loading){
    return <Loading/>
  }

  //any error can be handle by this
  else if(events_error){
    console.log(events_error)
    return <Error />
  }

  return (
    <div className="container">
      <div className="row ml-1 mr-1 justify-content-center">
        <div className="col-11 d-none d-md-block">
          <h3 className="float-left" >Tasks</h3>
          {events.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
          {events.length > 0 && <button onClick={onClickUpdate} className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary float-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <center className="col-12">
          <h3>Tasks</h3>
        </center>
        <center className="col-12">
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
          {events.length > 0 && <button onClick={onClickUpdate} className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold" type="button">Update</button>}
          {events.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
        </center>
      </div>
      <div className="row justify-content-center">
        {
          events.length > 0 && events.map((item,i) =>
            <div className="col-12 col-md-5 m-2" style={{border: '1px solid gray', boxShadow:'0px 0px 2px 2px gray', padding:'1px'}} key={item._id}>
              <div className="h3 bg-primary p-2 text-light">{i+1}. {item.title} :</div>
              <img src={server+item.id} alt={item.title} width = "100%"/>
              <p style={{textAlign : 'justify'}}> &nbsp; {item.desc}</p>
            </div>
          )
        }
      </div>

      <p />

      <Modal isOpen = {isAddModalOpen} toggle = {() =>toggleAddModal(!isAddModalOpen)}>
        <ModalHeader toggle={() => toggleAddModal(!isAddModalOpen)}>Add Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {addTask}>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Event Name: </label>
              <div className="col-12"><input type="text" name="title" className="form-control" required/></div>
            </div>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Event Poster: </label>
              <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
            </div>
            <div className="form-group mt-3 row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Description</label>
              <div className="col-12"><textarea className="form-control" name="desc" rows="5"></textarea></div>
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
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Event Name: </label>
              <div className="col-12">
                <select name="title" value={updateTitle} onChange={onChangeTitle} className="form-control">
                  {
                    events.map(event=>
                      <option key={event._id}>{event.title}</option>
                    )
                  }
                </select>
              </div>
            </div>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Event Poster: </label>
              <div className="col-12"><CustomInput type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" id="file" name="attachment" required/></div>
            </div>
            <div className="form-group mt-3 row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 form-label">Description</label>
              <div className="col-12"><textarea value={updateDesc} onChange={onChangeUpdate} className="form-control" name="desc" rows="5"></textarea></div>
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
