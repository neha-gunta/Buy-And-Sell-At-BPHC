const mongoose = require('mongoose');
const User = require('./user');
const { ObjectId } = mongoose.Schema;

const buyReqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      
    },
    quantity: {
      type: Number,
    },  
        
    postOwnerDetails:{
      
      type:String,     
      },
      
    postOwnerId:{
      required:true,
      type:ObjectId,
      ref:User
    }
  },
  { timestamps: true }
);

const BuyReq = mongoose.model('BuyReq', buyReqSchema);
module.exports=BuyReq;
