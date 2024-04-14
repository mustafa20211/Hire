import jsonwebtoken from 'jsonwebtoken'
import { config } from 'dotenv'

config();
const secret_token = process.env.SECRT_TOKEN;
const authenticationMiddlware = () => {
    return async (req, res, next) => {
        console.log('authontication middleware')
        if (req.headers &&req.headers["x-auth-token"]) {
            let token = req.headers["x-auth-token"] ; 
            console.log(token)
            try {
                const result= jsonwebtoken.verify(token, secret_token)
                if (result){
                    req.user = result ; 
                    console.log(result)
                    next() ; }
                else res.send({authontication:false})

            } catch (err) {
                next(err)
            }
        }

        else res.send({ authontication: false })

    }

}


export default authenticationMiddlware; 