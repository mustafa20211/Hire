import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
    appliedContractor: {
        type:mongoose.Schema.ObjectId ,ref:'Contractor' , required:true},
    contract: {type:mongoose.Schema.ObjectId , ref:'Contract'} ,
    technicalDetails:{type:String , required:true} , 
    coastEstimation: {type:String , required:true}, 
    offerPrice :{type:Number , required:true}, 
    document:{type:[String] , required:true} , 
    createdAt : {type:Date ,default:Date.now } ,
    techAudit: new  mongoose.Schema({
        entered:{type:Boolean , enum:[true , false] , default:false},
        comment:{type:'string'} ,
        points:{type:Number  , default:-1} ,
        creator:{userName:String , userId:String} },{timestamps:true} ) ,
    
    financialAudit: {
        entered:{type:Boolean , enum:[true , false] , default:false},
        comment:{type:'string'} ,
        points:{type:Number  , default:-1} ,
        creator:{userName:String , userId:String}},
    status : {type:String  , enum:["accpted" , "refused"]}

} , {timestamps:true})

const Offer = mongoose.model('Offer' , OfferSchema) ; 

const create_new_offer = async(offer)=> {
   const result =  await Offer.insertMany([offer])
    return result ; 
}

const get_offers_contractId = async(contractId)=>{
    const result = await Offer.find({contract:contractId} , {appliedContractor:0}) ; 
    return result ; 
}

const get_offers_contractorId = async(contractorId)=>{
    const result = await Offer.find({appliedContractor:contractorId})
}


const insert_tech_audit = async(offerId , techAudit )=>{
    const offer = await Offer.findById(offerId) ; 
    if(!offer){ return new Error('Not Found')}
    else if (offer &&offer.techAudit.entered){
        return new Error('the tech audit already inseted')
    }
    else if (offer&&!offer.techAudit.entered){
        const result = offer.updateOne({$set:{techAudit}}) ; 
        return result ; 
        
    }
   
    
}



const insert_financial_audit = async(offerId , financialAudit)=>{

    const offer = await Offer.findById(offerId)
    if (!offer){
        return new Error('Not Found')
    }
    else if (offer&&offer.techAudit.entered&&!offer.financialAudit.entered){
        const result = await offer.updateOne({$set:{financialAudit}})
    }
    else if (offer&&!offer.techAudit.entered)
    {return new Error ('can not enter finanacial before tech audit')}
    else {return new Error ('finanacial Audit entered before')}

}


export {Offer , 
    create_new_offer,
    
    get_offers_contractId, 
    get_offers_contractorId , 
    insert_tech_audit , 
    insert_financial_audit , 
} ; 