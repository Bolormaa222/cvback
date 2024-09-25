import { Router } from "express";
import { buildPDF } from "../libs/pdfkit.js";
import CV from "../model/cvModel.js";
import createCv from "../controller/createCvController.js";
import updateCv from '../controller/updateCvController.js'
import { apiLimiter } from "../middleware/apiLimiter.js";

const router = Router();

router.post("/add",  createCv)
router.get("/detail/:id", async(req, res)=>{
    const id = req.params.id;
    const cvModel = await CV.findById(id);
    if(cvModel==null||cvModel==undefined){
        return res.json({
            success:true,
            data:null
        })
    }
    return res.json({
        success:true,
        data:cvModel
    })
})
router.post("/update/:id",  updateCv)
router.get("/invoice/:id", async (req, res) => {
  const id = req.params.id;
  
  //const cvModel = null;
  const cvModel = await CV.findById(id);
  //if(!cvModel){
  //  res.send("invalid link")
  //}
  //console.log("Cv model ", cvModel)
  
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=invoice.pdf",
  });
  
  buildPDF(
    (data) => stream.write(data),
    () => stream.end(),
    cvModel
  );
});


export default router;
