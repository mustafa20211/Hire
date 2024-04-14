import { Router } from "express";
import bcrypt from 'bcrypt'
import validationMiddleware from "../middleware/validation.js";
import errorHandeler from "../middleware/errorHandeling.js";

import generatedToken from "../utils/generateToken.js";
import { Contractor } from "../models/contractor.js";
import { Officer } from "../models/officer.js";
const loginApi = new Router();


// validate login form 

loginApi.use(validationMiddleware('login'))

loginApi.post('/:id', async (req, res, next) => {
    const { userName, password } = req.body;
    // check user with db
    const userType = req.params.id ; 
    try {
        const user =(userType=='contractor')? await Contractor.findOne({ userName }):await Officer.findOne({userName})
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result){
                res.header("x-auth-token" , generatedToken({id:user.id , roles:user.roles ,userName:user.userName }))
                res.send({ login: true,})}
                
                else res.send({ login: false })
        }
        else res.send({login:false})
    }
    catch (err) {
        next(err)
    }

})

export default loginApi;

