const BuyReq = require("../models/buyReq")
const mongoose = require('mongoose');

exports.getAllBuyReq=(req,res)=>{
    BuyReq.find({},(err,data)=>{
        if(err){
            res.status(404).send("error")
        }
        else{
            res.status(200).send(data)
        }
    })
}

exports.getUserReq=(req,res)=>{
    BuyReq.find({postOwnerId:req.params.id},(err,data)=>{
        if(err) res.status(404).send(err)
        else res.status(200).send(data)
    })
}

exports.deleteBuyReq=(req,res)=>{
    BuyReq.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err) res.status(404).send(err)
        else res.status(200).send(data)
    })
}

exports.createReq=(req,res)=>{
    let body=req.body;
   
    const id= mongoose.Types.ObjectId(req.body.postOwnerId)
    body={...body,postOwnerId:id}
    console.log(body)
    const newReq=new BuyReq(body)
    newReq.save((err,data)=>{
        if(err){res.status(404).send(err)
             console.log(err) } 
        else res.status(200).send(data)
    });

}

exports.updateBuyReq=(req,res)=>{
    BuyReq.findById(req.params.id,(err,r)=>{
        if(err) res.status(500).send(err)
        if(!r) res.status(404).send("not found")
        else{
            r.name=req.body.name
            r.description=req.body.description
            r.price=req.body.price
            r.postOwnerDetails=req.body.postOwnerDetails

            r.save().then((x)=>res.send("todo updated")).catch((err)=>res.send(err))
        }
    })
}

exports.getReqById=(req,res)=>{
    BuyReq.findById(req.params.id,(err,resp)=>{
        if(err) res.status(404).send(err)
        else res.status(200).send(resp)
    })
}

exports.countReq=(req,res)=>{
    BuyReq.find().exec(function(err,resp){
        const count=resp.length
        if(err) res.status(404).send(err)
        else res.status(200).send({count:count})
    })
        
    }