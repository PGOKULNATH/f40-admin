import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import DataContext from '../context/data/dataContext';
import server from '../config/server';

const HomeContent = () => {

  const dataContext = useContext(DataContext);
  const { events, events_loading, events_error, getEvents } = dataContext;

  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  },[]);

  return (
    <div className="container">
      <div className = "row">
        <div className="col-12 col-md-6">
          <center className="row h1">Events</center>
          <div className="row">
            {
              events_loading ? <Loading /> :
              (events_error ? <div>Something goes wrong</div> :
                (events.map(item =>
                  <div className="col-12" style={{border: '1px solid gray', boxShadow:'0px 0px 2px 2px gray', padding:'1px'}} key={item._id}>
                    <div className="h3 bg-primary text-light">{item.title} :</div>
                    <img src={server+item.id} alt={item.title} width = "100%"/>
                    <p style={{textAlign : 'justify'}}> &nbsp; {item.desc}</p>
                  </div>
                )))
              }
          </div>
        </div>
      </div>
      <p />
    </div>
  );
};

export default HomeContent;
