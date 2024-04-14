import { Router } from "express";
import authenticationMiddlware from "../middleware/authentication.js";
import { get_all_contracts, get_contracts_withStatus } from "../models/contract.js";
import { get_offers_contractId, get_offers_contractorId } from "../models/offer.js";
import authorizationMiddlware from "../middleware/authorization.js";
const getDataApi = new Router() ; 


/////////////////contracts //////////////

/// all contracts 
/// for all site visitors 
getDataApi.get('/allcontracts' , async(req , res , next)=>{
   console.log('get all contract opened and closed')
   try {
        const contracts = await get_all_contracts()
        console.log(contracts)
        res.send ({contracts} , )
   }catch(err){next(err)}
})

//// contracts with certain status
/// for all site visitors 
getDataApi.get('/contracts/:status' , async(req , res , next)=>{
    console.log('get  contracts with  opened or closed')
    const status= req.params.status ; 
    try {
         const contracts = await get_contracts_withStatus(status)
         console.log(contracts)
         res.send ({contracts} ,)
    }catch(err){next(err)}
 })

///////////// offers ////////////////

/// get offers for certain contract
// authorized for officers without offer owner
getDataApi.use('/offers/:contractId',authenticationMiddlware())
getDataApi.use('/offers/:contractId',authorizationMiddlware('get_offers_by_contractId'))
getDataApi.get('/offers/:contractId' , async(req , res , next)=>{
    console.log('get offers of certain contract   ')
    const contractId =req.body.contractId ; 
    try{
        const offers = await get_offers_contractId(contractId)
        res.send({offers})
    }catch(err){next(err)}
})


/// get all offers of certain contractor

// authorized for manager , admin , owner of these offers
getDataApi.use('/offers/:contractorId',authenticationMiddlware())
getDataApi.use('/offers/:contractorId',authorizationMiddlware("get_offers_by_contractorId"))
getDataApi.get('/offers/:contractorId' , async(req , res , next)=>{
    const contractorId = req.params.contractorId
    console.log('get offers of certain contractor  ')
    try{
        const offers = await get_offers_contractorId(contractorId)
        res.send({offers})
    }catch(err){next(err)}
})


//////////// contractor /////////////

/// get all contractors 

// for all site visitors
getDataApi.get('/allcontractors' , async(req , res , next)=>{

    console.log('get all contractors  ')
})

//////////////////////// special search 


export default getDataApi ; 