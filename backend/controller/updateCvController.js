import asyncHandler from 'express-async-handler';
import cvModel from '../model/cvModel.js';
import CV from '../model/cvModel.js';
const domain = process.env.DOMAIN;

//$-title create cv and  save it in cvModel
//$ path POST /api/v1/cv/create
//$-auth public 
const createCv=asyncHandler(async (req, res, next)=>{


    const id = req.params.id;
    const cvModel = await CV.findById(id);
    if(cvModel==null||cvModel==undefined){
        return res.json({
            success:true,
            data:null
        })
    }
    const updated = await CV.findByIdAndUpdate(id,         
        {...req.body, _id:id}, 
        { new:true, runValidators:true})
    return res.json({
        success:true,
        data:updated
    })
    
})
export default createCv