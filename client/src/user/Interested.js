import { Card } from '@material-ui/core'
import { Link } from '@mui/material'
import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { isAuthenticated } from '../auth'
import { API } from '../config'
import Layout from '../core/Layout'
import { getInterestedProds } from '../core/apiCore'

export default function Interested() {
    const[int,setInt]=useState([{name:"meah",id:20}])
const {user,token}=isAuthenticated()
const inti=[{name:"meah",id:20}]
useEffect(()=>
Axios.get(`${API}/user/Interested/${user._id}`).then((resp)=>{
  console.log(resp)
    setInt(resp.data)
    console.log(int)
}),[])
// const getInt=()=>{
//   getInterestedProds(user._id).then((data)=>{
//     console.log(data)
//       setInt(data)
//   });
// }
// useEffect(()=>{
//    getInt()
// },[])



  return (
    <div>
      <Layout
      title="Interested Products"
      description="All the products that you are interested in"
      className="container-fluid">
{int.map((x)=>{
    return( 
    <a href={`/product/${x.id}`} >
    <div style={{backgroundColor:"lightgrey",padding:"5px"}}>{x.name}</div></a>)

})}

      </Layout>
    </div>
  )
}
