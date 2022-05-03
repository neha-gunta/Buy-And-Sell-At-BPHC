const express = require('express');
const router = express.Router();

const {
    deleteBuyReq,
    getAllBuyReq,
    createReq,
    getUserReq,
    updateBuyReq,
    getReqById,
    countReq
} =require("../controllers/buyReq")

router.get("/getAllReq",getAllBuyReq);
router.get("/getReq/:id",getReqById)
router.get("/getUsersBuyReq/:id",getUserReq);
router.get("/noOfBuyReq",countReq)
router.delete("/deletereq/:id",deleteBuyReq);

router.put("/updatereq/:id",updateBuyReq)

router.post("/createReq",createReq);

module.exports=router;