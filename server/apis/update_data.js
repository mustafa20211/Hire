import { Router } from "express";
import validationMiddleware from "../middleware/validation.js";
import authenticationMiddlware from "../middleware/authentication.js";
import authorizationMiddlware from "../middleware/authorization.js";
import { insert_financial_audit, insert_tech_audit } from "../models/offer.js";
const updateDataApi = new Router() ; 




/////////// insert Tech Audit
updateDataApi.use('/techaudit' , authenticationMiddlware())
updateDataApi.use('/techaudit' , authorizationMiddlware('insert_tech_audit'))
updateDataApi.use('/techaudit' , validationMiddleware('newAudit'))
updateDataApi.post('/techaudit/:offerId',async(req , res , next)=>{
    console.log('insert tech audit ')
    const offerId = req.params.offerId ; 
    const techAudit = {...req.body , 
        entered:true , creator:{userName:req.user.userName , userId:req.user.id}}
    try{
        const result = await insert_tech_audit(offerId , techAudit)
    }catch(err){next(err)}

})



////////// insert Financial Audit
updateDataApi.use('/finanacialaudit' , authenticationMiddlware())
updateDataApi.use('/finanacialaudit' , authorizationMiddlware('insert_finanacial_audit'))
updateDataApi.use('/finanacialaudit' , validationMiddleware('newAudit'))
updateDataApi.post('/finanacialaudit/offerId',async(req , res , next)=>{
    console.log('insert FInanacial  audit ')
    const offerId = req.params.offerId ; 
    const financialAudit = {...req.body , 
        entered:true , creator:{userName:req.user.userName , userId:req.user.id}}
    try{
        const result = await insert_financial_audit(offerId ,financialAudit )
    }catch(err){next(err)}
    

})

export default updateDataApi ; 