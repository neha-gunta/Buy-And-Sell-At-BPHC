import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createRequest, getCategories } from '../admin/apiAdmin';
import Axios from 'axios';
import { API } from '../config';
 
export default function UpdateReq() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    quantity: '',
    loading: false,
    error: '',
    createdRequest: '',
    redirectToProfile: false,
    formData: '',
    postOwnerDetails:'',
    postOwnerId:user._id
  });
 
  const id=(window.location.href).split("/")[4]
  console.log(id)
 
  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    photo,
    loading,
    error,
    createdRequest,
    reqSuccess=false,
    redirectToProfile,
    formData,
    postOwnerDetails
  } = values;
 
  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          
        });
      }
    });

   
    
  };
 const init1 = ()=>{
    Axios.get(`${API}/getReq/${id}`).then((res)=>{
        setValues({ ...values,...res.data})
        
        console.log(res.data.name)
    })
 }
  useEffect(() => {
    init();
    init1();
  }, []);
 
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    
    setValues({ ...values, [name]: value });
  };
 
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    
    console.log(values)
    Axios.put(`${API}/updatereq/${id}`).then((resp) => {
        console.log(resp)
      if (resp.error) {
        setValues({ ...values, error: resp.error });
      } else {
          
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          quantity: '',
          loading: false,
          createdRequest: resp.data.name,
          reqSuccess:true,
          postOwnerDetails: '',
        });
      }
    });
  };
 
  const newRequestForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      {/* <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div> */}
 
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
 
      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>
 
      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>
 
      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
 
      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>
    
      <div className='form-group'>
        <label className='text-muted'>Your Contact Details</label>
        <textarea
          onChange={handleChange('postOwnerDetails')}
          className='form-control'
          value={postOwnerDetails}
        />
      </div>
      <button className='btn btn-outline-primary'>Create Request</button>
    </form>
  );
 
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
 
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: reqSuccess ? '' : 'none' }}
    >
      <h2>{`${createdRequest}`} is Updated!</h2>
    </div>
  );
 
  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );
 
  return (
    <Layout
      title='Add a new request'
      //description={`Hey ${user.name}, ready to add a new request?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newRequestForm()}
        </div>
      </div>
    </Layout>
  );
};
 
