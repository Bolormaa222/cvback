import asyncHandler from 'express-async-handler';
import cvModel from '../model/cvModel.js';
const domain = process.env.DOMAIN;

//$-title create cv and  save it in cvModel
//$ path POST /api/v1/cv/create
//$-auth public 
const createCv=asyncHandler(async (req, res, next)=>{
    const {
        firstName,
        lastName,
        email,
        
    } =req.body;
    if(!email){
        res.status(400)
        throw new Error("An email address is required")
    }
    
    const newcv = new cvModel(req.body)
    const savedcv = await newcv.save();

    if(!savedcv){
        res.status(400)
        throw new Error("cv can not be registered")
    }
    if(savedcv){
        return res.json({
            success:true,
            data: savedcv
        })
    }
})
export default createCv