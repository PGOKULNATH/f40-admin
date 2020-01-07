import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import DataContext from '../context/data/dataContext';
import server from '../config/server';

const Notification = () => {

  const dataContext = useContext(DataContext);
  const { notifications, notifications_loading, notifications_error, getNotifications } = dataContext;

  useEffect(() => {
    getNotifications();
    //eslint-disable-next-line
  },[]);

  return (
    <div className="container">
      <div className = "row">
        <div className="col-12">
          <center className="row h1" style={{marginLeft:'5px'}}>Notifications</center>
          <div className="row" style={{marginLeft:'5px'}}>
            {
              notifications_loading ? <Loading /> :
              (notifications_error ? <h1>Something goes wrong</h1> :
                (notifications.map(item =>
                  <div className="col-12 mb-2" key={item._id} style={{border: '1px solid gray', boxShadow:'0px 0px 2px 2px gray', padding:'1px'}}>
                    <h1>{item.title}</h1>
                    <p> &nbsp; {item.desc}</p>
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

export default Notification;
