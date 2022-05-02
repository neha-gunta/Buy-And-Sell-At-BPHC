const User = require("../models/user")

var nodemailer=require("nodemailer");



exports.sendMail=(req,res)=>{
var sellermail="";
var sellerName="abc"

User.findByIdAndUpdate(req.body.BuyerID,
  {$push:
    {interested:{name:req.body.productName,id:req.params.productId}
  }},(err,resp)=>{
    console.log(req.body.productName,req.params.productId)
    if(err) console.log(err)
    else console.log(resp);
    
})
User.findById(req.body.sellerID,(err,seller)=>{
     sellermail=seller.email;
   sellerName=seller.name
    
}).then((data)=>{

   

const buyermail=req.body.buyermail

const Buyername=req.body.Buyername

const ProductName=req.body.productName

var sent=false;
var transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"BuyAndSellAtBPHC@gmail.com",
        pass:"buyandsell"
        
    }
})
var mailOptions={
    from:"BuyAndSellAtBPHC@gmail.com",
    to:`${sellermail}`,
    subject:"Your product has gained attention!",
    text:`Hello ${sellerName},

${Buyername} is interested in your product ${ProductName}.

You can contact them through their email ID: ${buyermail}.
Hope you find the right deal.

Regards,
Team BuyAndSellAtBPHC
`
}
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send("failed")
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send("success")
    }
  })


})

}