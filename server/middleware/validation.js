import { application } from 'express';
import joi from 'joi';


///////////// ValidationFun//////////////
const validationFun = (incomingData, shemaToValidate) => {
    let result;
    switch (shemaToValidate) {
        case "signUp":
            result = SignUpShema.validate(incomingData,)
            break;
        case "login":
            result = LoginShema.validate(incomingData,)
            break;
        case "offer":
            result = OfferSchema.validate(incomingData);
            break;
        case "newContract":
            result = ContractSchema.validate(incomingData)
            break;
        case "newAudit":
            result = AuditSchema.validate(incomingData)
            break;

    }

    return result

}
/////////////////////////////////////////////// Middlware 
const validationMiddleware = (shemaToValidate) => {

    return (req, res, next) => {
        console.log('validation midllware')
        const incomingData = req.body
        console.log(incomingData)
        const { error, value } = validationFun(incomingData, shemaToValidate)
        if (error) {
            error.code = 0;
            console.log('validation failed')
            next(error)
        }
        else { return next() }

    }

}


//////////////////////// Validation Shemas

const SignUpShema = joi.object().keys({
    userName: joi.string().min(1).max(20).required(),
    email: joi.string().email().required(),
    phone: joi.string().regex(/^[0-9]{11}$/).required(),
    password: joi.string().min(1).max(20).required(),
    rePassword: joi.ref('password'),
    roles: joi.array().items(joi.string().valid('manager', 'acountant', 'engineer', 'contractor')),

})

const LoginShema = joi.object().keys({
    userName: joi.string().trim().required(),
    password: joi.string().trim().required(),

})

const OfferSchema = joi.object().keys({

    contract: joi.string().required().min(1).max(100),
    technicalDetails: joi.string().required().min(1).max(100),
    coastEstimation: joi.string().required().min(1).max(100),
    offerPrice: joi.number().required(),

})

const ContractSchema = joi.object().keys({
    title: joi.string().required().min(3),
    desc: joi.string().required().min(5),
    requires: joi.array().items(joi.string()).required(),
    closeDate: joi.date(),
})


const AuditSchema = joi.object().keys({
    points: joi.number().min(0).max(20).required(),
    points: joi.string().min(5).max(200)
})
////////////////////////////////

export { validationFun };

export default validationMiddleware;