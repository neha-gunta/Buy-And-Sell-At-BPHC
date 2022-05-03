
import React, { useEffect, useState } from 'react'
import { getBuyRequests } from '../core/apiCore'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { TextField,Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
 
export default function BuyRequest() {
    const [buyRequests,setBuyRequests]=useState([])
    const [dispData,setDispData]=useState([])
    const [val,setVal]=useState("")
    const {user,token}=isAuthenticated();
    
   const search=(v)=>{
     
     v=(v.toString()).toLowerCase()
        const disp=buyRequests.filter((x)=>{
          { 
            const y=x.name.toString().toLowerCase()
          return (y.includes(v))
          }
        })
        setDispData(disp)
   }
    
 
 useEffect(()=>{
  {
    getBuyRequests().then((data)=>{
      console.log(data)
      setBuyRequests(data)
      setDispData(data)
    })}
   
 },[])
  
  return (
    <div>
      <Layout
      title='Buy Requests'
      description="Wanna sell your stuff? find out if anyone is interested"
    >
      <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center",alignSelf:"center"}} >
       <div style={{width:"600px"}}>
       <TextField
            onChange={(e)=>setVal(e.target.value)}
            id='outlined-basic'
            label={<span><SearchIcon/>Search by name</span>}
            variant='outlined'
            fullWidth
            autoComplete='off'
            value={val}
            
          />
          </div>

          <div className='ml-3 mt-2' style={{ border: 'none' }}>
            <Button ml={2} variant='contained' color='primary' onClick={(e)=>search(val)}>
              Search
            </Button>
          </div>
          </div>
      <div style={{
        
        display:"grid",
        gridTemplateColumns:"  auto auto auto auto auto auto",
  gap: "10px",
  justifyContent:"space-evenly"
        }}>
          
          


    {
      dispData.map((r)=>{
        
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
  
</div>
      })
    }
          </div>
          </Layout></div>)
}
 
