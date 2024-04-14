import { Router } from "express";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config() ; 

const confirmMailApi = new Router() ; 

const transporter =  nodemailer.createTransport({
    service:'gmail' , auth:{
        pass:process.env.MAIL_PASSWORD,
        user:process.env.MAIL_USER_NAME ,
    }

})

confirmMailApi.get('' , (req , res , next)=>{

console.log('send mail api is work ')
transporter.sendMail({from:"mustafaabdelhamid2018@gmail.com" ,
 to:"mustafa_abdelhamid2014@yahoo.com,mustafaabdelhamid2018@gmail.com",
 text:"message from node back end ",
 subject:"node js message"
} , (err , info )=>{
    err?console.log('error happend' , err):res.send("check your mail")
})

})


export default confirmMailApi ; 
