
import React, { useEffect, useState } from 'react'
import { getBuyRequests } from '../core/apiCore'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import Axios from 'axios'
import { API } from '../config'
 
export default function ManageReq() {
    const [buyRequests,setBuyRequests]=useState([])
    
    const {user,token}=isAuthenticated();
    
    const getReq=()=>{
        getBuyRequests().then((data)=>{
          console.log(data)
          data=data.filter((x)=>x.postOwnerId==user._id)
          setBuyRequests(data)
        })
    }

    const deleteReq=(id)=>{
        Axios.delete(`${API}/deletereq/${id}`).then((resp)=>{
            if(resp.error) console.log(resp.error)
            else{
                const x=buyRequests.filter((x)=>x._id!=id)
               setBuyRequests(x)
               
            }
        })
    }
 
 useEffect(()=>{
   getReq()
   console.log(buyRequests)
 },[])
  
  return (
    <div>
      <Layout
      title='Buy Requests'
      description={`abc`}
    >
      
      <div style={{
        
        display:"grid",
        gridTemplateColumns:"  auto auto auto auto auto auto",
  gap: "10px",
  justifyContent:"space-evenly"
        }}>
          
          


    {
      buyRequests.map((r)=>{
        
        return <div style={{boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2)" ,
          width: "40vmax",
          margin: "10px",
          textAlign:" center",
          fontFamily:" arial",
          padding:"5px",
         display:" -moz-inline-grid",
         gridColumn:  "span 3"}}>
  
  <h1 style={{backgroundColor:"#DCF0EE"}}>{r.name}</h1>
  <p style={{color:" grey" ,
    fontSize: "22px"}}>Budget:{r.price}</p>
  <p>Description: {r.description}</p>
  <h4>Contact Details: {r.postOwnerDetails}</h4>
  <span>
    <button onClick={()=>deleteReq(r._id)} style={{backgroundColor:"#67CFE8",border:"0px solid black", margin:"15px",borderRadius:"10px"}}>
        Delete Request</button>
  {/* <button style={{backgroundColor:"#67CFE8",border:"0px solid black", margin:"5px",borderRadius:"10px"}}>
      <a href={`/updateReq/${r._id}`}>Edit Request</a></button> */}
  </span>
  
  
</div>
      })
    }
          </div>
          </Layout></div>)
}
 
