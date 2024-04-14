import { Router } from "express";
import validationMiddleware from "../middleware/validation.js";
import authorizationMiddlware from "../middleware/authorization.js";
import bcrypt from 'bcrypt'
import { create_contractor } from "../models/contractor.js";
import { create_officer } from "../models/officer.js";
import authenticationMiddlware from "../middleware/authentication.js";


const createUser = new Router() ; 


createUser.use(validationMiddleware('signUp'))    // validate Form 
// route for create Officer 


createUser.post('/officer' , authenticationMiddlware(),authorizationMiddlware("create_officer"),async(req , res , next)=>{
    console.log('create officer end point')
  

    try {
        const {password}=req.body ; 
        const hashedPssword = await bcrypt.hash(password , 10) ; 
        req.body.password = hashedPssword ; 
        const officer =await create_officer(req.body) 
        res.send({created:true , message:'please login to start'})
    }catch(err){
        next(err)
    }
    
    

})
/////////////////////////////
createUser.post('/contractor' , async(req , res , next)=>{
    console.log('create contractor end point')

    try {
        const {password}=req.body 
        const hashedPssword = await bcrypt.hash(password , 10)
        req.body.password = hashedPssword ; 
        delete req.body.roles ; // automatic asign with db 
        const contractor = await create_contractor (req.body)
        res.send({created:true , message:'please login to start'})
    }catch(err){

        next(err)
    }

})

export default createUser ; 


