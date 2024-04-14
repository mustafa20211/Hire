import mongoose from "mongoose"

const OfficerSchema = new mongoose.Schema({

    userName :{type:String}, 
    phone:{type:String , unique:[true , 'phone Numer already exist']} , 
    email :{type:String}, 
    password: {type:String} , 
    roles: {type:[String] , enum:{values:[ 'admin' , 'acountant','engineer' , 'manager'] ,message:'role type not supported'}} , 
    createdAt:{type: Date , default:Date.now}
} , {timestamps:true})

const create_officer = async(data)=>{

    await Officer.insertMany([data]) ; 


}


////////////
const Officer = mongoose.model('Officer' , OfficerSchema)


export {Officer , create_officer} ; 