import mongoose from "mongoose"

const ContractorSchema = new mongoose.Schema({

    userName :{type:String}, 
    offers:[{type:mongoose.Schema.ObjectId , ref:'Offer'}] , 
    phone:{type:String , unique:[true , 'phone Numer already exist']} , 
    email :{type:String}, 
    password: {type:String} , 
    roles: {type:String , require:true , default: 'contractor'} , 
    createdAt:{type: Date , default:Date.now}
} , {timestamps:true})

const Contractor = mongoose.model('Contractor' , ContractorSchema) ; 

const create_contractor = async(data)=>{

        await Contractor.insertMany([data]) ; 
   

}


const update_contractor_offers = async(contractorId,offerId)=>{
    const result = await Contractor.findByIdAndUpdate(
        contractorId , {$push:{offers:offerId} , })

}
///////////////
export {Contractor ,
     create_contractor,
    update_contractor_offers}; 