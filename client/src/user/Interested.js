import { Button, Card } from '@material-ui/core'

import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { isAuthenticated } from '../auth'
import { API } from '../config'
import Layout from '../core/Layout'
import { getInterestedProds } from '../core/apiCore'
import LinkIcon from '@material-ui/icons/Link';
export default function Interested() {
    const[int,setInt]=useState([{name:"meah",id:20}])
const {user,token}=isAuthenticated()
const inti=[{name:"meah",id:20}]
// useEffect(()=>
// Axios.get(`${API}/user/Interested/${user._id}`).then((resp)=>{
//   console.log(resp)
//     setInt(resp.data)
//     console.log(int)
// }),[])
const getInt=()=>{
  getInterestedProds(user._id).then((data)=>{
    console.log([...new Set(data)])
      setInt([...new Set(data)])
  });
}
useEffect(()=>{
   getInt()
},[])



  return (
    <div>
      <Layout
      title="Interested Products"
      description="All the products that you are interested in"
      className="container-fluid">
        <h2> You've contacted the owners of the following posts:</h2>
<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
{int.map((x)=>{
    return(       
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",border:"1px solid black", margin:"2px ",padding:"10px",paddingLeft:"25px",width:"500px"}}>
         
        <a href={`/product/${x.id}`}><h5 style={{color:"black"}}>{x.name}</h5></a>

        <a href={`/product/${x.id}`}><Button variant="contained" color="primary">View Product</Button></a>
        </div>
    )})}</div>

      </Layout>
    </div>
  )
}
