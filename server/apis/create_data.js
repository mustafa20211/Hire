import { Router } from "express";
import validationMiddleware from "../middleware/validation.js";
import authenticationMiddlware from "../middleware/authentication.js";
import authorizationMiddlware from "../middleware/authorization.js";
import { uploadMiddleware } from "../middleware/upload.js";
import { create_new_offer } from "../models/offer.js";
import { update_contractor_offers } from "../models/contractor.js";
import { create_new_contract, update_contract_offers } from "../models/contract.js";

const createDataApi = new Router() ; 

///// create new contract /////////////// 
// used middleware 
createDataApi.use('/newcontract',authenticationMiddlware())
createDataApi.use('/newcontract',authorizationMiddlware('create_new_contract'))
createDataApi.use('/newcontract' , validationMiddleware('newContract'))
///// 
createDataApi.post('/newcontract' ,async(req , res ,next )=>{

    console.log('create new contract')
    try {
        const contract = await create_new_contract(req.body)
        
        res.send({created:true , message:"new contract added to db" , id:contract[0]._id})
    }catch(err){next(err)}


})



///// provide new offer on opened contract /////
// req middleware
createDataApi.use('/newoffer',authenticationMiddlware())
createDataApi.use('/newoffer',authorizationMiddlware('create_new_offer'))
// uploadMiddlware includes validation
createDataApi.use('/newoffer' , uploadMiddleware) 
createDataApi.post('/newoffer' ,async(req , res ,next )=>{

    console.log('provide new offer on opened contract')
    // check if contractor already applied 
    // check if contract is opened 
    try {
        const document = [] ; 
        const appliedContractor = req.user.id
        document.push(req.files['doc1'][0]['filename'] ,req.files['doc2'][0]['filename'] )
        const offer = await create_new_offer({...req.body, document , appliedContractor})
       const pushing_offer_tocontract = await update_contract_offers(req.body.contract ,offer[0]._id ) ; 
        const push_offerId_to_contractor = await update_contractor_offers(req.user.id ,offer[0]._id ) ; 
        res.send({created:true , message:"new offer added to db" ,id:offer[0]._id})
    }catch(err){next(err)}


})


export default createDataApi ; 