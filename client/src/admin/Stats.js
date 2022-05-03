import Axios from 'axios'
import { set } from 'lodash'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { API } from '../config'
import Layout from '../core/Layout'
import BarGraph from './Bargraph'


const Stats = () => {
    
    
    const [labels,setLabels]=useState([])
    const [data,setData]=useState([])
    const [totP,setTot]=useState(0)
    const[totB,setTotb]=useState(0)

    useEffect(()=>{
        Axios.get(`${API}/catStats`).then((resp)=>{
            let t=0;
            let l=[]
            let d=[]
            for(var i=0;i<resp.data.length;i++){
                if(!resp.data[i]) continue;
                l.push(resp.data[i]?Object.keys(resp.data[i]):"not-defined")
                d.push(resp.data[i]?Object.values(resp.data[i]):"0")
                t=parseInt(d[i])+t;
            }
            setLabels(l)
            setData(d)
            setTot(t)
            console.log(l,d)

            
        })
        
    },[])

    useEffect(()=>
    Axios.get(`${API}/noOfBuyReq`).then((resp)=>{
        console.log(resp.data.count)
        let b=resp.data.count
        setTotb(b)
    }),[])


   
    return (
    <Layout
    title='Statistics'
    description="lets see how the app is running..."
    class="container-fluid">
        <div style={{float:"right",width:"450px",marginRight:"50px",padding:"20px",border:"2px solid black"}}>
            <h3 >Total Number of posts:</h3><h1>{totP}</h1> 
        </div>
        <div style={{width:"700px",height:"200px",margin:"50px"}}>
        <h2>Number of products per category</h2>
         <BarGraph labels={labels} data={data}/> 
        </div> 
        <div style={{float:"right",width:"450px",marginRight:"50px",padding:"20px",border:"2px solid black"}}>
            <h3 >Total Number of Buy Requests:</h3><h1>{totB} </h1>
        </div>
        
        </Layout>
    )
}

export default Stats