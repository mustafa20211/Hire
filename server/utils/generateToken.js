import jsonwebtoken from 'jsonwebtoken'
import {config} from 'dotenv'

config() ; 
const secret_token = process.env.SECRT_TOKEN ; 
const expire_token_time = process.env.EXPIRE_TOKEN_TIME
const generatedToken = (id,) => {
    console.log('generate token fun started')
    let token = jsonwebtoken.sign(id ,secret_token , {expiresIn:expire_token_time})
    return token;
}




export default generatedToken ; 