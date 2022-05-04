

import Axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../config';
import Layout from '../core/Layout';

export default function ManageUsers() {
const [users,setUsers]=useState([{}])

useEffect(()=>{
    Axios.get(`${API}/users`).then((resp)=>{
        const x=resp.data.filter((y)=>y.role!=1)
        console.log(resp.data)
        setUsers(x)
    })
},[])

const destroy=(id)=>{
    Axios.delete(`${API}/user/delete/${id}`).then((resp)=>{
        console.log(resp);
        setUsers(()=>{
           return  users.filter((x)=>x._id!=id)
        })
        alert("Deleted Successfully!")
    })
}


  return (
    <Layout
      title='Manage Users'
      description='Perform CRUD on Users'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {users.length} Users</h2>
          <hr />
          <ul className='list-group'>
            {users.map((u) => (
              <li
                key={u._id}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{u.name}</strong>
                {/* <a href={`/profile/${u._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </a> */}
                
                  <span
                    onClick={() => destroy(u._id)}
                    className='badge badge-danger badge-pill'
                  >
                    Delete
                  </span>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

  