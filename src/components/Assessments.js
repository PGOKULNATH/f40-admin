import React, {useState, useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Loading from './Loading';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';

const Assessments = () => {

  const dataContext = useContext(DataContext);
  const { assessments, assessments_loading, assessments_error, getAssessments } = dataContext;

  useEffect(() => {
    getAssessments();
    //eslint-disable-next-line
  },[]);

  const [add, setAdd] = useState({
    addAssessmentType:'Daily',
    addLink:'',
    addTopic:''
  })
  const [deleteId, setDeleteId] = useState(1)

  const {addAssessmentType, addLink, addTopic} = add

  const [isAddModalOpen, toggleAddModal] = useState(false)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)

  const onChangeAdd = e => setAdd({...add, [e.target.name] : e.target.value });
  const onChangeDelete = e => setDeleteId(e.target.value)

  const addTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    let assess = {};
    assess.assessmentType = addAssessmentType;
    assess.topic = addTopic;
    assess.link = addLink;
    toggleAddModal(!isAddModalOpen);
    axios.post(server+'/addassessment',assess,{headers})
    .then(() => {
      getAssessments()
      setAdd({
        addAssessmentType:'Daily',
        addLink:'',
        addTopic:''
      })
    });
  }

  const DeleteTask = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('token')};
    event.preventDefault();
    const topic = assessments[deleteId-1].topic;
    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server+'/removeassessment?topic='+topic, {headers})
    .then(() => {
      getAssessments()
      setDeleteId(1)
    });
  }

  if(assessments_loading){
      return <Loading/>
    }

  else if(assessments_error){
    console.log(assessments_error);
    return <h1>Something goes wrong</h1>
  }

  return(
    <div className="container" style={{fontSize: '22px'}}>
      <div className="row ml-1 mr-1">
        <div className="col-12 d-none d-md-block">
          <h3 className="float-left" >Tasks</h3>
          {assessments.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-success float-right bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <center className="col-12">
          <h3>Assessments</h3>
        </center>
        <center className="col-12">
          <button onClick={() => toggleAddModal(!isAddModalOpen)} className="btn btn-success bold pl-4 pr-4 mr-1 font-weight-bold" type="button">Add</button>
          {assessments.length > 0 && <button onClick={() => toggleDeleteModal(!isDeleteModalOpen)} className="btn btn-danger bold pl-3 pr-3 font-weight-bold" type="button">Delete</button>}
        </center>
      </div>
      <div className="row">
        {
          assessments.length > 0 && assessments.map((val,i)=>
           <div className="col-12" key={val._id} style={{backgroundColor: '#d2d3d4' ,border:'1px solid blue',padding :'10px', borderRadius : '10px', margin : '5px'}}>
             <p style={{float:'left'}}><b style={{padding:'2px', fontSize:'20px', textShadow:'1px 1px gray'}}>{i+1}. Topic: </b>{val.topic}</p>
             <p style={{float:'right', padding:'10px 20px', fontSize:'17px', borderRadius : '5px'}} className="badge badge-info">{val.assessmentType[0].toUpperCase() + val.assessmentType.slice(1)}</p>
             <p  style={{clear:'both'}}/>
             <p className="text-center"><b>Link:</b><a href={val.link}>{val.link}</a></p>
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
              <label className="form-label col-12" htmlFor="addAssessmentType">Assessment Type</label>
              <div className="col-12">
                <select onChange={onChangeAdd} className="form-control" id="addAssessmentType" name="addAssessmentType">
                  <option value="Daily">Daily</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
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

      <Modal isOpen = {isDeleteModalOpen} toggle = {() =>toggleDeleteModal(!isDeleteModalOpen)}>
        <ModalHeader toggle={() => toggleDeleteModal(!isDeleteModalOpen)}>Delete Task</ModalHeader>
        <ModalBody>
          <form onSubmit = {DeleteTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="deleteId">Id Number</label>
              <div className="col-12"><input type="number" min="1" max={assessments.length} onChange={onChangeDelete} className="form-control" id="deleteId" value={deleteId} name="deleteId"/></div>
            </div>
            <button type="button" className="btn btn-success" onClick={() => toggleDeleteModal(!isDeleteModalOpen)}>Cancel</button> &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
          </form>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default Assessments;
