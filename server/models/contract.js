import mongoose from "mongoose";
const ContractSchema = new mongoose.Schema({
    title: {type:String ,required:true} , 
    desc: {type:String ,required:true}  , 
    requires:{type:[String] , required:true} ,
    status : {type:String , enum:["opened" , "closed"] , default:"opened"} ,
    offers : [{type:mongoose.Schema.ObjectId , ref:'Offer' }],
    offersNum: {type:Number , default:0} , 
    createDate:{type:Date , default:Date.now},
    closeDate: {type:Date , default:Date.now()+(5*24*60*60*1000)}

})



const Contract = mongoose.model('Contract' , ContractSchema) ; 

const create_new_contract = async(contract)=>{
// contract obj conatin title , desc , reqs , 

   const result =  await Contract.insertMany([contract]) ; 
   return  result ; 

}

const update_contract_offers = async(contractId,offerId)=>{
    const result = await Contract.findByIdAndUpdate(
        contractId , {$push:{offers:offerId} , $inc:{offersNum:1}})

}

const get_all_contracts  = async ()=>{
    const result = Contract.find().select({offers:0}) ; 
    return result ; 
}

const get_contracts_withStatus  = async (status)=>{
    const result = Contract.find({status}).select({offers:0}) ; 
    return result ; 
}

export{Contract 
, create_new_contract ,
 get_all_contracts ,
 update_contract_offers , 
 get_contracts_withStatus,
} ; 