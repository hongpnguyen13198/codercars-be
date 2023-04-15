const express = require('express');
const router = express.Router();

// CAR

router.get("/", async(req,res,next)=>{
    const { test } = req.params
    try{
        //turn on to test error handling
        if(test==="error"){
        throw new AppError(401,"Access denied","Authentication Error")
        }else{
        sendResponse(res,200,true,{data:"template"},null,"template success")
        }
    }catch(err){
        next(err)
    }
})
const carAPI = require('./car.api');
router.use('/car', carAPI);

module.exports = router;
