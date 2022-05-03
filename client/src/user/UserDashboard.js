import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card' style={{border:"3px solid grey"}}>
        
        <ul className='list-group'>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to='/cart'>
            <h5 style={{color:"black"}}>
              My wishlist</h5>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/createReq`}>
            <h5 style={{color:"black"}}>
              Create Buy Request</h5>
            </Link>
          </li>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to={`/buyreq/${_id}`}>
            <h5 style={{color:"black"}}>
              Manage my Buy Requests</h5>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
            <h5 style={{color:"black"}}>
              Create product</h5>
            </Link>
          </li>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to='/admin/products'>
            <h5 style={{color:"black"}}>
              Manage My Products</h5>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/user/Interested'>
            <h5 style={{color:"black"}}>
              Interested Porducts</h5>
            </Link>
          </li>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to={`/profile/${_id}`}>
            <h5 style={{color:"black"}}>
              Update profile</h5>
            </Link>
          </li>

        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>USER INFORMATION</h3>
        <ul className='list-group'>
          <li className='list-group-item'><h4>{name}</h4></li>
          <li className='list-group-item'><h5>Email: {email}</h5></li>
          <li className='list-group-item'><h5>
            {role === 1 ? 'Admin' : 'Registered user'}</h5>
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          {userInfo()}
          
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
