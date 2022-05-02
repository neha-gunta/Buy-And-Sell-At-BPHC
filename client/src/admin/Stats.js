import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { isAuthenticated } from '../auth'
import { API } from '../config'
import { getProducts } from '../core/apiCore'
import Layout from '../core/Layout'
import { getCategories } from './apiAdmin'
import { Line } from "react-chartjs-2"

export default function Stats() {
  const [cat,setCat]=useState([])
  const [data,setData]=useState({
    labels:["jab","fec"],
    datasets:[{
      label:"Number of products per category",
      data:[2,3]}]}
    )

const [users,setUsers]=useState([])
const [products,setProducts]=useState()
const {user, token}=isAuthenticated()
const loadProducts = () => {
  getProducts().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      if(user.role==0){
        data=data.filter((p)=> p.PostOwner==user._id)
      }        
      setProducts(data);
      console.log(data)
    }
  });
};
const loadCategories=()=>{
  getCategories().then((resp)=>{ 

    if(resp.error){
    console.log(resp.error)}
    else{
      setCat(resp)
      console.log(resp)
    }
  })
}

useEffect(()=>{
    Axios.get(`${API}/users`).then((resp)=>{
        const x=resp.data.filter((y)=>y.role!=1)
        console.log(resp.data)
        setUsers(x)
        loadProducts();
// loadCategories(); 
setData({
  labels:cat,
  datasets:[{
    label:"Number of products per category",
    data:[2,3]
  }]
}
)
    })
    
    
},[])



  return (
  //  <Layout
  //  title="Statistics"
  //  description='A Graphical Overview'
  //  className="container-fluid">
  <>
<div>hi</div>
<Line data={data}></Line></>
  // </Layout>
  )
}
