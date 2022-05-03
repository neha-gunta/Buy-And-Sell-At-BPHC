import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {Line} from "react-chartjs-2"

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className='card' style={{border:"3px solid grey"}}>
        
        <ul className='list-group'>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to='/create/category'>
            <h5 style={{color:"black"}}>
              Create Category</h5>
            </Link>
          </li>
                    
          <li className='list-group-item'>
          <Link className='nav-link' to='/admin/products'>
            <h5 style={{color:"black"}}>
              Manage Products</h5>
            </Link>
          </li>
          <li className='list-group-item' style={{backgroundColor:"#F0F0F0"}}>
            <Link className='nav-link' to='/admin/users'>
            <h5 style={{color:"black"}}>
              Manage Users</h5>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/stats'>
            <h5 style={{color:"black"}}>
              Statistics</h5>
            </Link>
          </li>

        </ul>
      </div>
    );
  };

  const adminInfo = () => {
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

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{adminInfo()}</div>
      </div>
      <div className="stats">
        

      </div>
    </Layout>
  );
};

export default AdminDashboard;
